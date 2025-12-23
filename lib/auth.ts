import { NextAuthOptions } from 'next-auth'
import { prisma } from './prisma'
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
          id: user.id,
          email: user.email,
          name: user.name,
          subscriptionStatus: user.subscriptionStatus,
          role: user.role,
          subscriptionTier: user.subscriptionTier,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      async profile(profile) {
        let dbUser = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        })

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              active: true,
            },
          })
        }

        //Overriding defaults of what Google Prodivder sends for custom fields
        return {
          id: dbUser?.id,
          name: dbUser?.name,
          email: dbUser?.email,
          role: dbUser?.role,
          subscriptionStatus: dbUser?.subscriptionStatus,
          subscriptionTier: dbUser?.subscriptionTier,
        }
      },
    }),
  ],
  callbacks: {
    signIn: async () => {
      //can approve/deny who can access app in here
      // can use { user, account } as params to check if user is allowed to sign in
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
          //extra params
          subscriptionStatus: token.subscriptionStatus,
          role: token.role,
          subscriptionTier: token.subscriptionTier,
        },
      }
    },
    jwt: async ({ token, user }) => {
      console.log('JWT Callback', { token, user })

      if (user) {
        //initial sign in
        token.id = Number(user.id)
        token.email = user.email
        token.name = user.name
        token.subscriptionStatus = user.subscriptionStatus!
        token.role = user.role
        token.subscriptionTier = user.subscriptionTier
      } else {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: token.email || '',
          },
        })

        console.log('dbUser: ', dbUser)

        if (dbUser) {
          token.subscriptionStatus = dbUser.subscriptionStatus!
          token.role = dbUser.role
          token.subscriptionTier = dbUser.subscriptionTier
        }
      }

      console.log('token to be returned: ', token)
      return token
    },
  },
}
