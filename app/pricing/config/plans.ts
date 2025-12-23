import { SubscriptionTier } from '@prisma/client'

interface PricingPlanInterface {
  plan_id: string | undefined
  link: string | undefined
  name: string
  subscriptionTier: SubscriptionTier
  duration: 'monthly' | 'yearly'
}

//For each plan, we will have a unique plan ID and a unique link to the payment page
//Each plan should also have a monthly and yearly subscription duration
//For 3 paid plans we will have 6 pricing plans (3 monthly and 3 yearly)
//You can use subscription tier above to hjelp categorize the plans
export const PricingPlans: PricingPlanInterface[] = [
  {
    plan_id: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    link: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK,
    name: 'month',
    subscriptionTier: SubscriptionTier.BASIC,
    duration: 'monthly',
  },
  {
    plan_id: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    link: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PAYMENT_LINK,
    subscriptionTier: SubscriptionTier.BASIC,
    name: 'year',
    duration: 'yearly',
  },
]
