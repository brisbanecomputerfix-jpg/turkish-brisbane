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

      {/* Hero Section */}
      <main className="flex-1">
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

        {/* Community Rules & FAQ Accordion Section */}
        <section id="rules" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-8 dark:border-stone-800 dark:bg-stone-900/40">
            <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
              About the Brisbane Turkish Community Hub
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              turkishbrisbane.com is built to support the thriving Turkish-Australian diaspora living in Greater Brisbane (Brisbane City, Moreton Bay, Logan, Ipswich, Redland) and neighbouring South East Queensland regions.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200/60 dark:border-stone-700">
                <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                  Safe & Spam-Free
                </h4>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  WhatsApp invitation links are shielded behind automated bot protection to preserve a genuine, welcoming community for real families and professionals.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200/60 dark:border-stone-700">
                <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                  Free Directory Listings
                </h4>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Any verified Turkish-speaking business, specialist, or service provider in Queensland can submit their business to be listed at zero charge.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200/60 dark:border-stone-700">
                <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                  Mutual Aid & Bulk Orders
                </h4>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Save on shipping costs for authentic ingredients and staples through our collective community bulk order board.
                </p>
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

