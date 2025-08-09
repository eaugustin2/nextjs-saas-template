'use server'

import Mailgun from 'mailgun.js'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { randomInt } from 'crypto'
import formData from 'form-data' // form-data v4.0.1
import { z } from 'zod'
import { cookies } from 'next/headers'
//import { registerRateLimit } from '@/lib/rateLimit'

const API_KEY = process.env.MAILGUN_API_KEY || ''
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
/*
    Validation Checks
  1. If an email address is already in use
  2. If mailgun email doesn't send
  3. Check if valid email
  */
export const startUser = async (data: FormData) => {
  const mailgun = new Mailgun(formData)
  const mg = mailgun.client({
    username: 'api',
    key: API_KEY,
  })

  const cookieStore = await cookies()

  const email = data.get('email') as string

  const emailSchema = z.string().email()

  const validEmail = emailSchema.safeParse(email)

  if (!validEmail.success) {
    return { error: 'Invalid Email' }
  }

  cookieStore.set('email', email, {
    maxAge: 15 * 60 * 1000, // 15 minutes,
    secure: true,
    httpOnly: true,
  })

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  //checking if user exists if so use object, else create new user
  const user = existingUser
    ? existingUser
    : await prisma.user.create({
        data: {
          name: '',
          email,
        },
      })

  const otpToken = randomInt(100000, 999999).toString()

  if (existingUser) {
    console.log('User already exists, updating OTP token', existingUser)
    await prisma.oTPToken.update({
      where: { email: user.email },
      data: {
        token: await hash(otpToken as string, 12),
      },
    })
  } else {
    await prisma.oTPToken.create({
      data: {
        token: await hash(otpToken as string, 12),
        userId: user.id,
        email: user.email,
      },
    })
  }

  try {
    const data = await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Mailgun Sandbox <postmaster@${MAILGUN_DOMAIN}>`,
      to: [user.email],
      subject: `Confirmation Code: ${otpToken}`,
      text: `Here is your confirmation code: ${otpToken}`,
    })

    console.log('mailgun data: ', data) // logs response data
  } catch (error) {
    console.log(error) //logs any error
    return { error: JSON.stringify(error) }
  }
}
