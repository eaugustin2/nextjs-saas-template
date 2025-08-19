import CTAButton from '@/components/landing/CTAButton/CTAButton'
import Hero from '@/components/landing/Hero/Hero'
import NavBar from '@/components/landing/NavBar/NavBar'
import Link from 'next/link'

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col">
      {/**Nav Bar (Logo, Demo, Features, Pricing, FAQs, Login/Get Started button) */}
      <NavBar />
      {/**Hero section split into two halves. Left half with Header, subtitle and CTA buttons (Get Started, Demo) Other half is picture/video of product */}
      <Hero />
      {/**Social Proof? */}
      {/**Features/benefits */}
      {/**FAQs */}
      {/**Plans */}
      {/**Footer (links to docs, social media, etc...) */}
    </main>
  )
}

export default Home
