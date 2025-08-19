'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CTAButtonInterface {
  href: string
  variant:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined
  children: string
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
}

const CTAButton = ({
  href,
  variant,
  children,
  size = 'default',
}: CTAButtonInterface) => {
  return (
    <Button asChild variant={variant} size={size}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default CTAButton
