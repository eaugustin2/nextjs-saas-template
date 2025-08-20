import Link from 'next/link'
import CTAButton from '../CTAButton/CTAButton'

const NavBar = () => {
  const navItems = [
    { href: '/', title: 'Demo' }, //TODO: when created make a /demo page and update href
    { href: '#features', title: 'Features' },
    { href: '#pricing', title: 'Pricing' },
    { href: '#faq', title: 'FAQs' },
  ]
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur">
      <nav className="my-4 flex flex-row items-center justify-between">
        <div>
          <Link href="/">Logo</Link>
        </div>
        <div>
          <ul className="flex flex-row">
            {navItems.map((item) => (
              <li key={item.title}>
                <CTAButton href={item.href} variant="link">
                  {item.title}
                </CTAButton>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <CTAButton href="/start" variant="outline" size="lg">
            Get Started
          </CTAButton>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
