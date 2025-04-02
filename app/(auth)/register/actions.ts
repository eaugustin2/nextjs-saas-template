'use server'

import Mailgun from 'mailgun.js'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'
import formData from 'form-data' // form-data v4.0.1
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { registerRateLimit } from '@/lib/rateLimit'

const API_KEY = process.env.MAILGUN_API_KEY || ''
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV == 'production' ? 'https' : 'http'
/*
    Validation Checks
  1. If an email address is already in use
  2. If mailgun email doesn't send
  3. Check if valid email
  */
export const registerUser = async (data: FormData) => {
  const mailgun = new Mailgun(formData)
  const mg = mailgun.client({
    username: 'api',
    key: API_KEY,
  })

  const name = data.get('name') as string
  const email = data.get('email') as string
  const password = await hash(data.get('password') as string, 12)

  const emailSchema = z.string().email()

  const validEmail = emailSchema.safeParse(email)

  if (!validEmail.success) {
    return { error: 'Invalid Email' }
  }

  const { success } = await registerRateLimit.limit(email)

  if (!success) {
    return {
      error: 'Too many registration attempts, Please try again in 30 minutes',
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: 'User with this email exists already' }
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  const token = await prisma.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      userId: user.id,
    },
  })

  try {
    const data = await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Mailgun Sandbox <postmaster@${MAILGUN_DOMAIN}>`,
      to: [user.email],
      subject: `Please activate your account`,
      text: `Hello ${user.name}, please activate your account by clicking this link: ${PROTOCOL}://${DOMAIN}/activate/${token.token}`, //TODO: Should put link portion(localhost:3000) in an env file
    })

    console.log('mailgun data: ', data) // logs response data
    redirect('/login')
  } catch (error) {
    console.log(error) //logs any error
    return { error: JSON.stringify(error) }
  }
}
