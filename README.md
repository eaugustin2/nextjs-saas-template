# NextJS REST API Template

This is a NextJS REST API Template.

## Dependencies

- Next-auth
- Prisma
- Postgres
- Eslint
- bcrypt
- Tailwind

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

## Environment Variables

| Name            | Description                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| DATABASE_URL    | Postgres connection string example "postgresql://username:password@localhost:port/postgres?schema=schema |
| NEXTAUTH_SECRET | JWT Hash                                                                                                 |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
