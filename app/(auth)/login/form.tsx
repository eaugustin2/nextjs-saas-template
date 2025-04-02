'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './login.module.css'
import { signIn } from 'next-auth/react'
import { loginRateLimit } from '@/lib/rateLimit'

export const Form = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()

    const { success } = await loginRateLimit.limit(email)

    if (!success) {
      setError('Too many login attempts, Please try again in 15 minutes')
    }

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError('Invalid email or password')
      }
    } catch (err: any) {}
  }

  return (
    <form onSubmit={loginUser} className={styles.form}>
      <div className={styles.formInputContainer}>
        <span className={styles.formLabel}>Email:</span>
        <input
          name="email"
          type="email"
          className={styles.formInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.formInputContainer}>
        <span className={styles.formLabel}>Password:</span>
        <input
          name="password"
          type="password"
          className={styles.formInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}
      <div className={styles.formButtonContainer}>
        <button className={styles.formButton} type="submit">
          Sign In
        </button>
      </div>
    </form>
  )
}
