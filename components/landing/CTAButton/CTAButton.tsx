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
  classes?: string
}

const CTAButton = ({
  href,
  variant,
  children,
  size = 'default',
  classes,
}: CTAButtonInterface) => {
  return (
    <Button className={`${classes}`} asChild variant={variant} size={size}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default CTAButton
