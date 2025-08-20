import Hero from '@/components/landing/Hero/Hero'
import NavBar from '@/components/landing/NavBar/NavBar'
import Features from '@/components/landing/Features/Features'

const Home = async () => {
  return (
    <main className="mx-8 flex min-h-screen flex-col">
      {/**Nav Bar (Logo, Demo, Features, Pricing, FAQs, Login/Get Started button) */}
      <NavBar />
      {/**Hero section split into two halves. Left half with Header, subtitle and CTA buttons (Get Started, Demo) Other half is picture/video of product */}
      <Hero />
      {/**Social Proof? */}
      {/**Features/benefits */}
      <Features />
      {/**FAQs */}
      {/**Plans */}
      {/**Footer (links to docs, social media, etc...) */}
    </main>
  )
}

export default Home
