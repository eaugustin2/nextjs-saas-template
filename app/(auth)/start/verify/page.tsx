import { Form as VerifyForm } from './form'
import styles from './verify.module.css'

// This is the page that will be rendered when the user is redirected to /start/verify
// after submitting their email in the start form.
// It will display a message asking the user to enter the code sent to their email.

const Verify = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>We Emailed You A Code</h1>
        <div>
          <h3>Please enter your code below to continue</h3>
        </div>
        <VerifyForm />
      </div>
    </div>
  )
}

export default Verify
