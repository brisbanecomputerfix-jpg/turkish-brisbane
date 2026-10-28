import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | QLD Turks",
  description: "Privacy policy complying with the Australian Privacy Principles (APPs) for QLD Turks.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-zinc-400">
          Last updated: October 2026 • Compliant with Privacy Act 1988 (Cth) & Australian Privacy Principles
        </p>

        <div className="mt-8 space-y-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. Overview</h2>
            <p className="mt-1">
              QLD Turks ("we", "our", or "us") is committed to protecting your privacy. This policy outlines how we handle personal information collected through our website (qldturks.com), business directory submissions, and community WhatsApp channels.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. Information We Collect</h2>
            <p className="mt-1">
              We collect information that you knowingly provide, including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Business Directory Submissions:</strong> Business trading name, category, Australian Business Number (ABN), contact phone number, website, and operating suburb.</li>
              <li><strong>Noticeboard Posts:</strong> Title, description, and voluntary contact information (SMS, email, or WhatsApp handle).</li>
              <li><strong>WhatsApp Group Verification:</strong> Basic identity confirmation to prevent automated bots and bad-faith spam actors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">3. How We Use Your Information</h2>
            <p className="mt-1">
              Personal information is used solely to maintain an accurate, spam-free directory and community noticeboard. We do <strong>not</strong> sell, rent, or monetize your contact information with third-party advertisers or data brokers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">4. Data Storage & Security</h2>
            <p className="mt-1">
              Data is stored securely on servers with encrypted SSL/TLS transmissions. You may request the removal or modification of your business or notice at any time by contacting our moderation team.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">5. Contact Us</h2>
            <p className="mt-1">
              For privacy enquiries or data removal requests, please visit our <a href="/contact" className="text-[#E30A17] hover:underline font-semibold">Contact Page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
