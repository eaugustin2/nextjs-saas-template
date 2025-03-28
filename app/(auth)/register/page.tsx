import Link from 'next/link'
import styles from './register.module.css'
import { Form as RegisterForm } from './form' //changing name since there is a form in login

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create an Account</h1>
        <RegisterForm />
      </div>
      <p>
        Have an account? <Link href="/login">Sign In</Link>
      </p>
    </div>
  )
}

export default Register
