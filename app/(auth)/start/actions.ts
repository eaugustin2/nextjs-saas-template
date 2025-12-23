'use server'

import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { randomInt } from 'crypto'
import { cookies, headers } from 'next/headers'
import { startRateLimit } from '@/lib/rateLimit'
import { Resend } from 'resend'
import MagicLink from '@/components/email/MagicLink/MagicLink'

const resend = new Resend(process.env.RESEND_API_KEY || '')
/*
    Validation Checks
  1. If an email address is already in use
  2. If mailgun email doesn't send
  3. Check if valid email
  */
export const startUser = async (formData: FormData) => {
  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for') || ''
  console.log('IP Address:', ip)

  // const { success } = await startRateLimit.limit(ip)

  // if (!success) {
  //   return { error: 'Too many requests, please try again later.' }
  // }

  const cookieStore = await cookies()

  const email = formData.get('email') as string

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
    const dbToken = await prisma.oTPToken.findUnique({
      where: { email: user.email },
    })

    if (!dbToken) {
      await prisma.oTPToken.create({
        data: {
          token: await hash(otpToken as string, 12),
          userId: user.id,
          email: user.email,
        },
      })
    } else {
      await prisma.oTPToken.update({
        where: { email: user.email },
        data: {
          token: await hash(otpToken as string, 12),
        },
      })
    }
  } else {
    await prisma.oTPToken.create({
      data: {
        token: await hash(otpToken as string, 12),
        userId: user.id,
        email: user.email,
      },
    })
  }

  console.log('sending email...')

  const { data, error } = await resend.emails.send({
    from: 'eliseeaugustin@gmail.com',
    to: user.email,
    subject: `Confirmation Code: ${otpToken}`,
    react: MagicLink({ token: otpToken }),
  })

  if (error) {
    return { error: JSON.stringify(error.message) }
  }

  console.log('resend data: ', data) // logs response data

  return { success: true }
}
