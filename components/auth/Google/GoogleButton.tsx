'use client'

import { Button } from '@/components/ui/button'
import Icon from './Icon'
import styles from './GoogleButton.module.css'
import { signIn } from 'next-auth/react'
import { usePostHog } from 'posthog-js/react'

const GoogleButton = () => {
  const posthog = usePostHog()

  const handleGoogleSignIn = () => {
    posthog.capture('clicked_google_signin')
    signIn('google', { callbackUrl: '/dashboard' })
  }
  return (
    <div className={styles.googleButtonContainer}>
      <Button className={styles.googleButton} onClick={handleGoogleSignIn}>
        <Icon />
        Continue with Google
      </Button>
    </div>
  )
}

export default GoogleButton
