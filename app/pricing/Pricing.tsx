'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import styles from './pricing.module.css'
import { CircleCheck } from 'lucide-react'
import { useSession } from 'next-auth/react'

const Pricing = () => {
  const { data: session } = useSession()
  const [isMonthly, setIsMonthly] = useState(true)
  const [monthlyPaymentLink, setMonthlyPaymentLink] = useState('')
  const [yearlyPaymentLink, setYearlyPaymentLink] = useState('')

  // Set the payment links based on the user's email and session loading
  useEffect(() => {
    if (session?.user?.email) {
      setMonthlyPaymentLink(
        `${process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK}?prefilled_email=${session.user.email}`
      )
      setYearlyPaymentLink(
        `${process.env.NEXT_PUBLIC_STRIPE_YEARLY_PAYMENT_LINK}?prefilled_email=${session.user.email}`
      )
    }
  }, [session?.user?.email])

  const monthlyPlan = () => {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <strong className={styles.price}>19.99</strong>
          <span className={styles.duration}>/month</span>
        </div>
        <div className={styles.cardContent}>
          <span className={styles.feature}>
            <CircleCheck /> feature 1
          </span>
          <span className={styles.feature}>
            <CircleCheck />
            feature 2
          </span>
          <span className={styles.feature}>
            <CircleCheck />
            feature 3
          </span>
          <span className={styles.feature}>
            <CircleCheck />
            feature 4
          </span>
        </div>
        <div className={styles.cardAction}>
          <a target="_blank" href={monthlyPaymentLink} rel="noreferrer">
            <button className="btn btn-primary">Subscribe Now</button>
          </a>
        </div>
      </div>
    )
  }

  const yearlyPlan = () => {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <strong className={styles.price}>99.99</strong>
          <span className={styles.duration}>/year</span>
        </div>
        <div className={styles.cardContent}>
          <span className={styles.feature}>
            <CircleCheck /> feature 1
          </span>
          <span className={styles.feature}>
            <CircleCheck />
            feature 2
          </span>
          <span className={styles.feature}>
            <CircleCheck />
            feature 3
          </span>
          <span className={styles.feature}>
            <CircleCheck />
            feature 4
          </span>
        </div>
        <div className={styles.cardAction}>
          <a target="_blank" href={yearlyPaymentLink} rel="noreferrer">
            <button className="btn btn-primary">Subscribe Now</button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.toggleButtons}>
        <button onClick={() => setIsMonthly(!isMonthly)}>
          {isMonthly ? 'Monthly' : 'Yearly'}
        </button>
      </div>
      {isMonthly ? monthlyPlan() : yearlyPlan()}
    </div>
  )
}

export default Pricing
