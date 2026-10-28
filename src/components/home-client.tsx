"use client";

import * as React from "react";
import { useApp } from "@/context/app-context";
import { Hero } from "@/components/hero";
import { DirectorySection, BusinessItem } from "@/components/directory-section";
import { NoticeboardSection, NoticeItem } from "@/components/noticeboard-section";
import { Button } from "@/components/ui/button";
import { Shield, Building, Coffee, MessageCircle, Plus } from "lucide-react";

interface HomeClientProps {
  initialBusinesses: BusinessItem[];
  initialNotices: NoticeItem[];
}

export function HomeClient({ initialBusinesses, initialNotices }: HomeClientProps) {
  const { setWhatsAppOpen, setSubmitBusinessOpen, setSubmitNoticeOpen } = useApp();

  return (
    <div>
      {/* Minimal Hero */}
      <Hero
        onOpenWhatsApp={() => setWhatsAppOpen(true)}
        onOpenSubmitBusiness={() => setSubmitBusinessOpen(true)}
      />

      {/* Directory Section */}
      <DirectorySection
        initialBusinesses={initialBusinesses}
        onOpenSubmitBusiness={() => setSubmitBusinessOpen(true)}
      />

      {/* Noticeboard Section */}
      <NoticeboardSection
        initialNotices={initialNotices}
        onOpenSubmitNotice={() => setSubmitNoticeOpen(true)}
      />

      {/* Minimalist Community Info / About */}
      <section id="about" className="py-20 bg-white dark:bg-zinc-950 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Built for the Queensland Turkish Community
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We started QLD Turks to bridge the gap between newcomers, long-term residents, students, and businesses. A reliable directory with verified contact points.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Shield className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Protected WhatsApp Hub
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Our official WhatsApp group is guarded by human confirmation to keep conversations spam-free, respectful, and genuine.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Building className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                100% Free Listings
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Turkish-speaking doctors, lawyers, tradespeople, restaurants, and IT specialists can list their services without listing fees.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Coffee className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Bulk Orders & Mutual Aid
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Community-led group orders reduce freight costs on authentic Turkish coffee, Aegean olive oil, and kitchen essentials.
              </p>
            </div>
          </div>

          {/* Quick Call to Action Banner */}
          <div className="mt-16 rounded-2xl bg-zinc-900 p-8 sm:p-10 text-white dark:bg-zinc-900 border border-zinc-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Join the Queensland Turkish Network
                </h3>
                <p className="mt-2 text-sm text-zinc-400 max-w-lg">
                  Get access to the private WhatsApp group or list your business on the directory.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setWhatsAppOpen(true)}
                  variant="turkish"
                  className="gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Join WhatsApp
                </Button>
                <Button
                  onClick={() => setSubmitBusinessOpen(true)}
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
    </div>
  );
}
