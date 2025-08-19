import CTAButton from '../CTAButton/CTAButton'

const Hero = () => {
  return (
    <section className="flex flex-1 flex-row items-center bg-gray-50">
      <div className="flex w-2/4 flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold md:text-5xl">Hero Title</h1>
        <p className="text-lg text-gray-600 md:text-xl">
          Hero subtitle/description
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <CTAButton href="/start" variant="outline" size="lg">
            Get Started
          </CTAButton>
          <span>Or</span>
          <CTAButton href="/" variant="ghost" size="lg">
            Demo
          </CTAButton>
        </div>
      </div>
      <div className="flex w-2/4 items-center justify-center">Media</div>
    </section>
  )
}

export default Hero
