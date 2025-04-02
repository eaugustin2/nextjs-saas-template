'use server'

import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'
import Mailgun from 'mailgun.js'
import { redirect } from 'next/navigation'
import formData from 'form-data'
import { forgotPasswordRateLimit } from '@/lib/rateLimit'

const API_KEY = process.env.MAILGUN_API_KEY || ''
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV == 'production' ? 'https' : 'http'

export const resetPassword = async (data: FormData) => {
  const email = data.get('email') as string

  if (!email || typeof email !== 'string') {
    return {
      error: 'Invalid Email',
    }
  }

  const { success } = await forgotPasswordRateLimit.limit(email)

  if (!success) {
    return {
      error: 'Too many forgot password attempts, Please try again tomorrow',
    }
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return {
      error: 'Email is not correct',
    }
  }

  const token = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
    },
  })

  const mailgun = new Mailgun(formData)
  const mg = mailgun.client({
    username: 'api',
    key: API_KEY,
  })

  const mailgunData = await mg.messages.create(MAILGUN_DOMAIN, {
    from: `Password Reset <security@${MAILGUN_DOMAIN}>`,
    to: [user.email],
    subject: `Reset Password Request`,
    text: `Hello ${user.name}, please click here to reset password: ${PROTOCOL}://${DOMAIN}/password-reset/${token.token}`, //TODO: Should put link portion(localhost:3000) in an env file
  })

  console.log('mailgun data: ', mailgunData) // logs response data
  redirect('/forgot-password/success')
}
