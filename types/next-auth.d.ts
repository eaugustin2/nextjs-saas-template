import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      role: string
      subscriptionStatus: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: number
    role: string
    subscriptionStatus: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number
    role: string
    subscriptionStatus: string
  }
}
