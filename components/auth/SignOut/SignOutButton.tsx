'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import styles from './signout.module.css'

const SignOutButton = () => {
  return (
    <Button variant="link" onClick={() => signOut()} className={styles.button}>
      <LogOut /> Logout
    </Button>
  )
}

export default SignOutButton
