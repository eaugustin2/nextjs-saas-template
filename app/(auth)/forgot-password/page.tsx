import Link from 'next/link'
import styles from './forgotPassword.module.css'
import { Form as ForgotPasswordForm } from './form'

const ForgotPassword = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Reset Password</h1>
        <ForgotPasswordForm />
      </div>
      <p>
        Have an account? <Link href="/login">Sign In</Link>
      </p>
    </div>
  )
}

export default ForgotPassword
