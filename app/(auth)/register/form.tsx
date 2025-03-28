'use client'

import { useState } from 'react'
import { registerUser } from './actions'
import styles from './register.module.css'

export const Form = () => {
  const handleRegisterUser = async (data: FormData) => {
    const resp = await registerUser(data)

    if (resp?.error) {
      setError(resp.error)
    }
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  return (
    <form action={handleRegisterUser} className={styles.form}>
      <div className={styles.formInputContainer}>
        <span className={styles.formLabel}>Name:</span>
        <input
          name="name"
          className={styles.formInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
          Register
        </button>
      </div>
    </form>
  )
}
