const Features = () => {
  return (
    <section className="mt-4 flex w-full flex-col">
      <div className="flex w-full flex-row">
        <div className="w-2/4 items-center">
          <h2 className="text-2xl font-semibold text-gray-700">Feature 1</h2>
          <p className="mt-2 text-gray-500">
            Everything you need to onboard clients faster.
          </p>
          <ul className="m-4">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
        <div className="flex w-2/4 items-center justify-center">Media 1</div>
      </div>
      <div className="flex w-full flex-row">
        <div className="flex w-2/4 items-center justify-center">Media 2</div>
        <div className="w-2/4 items-center">
          <h2 className="text-2xl font-semibold text-gray-700">Feature 2</h2>
          <p className="mt-2 text-gray-500">
            Everything you need to onboard clients faster.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features
