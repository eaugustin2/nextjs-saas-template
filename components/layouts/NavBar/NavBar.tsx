'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { usePostHog } from 'posthog-js/react'
import { CreditCardIcon, LogOut } from 'lucide-react'
import styles from './navbar.module.css'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
        // <NavigationMenu className="max-w-full justify-between">
        //   <NavigationMenuList className="max-w-full">
        //     <NavigationMenuLink href="/">Logo</NavigationMenuLink>
        //     <NavigationMenuItem>

        //       <DropdownMenu>
        //         <DropdownMenuTrigger asChild>
        //           <Button variant="outline">{name ? name : 'User'}</Button>
        //         </DropdownMenuTrigger>
        //         <DropdownMenuContent>
        //           <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
        //           <DropdownMenuSeparator />
        //           <DropdownMenuItem>Profile</DropdownMenuItem>
        //           <DropdownMenuItem>Billing</DropdownMenuItem>
        //           <DropdownMenuItem>Team</DropdownMenuItem>
        //           <DropdownMenuItem>Subscription</DropdownMenuItem>
        //         </DropdownMenuContent>
        //       </DropdownMenu>
        //     </NavigationMenuItem>
        //   </NavigationMenuList>
        // </NavigationMenu>
        <nav className={styles.nav}>
          <div>Logo</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                {name ? name : 'User'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="w-full cursor-pointer">
                <Link
                  href={customerPortalUrl}
                  target="_blank"
                  className="flex w-full flex-row items-center gap-1.5"
                  onClick={() => posthog.capture('clicked_billing')}
                >
                  {' '}
                  <CreditCardIcon /> Billing
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="w-full cursor-pointer"
                onClick={() => signOut()}
              >
                {/* <SignOutButton /> */}
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      )}
    </>
  )
}

export default NavBar
