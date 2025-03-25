import { prisma } from '@/lib/prisma'
import styles from './passwordReset.module.css'
import { hash } from 'bcrypt'
import { redirect } from 'next/navigation'

const PasswordReset = ({ params }: { params: { token: string } }) => {
  const passwordReset = async (data: FormData) => {
    'use server'

    const { token } = await params
    const password = data.get('password')
    const confirmPassword = data.get('confirm')

    if (!password || !confirmPassword) {
      return {
        error: 'Password fields cannot be empty',
      } as any
    }

    if (typeof password !== 'string' || typeof confirmPassword !== 'string') {
      return {
        error: 'Invalid Passwords',
      } as any
    }

    if (password !== confirmPassword) {
      return {
        error: 'Passwords do not match',
      } as any
    }

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token: token,
        createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) }, //miliseconds, seconds minutes hours => less than 4 hours
        resetAt: null,
      },
    })

    if (!passwordResetToken) {
      return {
        error:
          'Invalid Token used for password reset. Try resetting password again.',
      } as any
    }

    const newPassword = await hash(password, 12)
    const updateUser = prisma.user.update({
      where: {
        id: passwordResetToken.userId,
      },
      data: {
        password: newPassword,
      },
    })

    const updateToken = prisma.passwordResetToken.update({
      where: {
        id: passwordResetToken.id,
      },
      data: {
        resetAt: new Date(),
      },
    })

    try {
      prisma.$transaction([updateToken, updateUser]) // if either fails, we do not want to update DB
    } catch (e) {
      console.error(e)
      return e
    }
    redirect('/api/auth/signin')
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create a new Password</h1>
        <form action={passwordReset} className={styles.form}>
          <div className={styles.formInput}>
            <span>Password:</span>
            <input name="password" type="password" />
          </div>

          <div className={styles.formInput}>
            <span>Confirm Password:</span>
            <input name="confirm" type="password" />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default PasswordReset
