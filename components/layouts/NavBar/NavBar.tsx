'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import { useSession } from 'next-auth/react'
import { SignOut } from '../../../app/auth'
import { usePostHog } from 'posthog-js/react'

const NavBar = () => {
  const { data: session } = useSession()
  const posthog = usePostHog()
  const customerPortalUrl = `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${session?.user?.email}`
  return (
    <nav>
      {session && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink
              href={customerPortalUrl}
              target="_blank"
              onClick={() => posthog.capture('clicked_billing')}
            >
              Billing
            </NavigationMenuLink>
            <NavigationMenuLink>
              <SignOut />
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </nav>
  )
}

export default NavBar
