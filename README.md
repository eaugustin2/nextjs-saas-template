# NextJS REST API Template

This is a NextJS REST API Template.

## Dependencies

- Next-auth
- Prisma
- Postgres
- Eslint
- bcrypt
- Tailwind
- Mailgun
- Zod
- Upstash

## Getting Started

Install node modules:

```bash
npm install
```

Set Database url in .env file (described below)

Generate JWT hash for next-auth:

```bash
npx auth secret
```

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma

To make any migration run command :

```bash
npx prisma migrate dev --name any-migration-name
```

To manually seed database run command:

```bash
npx prisma db seed
```

## PostHog

Capture any custom events using usePostHog hook

## Environment Variables

| Name                                    | Description                                                                                              |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| DATABASE_URL                            | Postgres connection string example "postgresql://username:password@localhost:port/postgres?schema=schema |
| NEXTAUTH_SECRET                         | JWT Hash                                                                                                 |
| MAILGUN_API_KEY                         | API Key for mailgun                                                                                      |
| MAILGUN_DOMAIN                          | Domain used for mailgun API                                                                              |
| UPSTASH_REDIS_URL                       | URL used to access REDIS DB                                                                              |
| UPSTASH_REDIS_TOKEN                     | Token used to access REDIS DB                                                                            |
| NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK | Link used to send customer to stripe payment                                                             |
| NEXT_PUBLIC_STRIPE_YEARLY_PAYMENT_LINK  | Link used to send customer to stripe payment                                                             |
| NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID     | Price Id to identify monthly plan                                                                        |
| NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID      | Price Id to identify monthly plan                                                                        |
| NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL  | Stripe customer portal link                                                                              |
| STRIPE_SECRET_KEY                       | Stripe secret key for webhook config                                                                     |
| STRIPE_WEBHOOK_SECRET                   | Stripe webhook secret key for webhook config                                                             |
| GOOGLE_CLIENT_ID                        | Client ID used for Google Provider                                                                       |
| GOOGLE_CLIENT_SECRET                    | Secret ID used for Google Provider                                                                       |
| NEXT_PUBLIC_POSTHOG_KEY                 | PostHog Key Provider                                                                                     |
| NEXT_PUBLIC_POSTHOG_HOST                | PostHog Host Provider                                                                                    |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
