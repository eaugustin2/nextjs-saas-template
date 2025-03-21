import Link from 'next/link'
import styles from './register.module.css'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'

const Register = () => {
  const registerUser = async (data: FormData) => {
    'use server'

    const password = await hash(data.get('password') as string, 12)
    const user = await prisma.user.create({
      data: {
        name: data.get('name') as string,
        email: data.get('email') as string,
        password,
      },
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create an Account</h1>
        <form action={registerUser} className={styles.form}>
          <div className={styles.formInput}>
            <span>Name:</span>
            <input name="name" />
          </div>
          <div className={styles.formInput}>
            <span>Email:</span>
            <input name="email" type="email" />
          </div>
          <div className={styles.formInput}>
            <span>Password:</span>
            <input name="password" type="password" />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <p>
        Have an account? <Link href="/api/auth/signin">Sign In</Link>
      </p>
    </div>
  )
}

export default Register
