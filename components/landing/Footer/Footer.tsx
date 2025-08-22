import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const Footer = () => {
  return (
    <section className="mt-20 mb-12 flex w-full flex-col">
      <Separator />
      <div className="mt-12 flex flex-row">
        <div className="mr-40 flex flex-col gap-4">
          <Link href="/">
            <h1 className="text-4xl font-bold md:text-5xl">Hero Title</h1>
          </Link>
          <p className="text-lg text-gray-600 md:text-xl">
            Hero subtitle/description
          </p>
        </div>
        <div className="ml-40 flex flex-row gap-10">
          <div className="flex flex-col items-center px-20">
            <h3 className="mb-2 text-2xl font-semibold">Useful Links</h3>
            <Link href="/">Link 1</Link>
            <Link href="/">Link 1</Link>
          </div>
          <div className="flex flex-col items-center px-20">
            <h3 className="mb-2 text-2xl font-semibold">Terms</h3>
          </div>
          <div className="flex flex-col items-center px-20">
            <h3 className="mb-2 text-2xl font-semibold">More</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
