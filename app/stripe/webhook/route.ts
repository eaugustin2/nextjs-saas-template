import { NextRequest } from 'next/server'
import { Stripe } from 'stripe'
import { prisma } from '@/lib/prisma'
import { PricingPlans } from '@/app/pricing/config/plans'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

export const POST = async (req: NextRequest) => {
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('Invalid Request', { status: 400 })
  }

  let event: Stripe.Event
  let priceId: string | undefined

  // Verify the webhook signature
  try {
    const body = await req.text()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Error constructing Stripe event:', err)
    return new Response('Webhook Error', { status: 400 })
  }

  let data: Stripe.Event.Data = event.data

  if (!event.type) {
    console.error('Event type is missing:', event)
    return new Response('Invalid Event', { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      //update user subscription status in the database
      let dataObject = data.object as Stripe.Checkout.Session
      console.log('dataObject:', dataObject)

      const session = await stripe.checkout.sessions.retrieve(dataObject.id, {
        expand: ['line_items'],
      })

      const customerID = session?.customer as string
      const customer = await stripe.customers.retrieve(customerID)

      priceId = session?.line_items?.data[0]?.price?.id
      console.log('priceId:', priceId)

      if (!priceId) {
        return new Response('Price ID not found in session', { status: 400 })
      }

      const plan = PricingPlans.find((p) => p.plan_id === priceId)
      console.log('plan:', plan)

      if (!plan) {
        break
      }

      if (!customer.deleted && customer.email) {
        const user = await prisma.user.findUnique({
          where: { email: customer.email },
        })

        if (user) {
          console.log('User found:', user.email, 'subscribing to', plan.name)
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: 'SUBSCRIBED',
              name: customer.name || '',
              stripeCustomerId: customer.id,
              stripePriceId: priceId,
            },
          })
        } else {
          return new Response('User not found', { status: 500 })
        }
      } else {
        return new Response('Customer not found or deleted', { status: 500 })
      }

      //TODO: Send email to user about successful subscription

      break

    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      const subscription = data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const user = await prisma.user.findUnique({
        where: { stripeCustomerId: customerId },
      })

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { subscriptionStatus: 'NOT_SUBSCRIBED' },
        })
      } else {
        console.error('User not found for cancelled subscription:', customerId)
        return new Response('User not found for cancelled subscription', {
          status: 500,
        })
      }

      break

    case 'checkout.session.expired':
      //Handle session expiration if customer leaves the checkout page
      //can send an email to the user about the session expiration
      console.log('Checkout session expired:')
      break

    case 'customer.subscription.updated':
      // Handle subscription updates
      // This can include changes in plan, payment method, etc.
      //update user subscription status in the database if user changes plan

      const updatedSubscription = data.object as Stripe.Subscription
      const updateCustomerId = updatedSubscription.customer as string

      const updatedUser = await prisma.user.findUnique({
        where: { stripeCustomerId: updateCustomerId },
      })

      if (!updatedUser) {
        console.error(
          'User not found for updated subscription:',
          updateCustomerId
        )
        return new Response('User not found for updated subscription', {
          status: 500,
        })
      }

      priceId = updatedSubscription?.items?.data[0]?.price?.id

      if (!priceId) {
        return new Response('Price ID not found in session', { status: 400 })
      }

      const updatedPlan = PricingPlans.find((p) => p.plan_id === priceId)

      if (!updatedPlan) {
        console.error('Plan not found for updated subscription:', priceId)
        return new Response('Plan not found for updated subscription', {
          status: 500,
        })
      }

      if (updatedUser && updatedPlan?.plan_id !== updatedUser.stripePriceId) {
        //user changed plan
        console.log(
          'User changed plan:',
          updatedUser.email,
          'to',
          updatedPlan?.name
        )
        await prisma.user.update({
          where: { id: updatedUser.id },
          data: {
            stripePriceId: priceId,
          },
        })
      }
      break
  }

  return new Response('Webhook received', { status: 200 })
}
