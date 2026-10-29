"use client";

import * as React from "react";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Hero } from "@/components/hero";
import { DirectorySection, BusinessItem } from "@/components/directory-section";
import { NoticeboardSection, NoticeItem } from "@/components/noticeboard-section";
import { Button } from "@/components/ui/button";
import {
  IsometricBridge,
  IsometricJobPool,
  IsometricInvestment,
  IsometricLegalTrade,
} from "@/components/ui/isometric-icons";
import { Shield, Building, Coffee, MessageCircle, Plus, ArrowRight, BookOpen } from "lucide-react";

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

      {/* Strategic Mission & 4 Isometric Pillars */}
      <section className="py-20 bg-zinc-50/70 dark:bg-zinc-900/40 border-y border-zinc-200/80 dark:border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-50 px-3 py-1 text-xs font-semibold text-[#E30A17] dark:bg-red-950/30 dark:border-red-500/30 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E30A17] animate-pulse" />
                Strategic Mission & Platform Pillars
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                Bridging the Missing Gap for Queensland Turks
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We replace fragmented social groups with an authoritative ecosystem: verified local directory, career job pool, bilateral business expansion, and comprehensive legal & trade compliance.
              </p>
            </div>
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:border-[#E30A17] hover:text-[#E30A17] dark:hover:border-[#E30A17] dark:hover:text-[#E30A17] transition-all shadow-sm group"
              >
                <BookOpen className="h-4 w-4 text-[#E30A17]" />
                <span>Read Full Insights & Playbooks</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 4 Isometric Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <Link
              href="/blog/why-qld-turks-bridging-the-missing-gap"
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-[#E30A17]/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50/80 p-2 dark:bg-red-950/30 group-hover:scale-105 transition-transform">
                  <IsometricBridge size={56} />
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold tracking-wide uppercase text-[#E30A17]">
                    Community Unity
                  </span>
                  <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-[#E30A17] transition-colors dark:text-zinc-100">
                    Bridging Community Fragmentation
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Uniting scattered Turkish diaspora into an institutional, human-moderated network across Brisbane, Gold Coast & QLD.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#E30A17]">
                <span>Read analysis</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 2 */}
            <Link
              href="/blog/creating-a-unified-turkish-job-pool-queensland"
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50/80 p-2 dark:bg-blue-950/30 group-hover:scale-105 transition-transform">
                  <IsometricJobPool size={56} />
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold tracking-wide uppercase text-blue-600 dark:text-blue-400">
                    Talent & Careers
                  </span>
                  <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-blue-600 transition-colors dark:text-zinc-100">
                    Unified Turkish Job Pool
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Connecting bilingual engineers, tradespeople, tech specialists, and students with verified, fair-pay employers.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>View career strategy</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 3 */}
            <Link
              href="/blog/unlocking-business-potential-bilateral-trade-investments"
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50/80 p-2 dark:bg-emerald-950/30 group-hover:scale-105 transition-transform">
                  <IsometricInvestment size={56} />
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold tracking-wide uppercase text-emerald-600 dark:text-emerald-400">
                    Bilateral Trade
                  </span>
                  <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors dark:text-zinc-100">
                    Bilateral Trade & Investments
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Unlocking cross-border capital, construction materials, food distribution, and diaspora investment syndicates.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Explore opportunities</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 4 */}
            <Link
              href="/blog/legal-playbook-starting-business-trade-queensland"
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-violet-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50/80 p-2 dark:bg-violet-950/30 group-hover:scale-105 transition-transform">
                  <IsometricLegalTrade size={56} />
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold tracking-wide uppercase text-violet-600 dark:text-violet-400">
                    Legal & Compliance
                  </span>
                  <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-violet-600 transition-colors dark:text-zinc-100">
                    Trade & Legal Playbook
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Practical legal roadmaps: ABN vs Pty Ltd, QBCC builder licensing, Fair Work standards, and DAFF import biosecurity.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
                <span>Read legal guide</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

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
