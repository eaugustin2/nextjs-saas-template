import { getServerSession } from 'next-auth'
import { prisma } from '../lib/prisma'
import { authOptions } from './api/auth/[...nextauth]/route'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

const Home = async () => {
  useEffect(() => {
    redirect('/dashboard')
  })

  const session = await getServerSession(authOptions) //can use this for getting session data after login
  return <main></main>
}

export default Home
