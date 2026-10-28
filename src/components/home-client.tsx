"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { DirectorySection, BusinessItem } from "@/components/directory-section";
import { NoticeboardSection, NoticeItem } from "@/components/noticeboard-section";
import { Footer } from "@/components/footer";
import { WhatsAppModal } from "@/components/whatsapp-modal";
import { SubmitBusinessModal } from "@/components/submit-business-modal";
import { SubmitNoticeModal } from "@/components/submit-notice-modal";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Building2,
  Coffee,
  Sun,
  Users,
  MessageCircle,
  Plus,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface HomeClientProps {
  initialBusinesses: BusinessItem[];
  initialNotices: NoticeItem[];
}

export function HomeClient({ initialBusinesses, initialNotices }: HomeClientProps) {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = React.useState(false);
  const [isSubmitBusinessOpen, setIsSubmitBusinessOpen] = React.useState(false);
  const [isSubmitNoticeOpen, setIsSubmitNoticeOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-100 antialiased selection:bg-red-100 selection:text-red-900">
      {/* Navigation Bar */}
      <Navbar
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenSubmitBusiness={() => setIsSubmitBusinessOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
          onOpenSubmitBusiness={() => setIsSubmitBusinessOpen(true)}
        />

        {/* Business Directory Section */}
        <DirectorySection
          initialBusinesses={initialBusinesses}
          onOpenSubmitBusiness={() => setIsSubmitBusinessOpen(true)}
        />

        {/* Noticeboard Section */}
        <NoticeboardSection
          initialNotices={initialNotices}
          onOpenSubmitNotice={() => setIsSubmitNoticeOpen(true)}
        />

        {/* Community Values Bento & About Section */}
        <section id="rules" className="py-20 sm:py-28 relative overflow-hidden bg-white dark:bg-stone-950 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/80 px-3.5 py-1 text-xs font-semibold text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                <span>Topluluk İlkeleri • Community Manifesto</span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
                Built for Turkish-Australians across{" "}
                <span className="bg-gradient-to-r from-red-600 via-rose-600 to-teal-600 bg-clip-text text-transparent">
                  Queensland
                </span>
              </h2>
              <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                qldturks.com is an independent community initiative designed to connect families, skilled migrants, students, and businesses across Greater Brisbane, Logan, Moreton Bay, Gold Coast, and Sunshine Coast.
              </p>
            </div>

            {/* Bento Grid (4 Pillars) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Anti-Bot WhatsApp */}
              <div className="group relative rounded-3xl border border-stone-200/90 bg-stone-50/70 p-6 dark:border-stone-800 dark:bg-stone-900/50 hover:border-teal-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Bot-Free WhatsApp Hub
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Our WhatsApp invitation is guarded by human confirmation, ensuring zero crypto-shills, marketing spam, or scraper bots enter the chat.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <button
                    onClick={() => setIsWhatsAppOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:gap-2 transition-all cursor-pointer"
                  >
                    <span>Request WhatsApp Entry</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: 100% Free Directory */}
              <div className="group relative rounded-3xl border border-stone-200/90 bg-stone-50/70 p-6 dark:border-stone-800 dark:bg-stone-900/50 hover:border-red-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Free Business Listings
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Any bilingual or Turkish-speaking doctor, lawyer, tradesperson, grocer, or tech professional in QLD can list their services without listing fees.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <button
                    onClick={() => setIsSubmitBusinessOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:gap-2 transition-all cursor-pointer"
                  >
                    <span>Submit Free Listing</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 3: Bulk Orders & Imports */}
              <div className="group relative rounded-3xl border border-stone-200/90 bg-stone-50/70 p-6 dark:border-stone-800 dark:bg-stone-900/50 hover:border-teal-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                    <Coffee className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Toplu Sipariş & İthalat
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    High freight costs can be shared through group orders of authentic Turkish coffee, Aegean extra virgin olive oil, and bulk dry pantry staples.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <button
                    onClick={() => setIsSubmitNoticeOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:gap-2 transition-all cursor-pointer"
                  >
                    <span>Start a Bulk Order</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 4: Sunshine State Community */}
              <div className="group relative rounded-3xl border border-stone-200/90 bg-stone-50/70 p-6 dark:border-stone-800 dark:bg-stone-900/50 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Sun className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    Queensland Sunshine Life
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Helping new arrivals settle into Brisbane, navigate local schools, public transport, Medicare, and enjoy community park barbecues together.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <a
                    href="#directory"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:gap-2 transition-all"
                  >
                    <span>Explore Community Hub</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="mt-14 relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 p-8 sm:p-10 text-white shadow-2xl border border-stone-800">
              <div className="absolute -top-12 -right-12 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-teal-300 border border-white/10">
                    <Sparkles className="h-3.5 w-3.5" />
                    Join 800+ Turkish Australians in Queensland
                  </span>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Hazır mısınız? Topluluğumuza Katılın
                  </h3>
                  <p className="mt-2 text-stone-300 text-sm max-w-xl">
                    Get access to the private WhatsApp group or list your business on the official Queensland Turkish portal today.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Button
                    onClick={() => setIsWhatsAppOpen(true)}
                    variant="whatsapp"
                    size="lg"
                    className="gap-2 shadow-lg shadow-[#25D366]/30 font-bold"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Join WhatsApp
                  </Button>

                  <Button
                    onClick={() => setIsSubmitBusinessOpen(true)}
                    variant="turkish"
                    size="lg"
                    className="gap-2 shadow-lg shadow-red-600/30 font-bold"
                  >
                    <Plus className="h-4 w-4" />
                    Submit Business
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      <SubmitBusinessModal
        isOpen={isSubmitBusinessOpen}
        onClose={() => setIsSubmitBusinessOpen(false)}
      />

      <SubmitNoticeModal
        isOpen={isSubmitNoticeOpen}
        onClose={() => setIsSubmitNoticeOpen(false)}
      />
    </div>
  );
}
