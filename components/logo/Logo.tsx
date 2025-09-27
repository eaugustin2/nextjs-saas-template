import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex flex-row items-center justify-center gap-2">
      {/* <Mail className="text-green-700" />{' '} */}
      <span className="text-2xl font-bold">Logo</span>
    </Link>
  )
}

export default Logo
