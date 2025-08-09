'use server'

import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import { cookies } from 'next/headers'

export const loginUser = async (data: FormData) => {
  const token = (await data.get('code')) as string
  const cookieStore = await cookies()
  const email = cookieStore.get('email')?.value

  const verifyToken = await prisma.oTPToken.findUnique({
    where: {
      email,
    },
  })

  if (!verifyToken) {
    return { error: 'No verification token found for this email' }
  }

  if (!compare(token, verifyToken?.token)) {
    return { error: 'Invalid token' }
  }

  const user = await prisma.user.findFirst({
    where: {
      OTPToken: {
        OR: [
          {
            createdAt: {
              gt: new Date(Date.now() - 15 * 60 * 1000), // created within 15 minutes
            },
          },
          {
            updatedAt: {
              gt: new Date(Date.now() - 15 * 60 * 1000), // updated within 15 minutes
            },
          },
        ],
        token: verifyToken?.token,
      },
    },
  })

  if (!user) {
    return { error: 'No user found for this token' }
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      active: true,
    },
  })

  await prisma.oTPToken.update({
    where: {
      email,
    },
    data: {
      activatedAt: new Date(),
    },
  })

  return { success: true, email }
}
