import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Valentine's Gift Finder",
  description: "Terms of Service for Valentine's Gift Finder - rules and guidelines for using our website.",
};

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <div className="prose prose-burgundy max-w-none space-y-6 text-[var(--burgundy)]">
          <p className="text-sm text-[var(--burgundy)]/70">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using Valentine&apos;s Gift Finder (&quot;the Site&quot;), you agree to be bound
              by these Terms of Service. If you disagree with any part of these terms, you may
              not access the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              2. Description of Service
            </h2>
            <p>
              Valentine&apos;s Gift Finder is a free gift recommendation service that helps users
              discover Valentine&apos;s Day gifts. We provide:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>A quiz to determine gift preferences</li>
              <li>Curated gift recommendations</li>
              <li>Links to third-party retailers where gifts can be purchased</li>
            </ul>
            <p className="mt-2">
              We do not sell products directly. All purchases are made through third-party
              retailers, and their terms and conditions apply to those transactions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              3. Affiliate Disclosure
            </h2>
            <p>
              This Site contains affiliate links. When you click on these links and make a
              purchase, we may receive a commission at no additional cost to you. This helps
              support our Site and allows us to continue providing free gift recommendations.
            </p>
            <p className="mt-2">
              Our affiliate partners include but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Amazon Associates</li>
              <li>Awin (Etsy)</li>
              <li>Impact.com (Virgin Experience Days)</li>
            </ul>
            <p className="mt-2">
              Our recommendations are based on what we believe will be helpful to our users.
              Affiliate relationships do not influence the products we recommend.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              4. Third-Party Websites
            </h2>
            <p>
              Our Site contains links to third-party websites and services. We are not
              responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The content, accuracy, or opinions expressed on third-party sites</li>
              <li>The privacy practices of third-party sites</li>
              <li>Products or services offered by third parties</li>
              <li>Any transactions you conduct with third parties</li>
            </ul>
            <p className="mt-2">
              We encourage you to review the terms and privacy policies of any third-party
              sites you visit.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              5. Intellectual Property
            </h2>
            <p>
              The Site and its original content, features, and functionality are owned by
              Valentine&apos;s Gift Finder and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>
            <p className="mt-2">
              Product images and descriptions may be provided by third-party retailers and
              are subject to their respective copyrights and terms of use.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              6. User Conduct
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the Site for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to any part of the Site</li>
              <li>Interfere with or disrupt the Site or servers</li>
              <li>Use automated systems to access the Site without permission</li>
              <li>Collect user information without consent</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              7. Disclaimer of Warranties
            </h2>
            <p>
              The Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no
              warranties, expressed or implied, regarding:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The accuracy or completeness of content</li>
              <li>The availability or reliability of the Site</li>
              <li>The quality, safety, or legality of products linked to</li>
              <li>The suitability of any gift recommendation</li>
            </ul>
            <p className="mt-2">
              Gift recommendations are suggestions only. We cannot guarantee that any
              recipient will like any particular gift.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Valentine&apos;s Gift Finder shall not be
              liable for any indirect, incidental, special, consequential, or punitive
              damages arising from:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your use or inability to use the Site</li>
              <li>Any purchases made through linked third-party sites</li>
              <li>Unauthorised access to your data</li>
              <li>Any errors or omissions in content</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              9. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Valentine&apos;s Gift Finder and its
              operators from any claims, damages, or expenses arising from your use of the
              Site or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              10. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              England and Wales, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be
              effective immediately upon posting to the Site. Your continued use of the
              Site after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">
              12. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> hello@valentinesgiftfinder.co.uk
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
