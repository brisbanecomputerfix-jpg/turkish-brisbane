import { Metadata } from "next";
import Link from "next/link";
import { TurkishLogo } from "@/components/ui/turkish-logo";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  FileCheck,
  Scale,
  Stethoscope,
  HeartHandshake,
  MessageCircle,
  HelpCircle,
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About QLD Turks | Community Mission, Governance & E-E-A-T Standards",
  description:
    "Learn about QLD Turks — an independent, volunteer-moderated community platform connecting Turkish-Australians across Brisbane and Queensland with verified services and mutual aid.",
  alternates: {
    canonical: "https://qldturks.com/about",
  },
  openGraph: {
    title: "About QLD Turks | Community Mission & Trust Standards",
    description:
      "Learn about our verification guidelines, moderation standards, and independent volunteer committee.",
    url: "https://qldturks.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About QLD Turks Community & Verification Standards",
    description: "Independent community initiative and verified business directory for Turkish-Australians across Queensland.",
    url: "https://qldturks.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "QLD Turks",
      url: "https://qldturks.com",
      logo: "https://qldturks.com/icon.svg",
      sameAs: ["https://qldturks.com"],
      areaServed: {
        "@type": "State",
        name: "Queensland",
      },
      knowsAbout: [
        "Turkish community in Queensland",
        "Turkish doctors in Brisbane",
        "Turkish legal and migration support",
        "Halal Turkish dining and grocery in Brisbane",
      ],
    },
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
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <TurkishLogo size={16} className="rounded-[4px]" />
              <span>Independent & Volunteer-Led</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15]">
              Connecting and empowering the Turkish community across Queensland.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QLD Turks was founded by local professionals, students, and families in Greater Brisbane to solve a common challenge: finding reliable, verified, Turkish-speaking services without fear of scams or unaccredited providers.
            </p>
          </div>

          {/* Hero Image / Editorial Banner */}
          <div className="mt-12 relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1577971132992-0b8981e59275?auto=format&fit=crop&w=1400&q=80"
              alt="Brisbane River and Story Bridge skyline"
              className="h-72 sm:h-96 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                Community Heritage & Future
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold">
                From South Bank to the Gold Coast
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-200 leading-relaxed">
                Over 3,500 Turkish-Australians call Sunshine State home. We are doctors, students, engineers, chefs, builders, and neighbours building bridges between Turkish heritage and Australian life.
              </p>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="mt-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center">
              Our Guiding Principles
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E30A17] dark:bg-red-950/50">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  100% Non-Commercial
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We charge zero listing fees to businesses and zero subscription fees to users. There are no sponsored rankings or paid boosts.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Rigorous Verification
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Every listed medical doctor, legal practitioner, and trade contractor is cross-referenced with Australian statutory registries before publication.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Spam-Shielded Network
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our community WhatsApp hub requires two-step screening, eliminating crypto scammers, commercial spam, and disrespectful conduct.
                </p>
              </div>
            </div>
          </div>

          {/* Verification Protocol (Google E-E-A-T Framework) */}
          <section id="verification" className="mt-20 scroll-mt-20">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-8 sm:p-12 dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E30A17]">
                  Authoritativeness & Trust
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                  How We Verify Directory Listings
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  To adhere to Google's E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) standards and safeguard vulnerable community members, our review board applies strict criteria:
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                  <Stethoscope className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Medical & Dental Practitioners
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                      Must be actively registered with the <strong>Australian Health Practitioner Regulation Agency (AHPRA)</strong> and practice in accredited Queensland clinics.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                  <Scale className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Lawyers & Migration Agents
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                      Migration agents must hold active <strong>OMARA (Office of the Migration Agents Registration Authority)</strong> registration. Solicitors must hold Queensland Law Society practicing certificates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                  <FileCheck className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Trades & Builders
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                      Electricians, plumbers, and builders must hold active <strong>Queensland Building and Construction Commission (QBCC)</strong> licenses with appropriate public liability insurance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                  <Award className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Food, Dining & Grocers
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                      Must hold valid Brisbane City Council or local regional council Food Safety Licenses. Halal meat providers are verified for authentic certification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs text-zinc-500">
                  Notice an incorrect listing or have a community report?
                </span>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Mail className="h-3.5 w-3.5 text-[#E30A17]" />
                    <span>Report Listing or Inaccuracy</span>
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Volunteer Steering Committee Note */}
          <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Community Governance & Editorial Independence
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              QLD Turks operates as a mutual-benefit initiative maintained by volunteers from academia (UQ & QUT postgraduates), medical practitioners, and community elders. We do not accept advertising sponsorships from political entities or unvetted private recruiters.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/directory">
                <Button variant="default" size="sm" className="gap-2 text-xs">
                  <span>Explore Directory</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="/guide">
                <Button variant="outline" size="sm" className="gap-2 text-xs">
                  <span>Living in QLD Guide</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
