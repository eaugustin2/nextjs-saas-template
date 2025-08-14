'use server'

import Mailgun from 'mailgun.js'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { randomInt } from 'crypto'
import formData from 'form-data' // form-data v4.0.1
import { cookies, headers } from 'next/headers'
import { startRateLimit } from '@/lib/rateLimit'

const API_KEY = process.env.MAILGUN_API_KEY || ''
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
/*
    Validation Checks
  1. If an email address is already in use
  2. If mailgun email doesn't send
  3. Check if valid email
  */
export const startUser = async (data: FormData) => {
  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for') || ''
  console.log('IP Address:', ip)

  const { success } = await startRateLimit.limit(ip)

  if (!success) {
    return { error: 'Too many requests, please try again later.' }
  }

  const mailgun = new Mailgun(formData)
  const mg = mailgun.client({
    username: 'api',
    key: API_KEY,
  })

  const cookieStore = await cookies()

  const email = data.get('email') as string

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
      html: `<div
      style={{
        backgroundColor: '#efefef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>Verification Code</h1>
        <p>Please use the following code to verify your email address:</p>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            letterSpacing: '4px',
            margin: '20px 0',
          }}
        >
          ${otpToken}
        </h2>
        <p>This code will expire in 15 minutes.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Thank you!</p>
      </div>
    </div>`,
    })

    console.log('mailgun data: ', data) // logs response data
  } catch (error) {
    console.log(error) //logs any error
    return { error: JSON.stringify(error) }
  }
}
