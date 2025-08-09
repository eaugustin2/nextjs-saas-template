'use client'

import { useState } from 'react'
import { loginUser } from './actions'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import styles from './verify.module.css'

export const Form = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleOTP = async (data: FormData) => {
    const resp = await loginUser(data)

    if (resp?.error) {
      setError(resp.error)
      return
    } else {
      const res = await signIn('credentials', {
        redirect: false,
        email: resp.email,
        callbackUrl: '/dashboard',
      })

      console.log('res:' + res)

      if (res?.error) {
        setError('Login failed')
      }
      router.push('/dashboard') // Redirect to dashboard on successful login
    }
  }

  return (
    <form action={handleOTP} className={styles.form}>
      <div className={styles.formInputContainer}>
        <input
          type="text"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <div className={styles.formButtonContainer}>
        <button type="submit" className={styles.formButton}>
          Continue
        </button>
      </div>
      {error && (
        <div>
          <span>{error}</span>
        </div>
      )}
    </form>
  )
}
