export { default } from 'next-auth/middleware'

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
