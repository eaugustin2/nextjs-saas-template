interface PricingPlanInterface {
  plan_id: string | undefined
  link: string | undefined
  name: string
  duration: 'monthly' | 'yearly'
}

export const PricingPlans: PricingPlanInterface[] = [
  {
    plan_id: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    link: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK,
    name: 'month',
    duration: 'monthly',
  },
  {
    plan_id: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    link: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PAYMENT_LINK,
    name: 'year',
    duration: 'yearly',
  },
]
