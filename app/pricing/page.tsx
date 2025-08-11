import Pricing from './Pricing'
import styles from './pricing.module.css'

const PricingPage = () => {
  return (
    <div className={styles.pricingPageContainer}>
      <h1>Pricing Page</h1>
      <Pricing />
    </div>
  )
}

export default PricingPage
