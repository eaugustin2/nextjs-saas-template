'use client'

import { useState } from 'react'
import { startUser } from './actions'
import styles from './start.module.css'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { z } from 'zod'
import GoogleButton from '@/components/auth/Google/GoogleButton'
import { usePostHog } from 'posthog-js/react'

export const Form = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailSchema = z.string().email()

  const validEmail = emailSchema.safeParse(email)

  let disabled = !validEmail.success || loading

  const posthog = usePostHog()

  const handleSubmission = async (data: FormData) => {
    posthog.capture('clicked_start_email', {
      email: data.get('email'),
    })
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
      <GoogleButton />
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

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
