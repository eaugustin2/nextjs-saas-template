import styles from './start.module.css'
import { Form as StartForm } from './form' //changing name since there is a form in login

const Start = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="header">Enter Email To Continue</h1>
        <StartForm />
      </div>
    </div>
  )
}

export default Start
