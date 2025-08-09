'use client'

import { useState } from 'react'
import { startUser } from './actions'
import styles from './start.module.css'
import { redirect } from 'next/navigation'

export const Form = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmission = async (data: FormData) => {
    const resp = await startUser(data)

    if (resp?.error) {
      setError(resp.error)
      return
    }
    redirect('/start/verify')
  }
  return (
    <form action={handleSubmission} className={styles.form}>
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
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}
      <div className={styles.formButtonContainer}>
        <button className={styles.formButton} type="submit">
          Continue
        </button>
      </div>
    </form>
  )
}
