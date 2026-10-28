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
import { Shield, Building, Coffee, MessageCircle, Plus } from "lucide-react";

interface HomeClientProps {
  initialBusinesses: BusinessItem[];
  initialNotices: NoticeItem[];
}

export function HomeClient({ initialBusinesses, initialNotices }: HomeClientProps) {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = React.useState(false);
  const [isSubmitBusinessOpen, setIsSubmitBusinessOpen] = React.useState(false);
  const [isSubmitNoticeOpen, setIsSubmitNoticeOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased selection:bg-red-50 selection:text-[#E30A17]">
      {/* Navigation */}
      <Navbar
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenSubmitBusiness={() => setIsSubmitBusinessOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Minimal Hero */}
        <Hero
          onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
          onOpenSubmitBusiness={() => setIsSubmitBusinessOpen(true)}
        />

        {/* Directory Section */}
        <DirectorySection
          initialBusinesses={initialBusinesses}
          onOpenSubmitBusiness={() => setIsSubmitBusinessOpen(true)}
        />

        {/* Noticeboard Section */}
        <NoticeboardSection
          initialNotices={initialNotices}
          onOpenSubmitNotice={() => setIsSubmitNoticeOpen(true)}
        />

        {/* Minimalist Community Info / About */}
        <section id="about" className="py-20 bg-white dark:bg-zinc-950 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Built for the Queensland Turkish Community
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                qldturks.com is an independent community project created to connect Turkish-Australians, migrants, students, and businesses across Greater Brisbane, Gold Coast, Sunshine Coast, and regional Queensland.
              </p>
            </div>

            {/* 3 Clean Pillars */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Protected WhatsApp Hub
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Our official WhatsApp group is guarded by human confirmation to keep conversations spam-free, respectful, and genuine.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                  <Building className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  100% Free Listings
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Turkish-speaking doctors, lawyers, tradespeople, restaurants, and IT specialists can list their services without listing fees.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                  <Coffee className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Bulk Orders & Mutual Aid
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Community-led group orders reduce freight costs on authentic Turkish coffee, Aegean olive oil, and kitchen essentials.
                </p>
              </div>
            </div>

            {/* Clean Minimalist CTA Banner */}
            <div className="mt-16 rounded-3xl bg-zinc-900 p-8 sm:p-10 text-white dark:bg-zinc-900 dark:border dark:border-zinc-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Join the Queensland Turkish Network
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-400 max-w-xl">
                    Get access to the private WhatsApp group or list your business on the directory.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Button
                    onClick={() => setIsWhatsAppOpen(true)}
                    variant="turkish"
                    className="gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Join WhatsApp
                  </Button>
                  <Button
                    onClick={() => setIsSubmitBusinessOpen(true)}
                    variant="outline"
                    className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                    List Business
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
