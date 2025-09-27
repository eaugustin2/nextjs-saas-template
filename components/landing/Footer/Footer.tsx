import Logo from '@/components/logo/Logo'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const Footer = () => {
  const companyName: string = 'CompanyName.'
  return (
    <section className="mt-20 mb-12 flex w-full flex-col">
      <Separator />
      <div className="mt-12 flex flex-row justify-between">
        <div className="mr-40 flex flex-col gap-4">
          <Logo />
        </div>
        <div className="ml-40 flex flex-row gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/">Terms</Link>
          <Link href="/">Support</Link>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center text-center">
        <span>© 2025 {companyName} All rights reserved.</span>
      </div>
    </section>
  )
}

export default Footer
