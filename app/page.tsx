import { getServerSession } from 'next-auth'
import { prisma } from '../lib/prisma'
import { authOptions } from './api/auth/[...nextauth]/route'
import { User } from './user'
import { SignIn, SignOut } from './auth'

const Home = async () => {
  const user = await prisma.user.findFirst({
    where: { email: 'test@test.com' },
  })

  const session = await getServerSession(authOptions) //can use this for getting session data after login
  return (
    <main>
      <SignIn />
      <SignOut />
      <h2>Hello {user?.name}</h2>
      {JSON.stringify(session)}
      <User />
    </main>
  )
}

export default Home
