import withAuth from 'next-auth/middleware'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth

    if (
      token &&
      token.subscriptionStatus !== 'SUBSCRIBED' &&
      token.role === 'USER'
    ) {
      if (!req.nextUrl.pathname.startsWith('/pricing')) {
        return NextResponse.redirect(new URL('/pricing', req.url))
      }
    }

    // If no redirect, return nothing (Next.js expects undefined or NextResponse)
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      },
    },
  }
)

//This will protect any routes defined in here
//To protect a folder and any subdirectories: '/folder/:path*, can use on app directory if necessary
// export const config = {
//   matcher: ['/dashboard'], //Example
// }

//We are whitelisting what routes not to protect here. Any route not listed below is protected
//To whitelist another route, add it to the regex below like |folder_name
export const config = {
  matcher: ['/((?!start).*)'],
}
