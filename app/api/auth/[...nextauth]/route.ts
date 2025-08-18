import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/start',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        if (!user.active) {
          throw new Error('User is not active')
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          subscriptionStatus: user.subscriptionStatus,
          role: user.role,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        const email = user?.email || ''
        const name = user?.name || ''

        const isUser = (await prisma.user.findUnique({
          where: {
            email,
          },
        })) as any

        if (isUser) {
          //update meta data
          await prisma.user.update({
            where: {
              email,
            },
            data: {
              name,
            },
          })
        } else {
          //create new user
          await prisma.user.create({
            data: {
              name,
              email,
              active: true,
            },
          })
        }
      }

      return true
    },
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          subscriptionStatus: token.subscriptionStatus,
          role: token.role,
        },
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any //TODO: Should be prisma User
        return {
          ...token,
          id: u.id,
          email: u.email,
          name: u.name,
          subscriptionStatus: u.subscriptionStatus,
          role: u.role,
        }
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
