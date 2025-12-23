'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface PricingProps {
  starter_link?: string
  studious_link?: string
  scholar_link?: string
}

export default function Pricing({
  starter_link,
  studious_link,
  scholar_link,
}: PricingProps) {
  //TODO: Add Toggle for Monthly vs Annual

  const [isMonthly, setIsMonthly] = useState(true)

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for getting started',
      price: 'Free',
      period: '',
      link: starter_link
        ? starter_link
        : process.env.NEXT_PUBLIC_STRIPE_FREE_PAYMENT_LINK,
      features: [
        '50 AI generations/month',
        'Basic quiz generator',
        'Flashcard creator',
        'Up to 3 courses',
        'Community support',
      ],
    },
    {
      name: 'Studious',
      description: 'For serious learners',
      price: isMonthly ? '10.99' : '$7.99',
      link: studious_link
        ? studious_link
        : isMonthly
          ? process.env.NEXT_PUBLIC_STRIPE_STUDIOUS_MONTHLY_PAYMENT_LINK
          : process.env.NEXT_PUBLIC_STRIPE_STUDIOUS_YEARLY_PAYMENT_LINK,
      period: isMonthly ? '/month' : '/month billed annually',
      popular: true,
      features: [
        'Unlimited generations',
        'Advanced quiz engine',
        'Smart flashcards',
        'AI summaries',
        'Unlimited courses',
        'Priority support',
        'Export to PDF',
        'Study analytics',
      ],
    },
    {
      name: 'Scholar',
      description: 'For educators & teams',
      price: isMonthly ? '14.99' : '11.99',
      link: scholar_link
        ? scholar_link
        : isMonthly
          ? process.env.NEXT_PUBLIC_STRIPE_SCHOLAR_MONTHLY_PAYMENT_LINK
          : process.env.NEXT_PUBLIC_STRIPE_SCHOLAR_YEARLY_PAYMENT_LINK,
      period: isMonthly ? '/month' : '/month billed annually',
      features: [
        'Everything in Studious',
        'Team collaboration',
        'Class management',
        'Student progress tracking',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Advanced analytics',
      ],
    },
  ]
  return (
    <section id="pricing" className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="from-primary/20 absolute top-0 left-1/2 h-96 w-96 rounded-full bg-gradient-to-b to-transparent opacity-30 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4 text-center md:mb-20">
          <h2 className="text-foreground text-3xl font-bold md:text-5xl">
            Simple, Transparent{' '}
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Choose the perfect plan for your learning journey
          </p>
        </div>

        <Tabs defaultValue="monthly">
          <TabsList className="mb-16 w-full items-center justify-center">
            <TabsTrigger
              className="cursor-pointer"
              value="monthly"
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value="yearly"
              onClick={() => setIsMonthly(false)}
            >
              Yearly
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'glass shadow-primary/20 border-primary/60 scale-105 border-2 shadow-2xl'
                      : 'glass border border-white/30 dark:border-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="from-primary to-secondary rounded-t-2xl bg-gradient-to-r px-6 py-3 text-center font-semibold text-white">
                      Most Popular
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Name */}
                    <h3 className="text-foreground mb-2 text-2xl font-bold">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-foreground text-5xl font-bold">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link href={plan.link!} target="_blank">
                      <Button
                        className={`mb-8 w-full cursor-pointer rounded-full py-3 font-semibold transition-all duration-300 ${
                          plan.popular
                            ? 'from-primary to-secondary text-primary-foreground hover:shadow-primary/40 bg-gradient-to-r hover:shadow-lg'
                            : 'glass hover:bg-white/20'
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>

                    {/* Features List */}
                    <div className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check
                            size={20}
                            className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-primary' : 'text-secondary'}`}
                          />
                          <span className="text-muted-foreground text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'glass shadow-primary/20 border-primary/60 scale-105 border-2 shadow-2xl'
                      : 'glass border border-white/30 dark:border-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="from-primary to-secondary rounded-t-2xl bg-gradient-to-r px-6 py-3 text-center font-semibold text-white">
                      Most Popular
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Name */}
                    <h3 className="text-foreground mb-2 text-2xl font-bold">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-foreground text-5xl font-bold">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link href={plan.link!} target="_blank">
                      <Button
                        className={`mb-8 w-full cursor-pointer rounded-full py-3 font-semibold transition-all duration-300 ${
                          plan.popular
                            ? 'from-primary to-secondary text-primary-foreground hover:shadow-primary/40 bg-gradient-to-r hover:shadow-lg'
                            : 'glass hover:bg-white/20'
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>

                    {/* Features List */}
                    <div className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check
                            size={20}
                            className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-primary' : 'text-secondary'}`}
                          />
                          <span className="text-muted-foreground text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Pricing Cards */}
      </div>
    </section>
  )
}
