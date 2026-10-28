import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Community Guidelines | QLD Turks",
  description: "Terms of service, community code of conduct, and moderation guidelines for QLD Turks.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Terms of Service & Community Guidelines
        </h1>
        <p className="mt-2 text-xs text-zinc-400">
          Last updated: October 2026 • Community Governance Standards
        </p>

        <div className="mt-8 space-y-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. Acceptance of Terms</h2>
            <p className="mt-1">
              By accessing qldturks.com, submitting a business listing, posting on the noticeboard, or joining our community WhatsApp channels, you agree to comply with these terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. Community Code of Conduct</h2>
            <p className="mt-1">
              QLD Turks is a safe, family-friendly, and respectful community environment. We enforce zero tolerance for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Harassment, discrimination, or abusive behaviour.</li>
              <li>Unsolicited commercial spam, multi-level marketing (MLM), or cryptocurrency schemes.</li>
              <li>Misrepresenting medical, legal, or professional credentials.</li>
              <li>Posting counterfeit or illegal goods.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">3. Moderation & Listing Removal</h2>
            <p className="mt-1">
              Our volunteer moderation board reserves the right to review, reject, or unpublish any business listing or noticeboard entry that violates Australian legal regulations, fails licensing checks, or generates verified community complaints.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">4. Disclaimer of Liability</h2>
            <p className="mt-1">
              QLD Turks operates as an informational directory and bulletin board. While we verify registry credentials, users are encouraged to perform their own independent due diligence before hiring contractors or engaging professional services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
