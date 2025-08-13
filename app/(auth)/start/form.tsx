'use client'

import { useState } from 'react'
import { startUser } from './actions'
import styles from './start.module.css'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { z } from 'zod'

export const Form = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailSchema = z.string().email()

  const validEmail = emailSchema.safeParse(email)

  let disabled = !validEmail.success || loading

  const handleSubmission = async (data: FormData) => {
    setLoading(true)
    const resp = await startUser(data)

    if (resp?.error) {
      setError(resp.error)
      setLoading(false)
      return
    }

    setTimeout(() => {
      setLoading(false)
      redirect('/start/verify')
    }, 500) // 500ms delay for spinner visibility
  }
  return (
    <form action={handleSubmission} className={styles.form}>
      <div className={styles.formInputContainer}>
        <input
          name="email"
          type="email"
          className={styles.formInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}
      <div className={styles.formButtonContainer}>
        <Button className={styles.formButton} type="submit" disabled={disabled}>
          {loading ? <Loader className="animate-spin" /> : 'Continue'}
        </Button>
      </div>
    </form>
  )
}
