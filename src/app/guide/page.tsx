import { Metadata } from "next";
import Link from "next/link";
import { TurkishLogo } from "@/components/ui/turkish-logo";
import { Button } from "@/components/ui/button";
import {
  Compass,
  FileText,
  Phone,
  HeartPulse,
  Globe,
  GraduationCap,
  UtensilsCrossed,
  Landmark,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  Car,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Living in Queensland: Turkish Expat & Student Guide | Visas, Medicare, Food & Consular",
  description:
    "Comprehensive guide for Turkish speakers living in Brisbane, Gold Coast, and Queensland. Information on Turkish Consular visits, NAATI translation, Medicare, driver licence conversion, halal groceries, and student networks.",
  keywords: [
    "Living in Queensland Turkish guide",
    "Turkish consulate Brisbane",
    "NAATI Turkish translator Brisbane",
    "Turkish driver licence Queensland",
    "Turkish grocery Brisbane",
    "UQ Turkish students",
  ],
  alternates: {
    canonical: "https://qldturks.com/guide",
  },
  openGraph: {
    title: "Living in Queensland: Turkish Expat & Student Guide",
    description:
      "Essential guide for Turkish expats and students in Queensland: Medicare, consular services, driver licenses, and community spots.",
    url: "https://qldturks.com/guide",
    type: "article",
  },
};

