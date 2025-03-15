import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]/route'

export const GET = async () => {
  const session = await getServerSession(authOptions)
  console.log('session: ', session)
}
