import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Valentine's Gift Finder",
  description: "Privacy Policy for Valentine's Gift Finder - how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--cream)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-[var(--burgundy)] hover:text-[var(--burgundy-dark)]"
        >
          ← Back to Home
        </Link>

        <h1 className="font-serif text-3xl text-[var(--burgundy-dark)] mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-burgundy max-w-none space-y-6 text-[var(--burgundy)]">
          <p className="text-sm text-[var(--burgundy)]/70">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              1. Introduction
            </h2>
            <p>
              Valentine&apos;s Gift Finder (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website valentines-gift-finder.vercel.app (the &quot;Site&quot;).
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this
              privacy policy, please do not access the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="font-semibold mt-4 mb-2">Information You Provide</h3>
            <p>We may collect information you voluntarily provide, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address (if you subscribe to our newsletter)</li>
              <li>Quiz responses (gift preferences, budget, recipient information)</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="font-semibold mt-4 mb-2">Information Automatically Collected</h3>
            <p>When you visit our Site, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and approximate location</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website or source</li>
              <li>Click data and browsing patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide personalised gift recommendations</li>
              <li>Send newsletters and marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyse usage patterns and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              4. Affiliate Partnerships & Third-Party Links
            </h2>
            <p>
              Our Site contains affiliate links to third-party retailers including Amazon, Etsy,
              Not On The High Street, and Virgin Experience Days. When you click these links and
              make a purchase, we may earn a commission at no extra cost to you.
            </p>
            <p className="mt-2">
              These third-party sites have their own privacy policies, and we encourage you to
              review them. We are not responsible for the privacy practices of these external sites.
            </p>
            <p className="mt-2">
              <strong>Affiliate partners we work with:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Amazon Associates (Amazon.co.uk)</li>
              <li>Awin (Etsy, Not On The High Street)</li>
              <li>Impact.com (Virgin Experience Days)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              5. Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your
              browsing activities. Cookies are small data files stored on your device.
            </p>

            <h3 className="font-semibold mt-4 mb-2">Types of Cookies We Use:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Essential cookies:</strong> Required for the Site to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our Site</li>
              <li><strong>Affiliate cookies:</strong> Track referrals to our affiliate partners</li>
            </ul>

            <p className="mt-4">
              You can control cookies through your browser settings. However, disabling cookies
              may affect the functionality of our Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              6. Your Rights (GDPR & UK Data Protection)
            </h2>
            <p>
              If you are a resident of the UK or European Economic Area, you have certain data
              protection rights under the General Data Protection Regulation (GDPR) and UK GDPR:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Right to access:</strong> Request copies of your personal data</li>
              <li><strong>Right to rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to restrict processing:</strong> Request limitation of data processing</li>
              <li><strong>Right to data portability:</strong> Request transfer of your data</li>
              <li><strong>Right to object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              7. Data Security
            </h2>
            <p>
              We implement appropriate technical and organisational measures to protect your
              personal data against unauthorised access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              8. Data Retention
            </h2>
            <p>
              We retain your personal data only for as long as necessary to fulfil the purposes
              for which it was collected, including to satisfy legal, accounting, or reporting
              requirements.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Our Site is not intended for children under 16 years of age. We do not knowingly
              collect personal data from children under 16. If you are a parent or guardian and
              believe your child has provided us with personal data, please contact us.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the &quot;Last
              updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              11. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your
              data protection rights, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> alistairdmanthony@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
