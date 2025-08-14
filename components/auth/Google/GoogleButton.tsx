'use client'

import { Button } from '@/components/ui/button'
import Icon from './Icon'
import styles from './GoogleButton.module.css'
import { signIn } from 'next-auth/react'

const GoogleButton = () => {
  return (
    <div className={styles.googleButtonContainer}>
      <Button
        className={styles.googleButton}
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      >
        <Icon />
        Continue with Google
      </Button>
    </div>
  )
}

export default GoogleButton
