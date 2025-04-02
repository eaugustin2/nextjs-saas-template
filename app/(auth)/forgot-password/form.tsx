import styles from './forgotPassword.module.css'
import { resetPassword } from './actions'
import { useState } from 'react'

export const Form = () => {
  const [email, setEmail] = useState('')

  const [error, setError] = useState('')

  const handleForgotPassword = async (data: FormData) => {
    const resp = await resetPassword(data)

    if (resp?.error) {
      setError(resp.error)
    }
  }

  return (
    <form action={handleForgotPassword} className={styles.form}>
      <div className={styles.formInput}>
        <span>Email:</span>
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}
      <button type="submit">Reset Password</button>
    </form>
  )
}
