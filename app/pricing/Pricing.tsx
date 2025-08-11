'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import styles from './pricing.module.css'
import { CircleCheck } from 'lucide-react'

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true)

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
          <button className="btn btn-primary">Subscribe Now</button>
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
          <button className="btn btn-primary">Subscribe Now</button>
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
      {/* <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle>
                <strong>{plans[0].price}</strong>/{plans[0].period}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              <span className={styles.feature}>
                <CircleCheck />
                feature 1
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
            </CardContent>
            <CardAction className={styles.cardAction}>
              <button className="btn btn-primary">Subscribe Now</button>
            </CardAction>
          </Card>
        </TabsContent>
        <TabsContent value="yearly">
          <Card>
            <CardHeader>
              <CardTitle>
                {plans[1].price}/{plans[1].period}
              </CardTitle>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs> */}
    </div>
  )
}

export default Pricing
