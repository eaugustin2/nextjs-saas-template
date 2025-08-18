import { Form as VerifyForm } from './form'
import styles from './verify.module.css'

// This is the page that will be rendered when the user is redirected to /start/verify
// after submitting their email in the start form.
// It will display a message asking the user to enter the code sent to their email.

const Verify = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Leave space for a logo */}
        <h1 className="text-3xl font-bold">We Emailed You A Code</h1>
        <div>
          <span className={styles.subtitle}>
            Please enter your code below to continue
          </span>
        </div>
        <VerifyForm />
      </div>
    </div>
  )
}

export default Verify
