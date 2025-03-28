import Link from 'next/link'
import styles from './register.module.css'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'
import formData from 'form-data' // form-data v4.0.1
import Mailgun from 'mailgun.js' // mailgun.js v11.1.0

const API_KEY = process.env.MAILGUN_API_KEY || ''
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV == 'production' ? 'https' : 'http'

const Register = () => {
  const registerUser = async (data: FormData) => {
    'use server'

    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({
      username: 'api',
      key: API_KEY,
    })
    const password = await hash(data.get('password') as string, 12)
    const user = await prisma.user.create({
      data: {
        name: data.get('name') as string,
        email: data.get('email') as string,
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
    } catch (error) {
      console.log(error) //logs any error
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create an Account</h1>
        <form action={registerUser} className={styles.form}>
          <div className={styles.formInputContainer}>
            <span className={styles.formLabel}>Name:</span>
            <input name="name" className={styles.formInput} />
          </div>
          <div className={styles.formInputContainer}>
            <span className={styles.formLabel}>Email:</span>
            <input name="email" type="email" className={styles.formInput} />
          </div>
          <div className={styles.formInputContainer}>
            <span className={styles.formLabel}>Password:</span>
            <input
              name="password"
              type="password"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formButtonContainer}>
            <button className={styles.formButton} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
      <p>
        Have an account? <Link href="/login">Sign In</Link>
      </p>
    </div>
  )
}

export default Register
