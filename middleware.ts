export { default } from 'next-auth/middleware'

//This will protect any routes defined in here
//To protect a folder and any subdirectories: '/folder/:path*, can use on app directory if necessary
export const config = {
  matcher: ['/dashboard'],
}
