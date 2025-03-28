import Link from 'next/link'
import styles from './forgotPassword.module.css'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'
import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { redirect } from 'next/navigation'

const API_KEY = process.env.MAILGUN_API_KEY || ''
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV == 'production' ? 'https' : 'http'

const ForgotPassword = () => {
  const resetPassword = async (data: FormData) => {
    'use server'

    const email = data.get('email') as string
    if (!email || typeof email !== 'string') {
      return {
        message: 'Invalid Email',
      } as any
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return {
        error: 'Email is not correct',
      } as any
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

    await mg.messages.create(MAILGUN_DOMAIN, {
      from: `Password Reset <security@${MAILGUN_DOMAIN}>`,
      to: [user.email],
      subject: `Reset Password Request`,
      text: `Hello ${user.name}, please click here to reset password: ${PROTOCOL}://${DOMAIN}/password-reset/${token.token}`, //TODO: Should put link portion(localhost:3000) in an env file
    })

    console.log('mailgun data: ', data) // logs response data
    redirect('/forgot-password/success')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Reset Password</h1>
        <form action={resetPassword} className={styles.form}>
          <div className={styles.formInput}>
            <span>Email:</span>
            <input name="email" type="email" />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
      <p>
        Have an account? <Link href="/api/auth/signin">Sign In</Link>
      </p>
    </div>
  )
}

export default ForgotPassword
