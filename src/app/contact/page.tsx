import { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { TurkishLogo } from "@/components/ui/turkish-logo";
import { Mail, Phone, MapPin, Clock, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact QLD Turks | Community Support & Listing Verification",
  description:
    "Get in touch with the QLD Turks volunteer committee for business verification inquiries, community notices, or general support in Brisbane and Queensland.",
  alternates: {
    canonical: "https://qldturks.com/contact",
  },
  openGraph: {
    title: "Contact QLD Turks | Community Support",
    description:
      "Get in touch with our volunteer committee for business directory updates or community inquiries.",
    url: "https://qldturks.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact QLD Turks",
    description: "Official contact channels for Queensland Turkish Community Directory and volunteer steering board.",
    url: "https://qldturks.com/contact",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-10">
            <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] sm:text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Mail className="h-3.5 w-3.5 text-[#E30A17] shrink-0" />
              <span>We're Here to Help</span>
            </div>
            <h1 className="mt-4 text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 break-words">
              Contact & Community Support
            </h1>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Have a question about the directory, need help updating a business profile, or want to connect your local student group? Send us a message below.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-zinc-500 mb-6">
                  Messages are reviewed by volunteer moderators across Brisbane.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Right Column: Direct Info & Emergency Hotline */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#E30A17]" />
                  <span>Response Times</span>
                </h3>
                <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 min-w-28">Directory Listings:</span>
                    <span>Reviewed within 24–48 hours after ABN verification.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 min-w-28">WhatsApp Access:</span>
                    <span>Verified on an ongoing daily basis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 min-w-28">Noticeboard:</span>
                    <span>Posts publish instantly with post-moderation.</span>
                  </li>
                </ul>
              </div>

              {/* Emergency Numbers Card */}
              <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/40 dark:bg-red-950/20">
                <h3 className="text-sm font-bold text-red-950 dark:text-red-200 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-[#E30A17]" />
                  <span>Immediate Assistance in QLD</span>
                </h3>
                <p className="text-xs text-red-900/80 dark:text-red-300/80 leading-relaxed mb-4">
                  QLD Turks is not an emergency service. For urgent medical, police, or consular emergencies, contact:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-red-200/60 dark:border-red-900/40">
                    <span className="font-medium">Police / Ambulance / Fire:</span>
                    <strong className="text-sm font-mono text-red-700 dark:text-red-400">000</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-red-200/60 dark:border-red-900/40">
                    <span className="font-medium">Free Turkish Translator (TIS):</span>
                    <strong className="text-sm font-mono text-zinc-900 dark:text-white">131 450</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-red-200/60 dark:border-red-900/40">
                    <span className="font-medium">QLD Health Advice Line:</span>
                    <strong className="text-sm font-mono text-zinc-900 dark:text-white">13 43 25 84</strong>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="font-medium">T.C. Sidney Başkonsolosluğu:</span>
                    <strong className="text-xs font-mono text-zinc-900 dark:text-white">+61 2 9302 4600</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