export default function GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Living in Queensland: The Essential Guide for Turkish Expats and Students",
    description: "Detailed handbook on settling in Brisbane and Queensland for Turkish speakers: healthcare, consular, legal, groceries, and education.",
    author: {
      "@type": "Organization",
      name: "QLD Turks Editorial Board",
      url: "https://qldturks.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "QLD Turks",
      logo: "https://qldturks.com/icon.svg",
    },
    datePublished: "2026-01-15T00:00:00Z",
    dateModified: "2026-10-28T00:00:00Z",
    mainEntityOfPage: "https://qldturks.com/guide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Compass className="h-4 w-4 text-[#E30A17]" />
              <span>Official Community Handbook • Updated for 2026</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15]">
              Living in Queensland: The Essential Turkish Expat & Student Guide
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Moving to or settling in Greater Brisbane, the Gold Coast, or regional Queensland? This community-crafted resource covers consular missions, Medicare rights, driver license conversions, authentic groceries, and student support.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span>Published by <strong>QLD Turks Editorial Board</strong></span>
              <span>•</span>
              <span>Peer-reviewed by bilingual solicitors & health advisors</span>
            </div>
          </div>

          {/* Quick Table of Contents */}
          <div className="my-8 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Guide Chapters
            </h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
              <li>
                <a href="#consular" className="text-zinc-700 hover:text-[#E30A17] dark:text-zinc-300">
                  1. Turkish Consular Services & Passports →
                </a>
              </li>
              <li>
                <a href="#healthcare" className="text-zinc-700 hover:text-[#E30A17] dark:text-zinc-300">
                  2. Healthcare, Medicare & TIS Interpreters →
                </a>
              </li>
              <li>
                <a href="#driving" className="text-zinc-700 hover:text-[#E30A17] dark:text-zinc-300">
                  3. Driver Licence Conversion & NAATI →
                </a>
              </li>
              <li>
                <a href="#groceries" className="text-zinc-700 hover:text-[#E30A17] dark:text-zinc-300">
                  4. Authentic Groceries & Halal Dining →
                </a>
              </li>
              <li>
                <a href="#students" className="text-zinc-700 hover:text-[#E30A17] dark:text-zinc-300">
                  5. Student Life (UQ, QUT, Griffith) →
                </a>
              </li>
              <li>
                <a href="#emergency" className="text-zinc-700 hover:text-[#E30A17] dark:text-zinc-300">
                  6. Emergency & Queensland Contacts →
                </a>
              </li>
            </ul>
          </div>

          {/* Chapter 1: Consular Services */}
          <section id="consular" className="mt-12 scroll-mt-20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#E30A17] dark:bg-red-950/60 font-bold text-sm">
                1
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Turkish Consular Services & Passport Renewals
              </h2>
            </div>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Queensland falls under the jurisdiction of the <strong>Turkish Consulate-General in Sydney</strong> (<em>T.C. Sidney Başkonsolosluğu</em>). For Canberra residents or Australian Capital Territory, the Turkish Embassy in Canberra handles matters.
            </p>

            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4.5 dark:border-zinc-800 dark:bg-zinc-900 space-y-2 text-xs">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                Key Consular Points to Note:
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
                <li>
                  <strong>Appointments:</strong> All in-person consular transactions (passport renewal, power of attorney / <em>vekaletname</em>, citizenship, military service / <em>askerlik</em>) must be booked via <a href="https://www.konsolosluk.gov.tr" target="_blank" rel="noopener noreferrer" className="text-[#E30A17] hover:underline font-semibold">www.konsolosluk.gov.tr</a>.
                </li>
                <li>
                  <strong>Mobile Consular Missions (Gezici Konsolosluk):</strong> Once or twice a year, the Sydney Consulate-General deploys consular officers to Brisbane to process fingerprinting and notary services locally. Announcements are shared directly in the <Link href="/#whatsapp" className="text-[#E30A17] hover:underline">QLD Turks WhatsApp Hub</Link>.
                </li>
                <li>
                  <strong>e-Devlet Passwords:</strong> Can be issued in person at the Consulate or through mobile consular days with valid Turkish identification (Nüfus Cüzdanı / T.C. Kimlik Kartı).
                </li>
              </ul>
            </div>
          </section>

          {/* Chapter 2: Healthcare & Medicare */}
          <section id="healthcare" className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#E30A17] dark:bg-red-950/60 font-bold text-sm">
                2
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Healthcare, Medicare & Free Language Interpreting
              </h2>
            </div>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Australian healthcare is world-class, but language barriers can cause anxiety during medical appointments.
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-4.5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  <HeartPulse className="h-4 w-4 text-[#E30A17]" />
                  <span>Free TIS National Interpreters</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Call <strong>131 450</strong> (24/7). You have the right to request a free Turkish medical interpreter at any Queensland public hospital or Medicare-subsidised GP appointment.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4.5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  <Phone className="h-4 w-4 text-[#E30A17]" />
                  <span>13 HEALTH (13 43 25 84)</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Confidential registered nurse advice line operated by Queensland Health. Available 24 hours a day for triage before heading to the Emergency Department.
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                Looking for bilingual doctors in Sunnybank, Chermside, or South Brisbane?
              </span>
              <Link href="/directory?category=Medical">
                <Button variant="outline" size="sm" className="text-xs">
                  View Turkish GPs
                </Button>
              </Link>
            </div>
          </section>

          {/* Chapter 3: Driver Licence Conversion */}
          <section id="driving" className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#E30A17] dark:bg-red-950/60 font-bold text-sm">
                3
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Driver Licence Conversion & NAATI Translations
              </h2>
            </div>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you hold a temporary visa (student visa 500, graduate visa 485, working holiday, or employer-sponsored 482), you may drive on your current Turkish driver licence in Queensland provided you carry an <strong>official NAATI-accredited English translation</strong>.
            </p>

            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4.5 dark:border-zinc-800 dark:bg-zinc-900 space-y-2 text-xs">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Car className="h-4 w-4 text-[#E30A17]" />
                <span>Permanent Residents (PR) & Citizens:</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Once granted Permanent Residency, you must convert to a Queensland driver licence within <strong>3 months</strong> of residing in Queensland. Turkey is classified by the Department of Transport and Main Roads (TMR) as a non-recognized country, meaning applicants must pass both the Queensland road rules written knowledge test (PrepL) and a practical driving test.
              </p>
            </div>
          </section>

          {/* Chapter 4: Authentic Food & Groceries */}
          <section id="groceries" className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#E30A17] dark:bg-red-950/60 font-bold text-sm">
                4
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Authentic Turkish Food, Groceries & Tea in Brisbane
              </h2>
            </div>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Craving fresh <em>simit</em>, woodfired <em>lahmacun</em>, Turkish tea (<em>Çaykur</em>), or aged Kasseri cheese? Greater Brisbane has vibrant options:
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <UtensilsCrossed className="h-4 w-4 text-[#E30A17] mb-2" />
                <h3 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">South Bank & West End</h3>
                <p className="mt-1 text-[11px] text-zinc-500">Fine dining Turkish mezes, slow roasted lamb, charcoal kebabs, and baklava.</p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <UtensilsCrossed className="h-4 w-4 text-[#E30A17] mb-2" />
                <h3 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Moorooka & Woodridge</h3>
                <p className="mt-1 text-[11px] text-zinc-500">Halal butchers with sujuk, pastirma, fresh lamb cuts, and bulk pantry goods.</p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <UtensilsCrossed className="h-4 w-4 text-[#E30A17] mb-2" />
                <h3 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Community Bulk Orders</h3>
                <p className="mt-1 text-[11px] text-zinc-500">Pallet imports of fresh Mehmet Efendi coffee and cold-pressed Aegean olive oil.</p>
              </div>
            </div>
          </section>

          {/* Chapter 5: Student Life */}
          <section id="students" className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#E30A17] dark:bg-red-950/60 font-bold text-sm">
                5
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Turkish Students in Queensland (UQ, QUT, Griffith)
              </h2>
            </div>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Brisbane hosts hundreds of Turkish international students pursuing undergraduate and postgraduate degrees. Student accommodation near St Lucia, South Bank, and Kelvin Grove can be competitive; our <Link href="/noticeboard" className="text-[#E30A17] hover:underline font-semibold">Community Noticeboard</Link> regularly features rooms shared with respectful Turkish speakers.
            </p>
          </section>

          {/* Chapter 6: Emergency Contacts */}
          <section id="emergency" className="mt-14 scroll-mt-20">
            <div className="rounded-3xl border border-red-200 bg-red-50/50 p-6 sm:p-8 dark:border-red-900/40 dark:bg-red-950/20">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#E30A17]" />
                <span>Essential Queensland Emergency Numbers</span>
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-bold block">LIFE-THREATENING</span>
                  <strong className="text-base text-red-600 block mt-0.5">000</strong>
                  <span className="text-zinc-500 text-[11px]">Police / Ambulance / Fire</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-bold block">NON-EMERGENCY POLICE</span>
                  <strong className="text-base text-zinc-900 dark:text-white block mt-0.5">131 444</strong>
                  <span className="text-zinc-500 text-[11px]">Policelink QLD</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-bold block">FREE TRANSLATOR</span>
                  <strong className="text-base text-zinc-900 dark:text-white block mt-0.5">131 450</strong>
                  <span className="text-zinc-500 text-[11px]">TIS National (24/7)</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-bold block">HEALTH ADVICE</span>
                  <strong className="text-base text-zinc-900 dark:text-white block mt-0.5">13 43 25 84</strong>
                  <span className="text-zinc-500 text-[11px]">13 HEALTH (Registered Nurse)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="mt-16 text-center border-t border-zinc-200 dark:border-zinc-800 pt-10">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Have questions or want to connect with other Turkish residents?
            </h3>
            <p className="mt-2 text-xs text-zinc-500 max-w-md mx-auto">
              Join our active community WhatsApp group for real-time advice, second-hand furniture exchanges, and weekend gatherings.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Link href="/directory">
                <Button variant="default" size="sm">
                  Search Directory
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
