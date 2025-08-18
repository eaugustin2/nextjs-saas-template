'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import { usePostHog } from 'posthog-js/react'
import { CreditCard } from 'lucide-react'
import SignOutButton from '@/components/auth/SignOut/SignOutButton'
import styles from './navbar.module.css'
import { Button } from '@/components/ui/button'

const NavBar = () => {
  const { data: session } = useSession()
  const name: string | undefined = session?.user?.name
    ? session.user.name.split(' ')[0]
    : session?.user?.email!.split('@')[0]
  const posthog = usePostHog()
  const customerPortalUrl = `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${session?.user?.email}`
  return (
    <>
      {session && (
        <NavigationMenu>
          <NavigationMenuList className={styles.navList}>
            <NavigationMenuLink href="/">Logo</NavigationMenuLink>
            <NavigationMenuItem>
              {/* <NavigationMenuTrigger className={styles.trigger}>
                {name ? name : 'User'}
              </NavigationMenuTrigger> */}

              {/* <NavigationMenuContent className={styles.dropdownList}>
                
                <ul className={styles.ul}>
                  <li className={styles.li}>
                    <NavigationMenuLink
                      href={customerPortalUrl}
                      target="_blank"
                      onClick={() => posthog.capture('clicked_billing')}
                      className={styles.dropdownItem}
                    >
                      <CreditCard />
                      Billing
                    </NavigationMenuLink>
                  </li>
                 
                  <li className={styles.li}>
                    <NavigationMenuLink>
                      <SignOutButton />
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{name ? name : 'User'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  )
}

export default NavBar
