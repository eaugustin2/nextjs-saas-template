import Link from 'next/link'
import styles from './success.module.css'

const ForgotPasswordSuccess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Reset Password Success</h1>
        <p>Email has been sent, please check spam</p>
        <button>
          <Link href="/api/auth/signin">Return to login</Link>
        </button>
      </div>
    </div>
  )
}

export default ForgotPasswordSuccess
