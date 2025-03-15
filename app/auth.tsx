'use client'

import { signIn, signOut } from 'next-auth/react'

export const SignIn = () => {
  return (
    <button style={{ cursor: 'pointer' }} onClick={() => signIn()}>
      Sign In
    </button>
  )
}

export const SignOut = () => {
  return (
    <button style={{ cursor: 'pointer' }} onClick={() => signOut()}>
      Sign Out
    </button>
  )
}
