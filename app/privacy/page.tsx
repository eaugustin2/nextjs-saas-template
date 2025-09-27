import Footer from '@/components/landing/Footer/Footer'

const Privacy = () => {
  const appName: string = '' //TODO
  const email: string = ''
  return (
    <section className="mx-20 mt-16 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Privacy Notice for {appName}</h1>
      <p className="flex flex-row">
        <span className="font-bold">Effective Date: </span>{' '}
        <span> September 14, 2025</span> {/** //TODO: Change when deploying */}
      </p>
      <p>
        {appName} respects your privacy and is committed to protecting your
        personal information. This Privacy Policy explains how we collect, use,
        and protect the information you provide when using our website, app, or
        service.
      </p>
      <ol className="flex flex-col gap-8">
        <li className="flex flex-col">
          <h3 className="text-xl font-semibold">1. Information We Collect</h3>
          <p>
            When you use {appName}, we may collect the following information:
          </p>
          <ul className="list-inside list-disc">
            <li>
              <span className="font-semibold">Email Account Access:</span> With
              your permission, we access your Gmail account via Google OAuth to
              read, categorize, and delete/unsubscribe emails.
            </li>
            <li>
              <span className="font-semibold">Device Information:</span>{' '}
              Information about your device, browser, and IP address.
            </li>
            <li>
              <span className="font-semibold">Usage Data:</span> Information
              about how you use the app, including features accessed, actions
              taken, and errors encountered.
            </li>
          </ul>
          <p>
            <span className="font-semibold">
              We do NOT store your email content on our servers,
            </span>{' '}
            except temporarily if necessary to perform a requested action (like
            unsubscribing).
          </p>
          <p>
            We may also collect information automatically through cookies or
            analytics tools to improve your experience.
          </p>
        </li>
        <li className="flex flex-col">
          <h3 className="text-xl font-semibold">
            2. How We Use Your Information
          </h3>
          <p>We use your information to:</p>
          <ul className="flex list-inside list-disc flex-col">
            <li>Provide and maintain our service.</li>
            <li>Improve features, functionality, and user experience.</li>
            <li>
              Send service-related communications, such as updates or support
              messages.
            </li>
            <li>Analyze trends and usage to improve our project.</li>
          </ul>
        </li>
        <li>
          <h3 className="text-xl font-semibold">3. Sharing Your Information</h3>
          <p>
            We do not sell, rent, or trade your personal information. We may
            share information in the following cases:
          </p>
          <ul className="list-inside list-disc">
            <li>
              <span className="font-semibold">Service Providers:</span>{' '}
              Third-party providers who help operate or maintain the service.
            </li>
            <li>
              <span className="font-semibold">Legal Requirements:</span> If
              required by law, regulation, or legal process.
            </li>
          </ul>
        </li>
        <li>
          <h3 className="text-xl font-semibold">4. Data Security</h3>
          <p>
            We implement reasonable technical, administrative, and physical
            safeguards to protect your information. However, no method of
            transmission over the internet is 100% secure.
          </p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">5. Your Rights</h3>
          <p>Depending on your location, you may have rights such as:</p>
          <ul className="list-inside list-disc">
            <li>Accessing or requesting a copy of your personal data.</li>
            <li>Correcting or deleting personal data we hold about you.</li>
            <li>
              Opting out of communications or revoking consent for data
              collection.
            </li>
          </ul>
        </li>
        <li>
          <h3 className="text-xl font-semibold">6. Third-Party Services</h3>
          <p>
            Our project may use third-party services, analytics, or hosting
            platforms. These third parties may collect information in accordance
            with their own privacy policies.
          </p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">7. Children Privacy</h3>
          <p>
            Our service is not intended for children under 13. We do not
            knowingly collect information from children.
          </p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">8. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted here with an updated effective date.
          </p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">9. Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy or our practices,
            contact us <a href={`mailto:${email}`}>here</a>
          </p>
        </li>
      </ol>
      <Footer />
    </section>
  )
}

export default Privacy
