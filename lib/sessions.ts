import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

//helper func to get session data and custom data on server but not have to always put authOptions
export function getSession() {
  return getServerSession(authOptions)
}
