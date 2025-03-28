import Link from 'next/link'
import styles from './login.module.css'
import { signIn } from 'next-auth/react'
import { Form } from './form'

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Login</h1>
        <Form />
      </div>
      <p>
        Need an account? <Link href="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login
