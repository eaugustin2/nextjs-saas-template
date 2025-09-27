import CTAButton from '../CTAButton/CTAButton'

const Hero2 = () => {
  return (
    <section className="mt-8 mb-60 flex flex-1 flex-col items-center">
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-3">
        <h1 className="items-center justify-center text-4xl font-bold md:text-5xl">
          MASTER YOUR EMAIL <span className="text-green-700">WORKFLOW</span>
        </h1>
        <p className="flex w-[50%] text-center text-lg text-gray-600 md:text-xl">
          Transform your email management with intelligent automation, powerful
          analytics, and seamless organization tools that save you hours every
          day.
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <CTAButton
            classes="bg-green-700 hover:bg-green-600 hover:text-white text-white"
            href="/start"
            variant="outline"
            size="lg"
          >
            Get Started
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

export default Hero2
