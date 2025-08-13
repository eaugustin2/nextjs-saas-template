'use client'

import { useEffect, useRef, useState } from 'react'
import { loginUser } from './actions'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import styles from './verify.module.css'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

export const Form = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const inputOTP = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const isDigit = /^\d$/.test(e.key)
      const isBackspace = e.key === 'Backspace'
      const otpElement = inputOTP.current as HTMLInputElement | null
      const isOTPFocused =
        otpElement && otpElement.contains(document.activeElement)

      if (!isOTPFocused) {
        if (isDigit) {
          setCode((prev) => (prev.length < 6 ? prev + e.key : prev))
          otpElement?.focus()
          e.preventDefault()
        }
        if (isBackspace) {
          setCode((prev) => prev.slice(0, -1))
          otpElement?.focus()
          e.preventDefault()
        }
      }
      // If OTP is focused, just let normal typing happen
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  })

  const handleOTP = async (data: FormData) => {
    const resp = await loginUser(data)

    if (resp?.error) {
      setError(resp.error)
      return
    } else {
      const res = await signIn('credentials', {
        redirect: false,
        email: resp.email,
        callbackUrl: '/dashboard',
      })

      console.log('res:' + res)

      if (res?.error) {
        setError('Login failed')
      }
      router.push('/dashboard') // Redirect to dashboard on successful login
    }
  }

  return (
    <form action={handleOTP} className={styles.form}>
      <div className={styles.formInputContainer}>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={code}
          onChange={(value) => setCode(value)}
          containerClassName={styles.inputOtpContainer}
          ref={inputOTP}
          name="code"
        >
          <InputOTPGroup className={styles.inputOtpGroup}>
            <InputOTPSlot index={0} className={styles.inputOtpSlot} />
            <InputOTPSlot index={1} className={styles.inputOtpSlot} />
            <InputOTPSlot index={2} className={styles.inputOtpSlot} />
          </InputOTPGroup>
          <InputOTPSeparator className={styles.inputOtpSeparator} />
          <InputOTPGroup className={styles.inputOtpGroup}>
            <InputOTPSlot index={3} className={styles.inputOtpSlot} />
            <InputOTPSlot index={4} className={styles.inputOtpSlot} />
            <InputOTPSlot index={5} className={styles.inputOtpSlot} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className={styles.formButtonContainer}>
        <Button
          type="submit"
          className={styles.formButton}
          disabled={!code || code.length < 6}
        >
          Continue
        </Button>
      </div>
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}
    </form>
  )
}
