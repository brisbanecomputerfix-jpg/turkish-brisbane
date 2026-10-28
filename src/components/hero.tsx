"use client";

import * as React from "react";
import { MessageCircle, Search, Shield, Building2, Users, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenWhatsApp: () => void;
  onOpenSubmitBusiness: () => void;
}

export function Hero({ onOpenWhatsApp, onOpenSubmitBusiness }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/50 via-white to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 py-16 sm:py-24 border-b border-stone-200/70 dark:border-stone-800">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />
      <div className="absolute -top-40 right-1/2 translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-100/70 px-4 py-1.5 text-xs font-semibold text-red-800 shadow-sm dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          <span>Brisbane Türk Topluluğu & İş Rehberi</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          Your Gateway to the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-rose-600">
            Turkish Community
          </span>{" "}
          in Brisbane
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Connecting Turkish-speaking families, expats, and students with trusted local doctors, lawyers, trades, authentic foods, and bulk community orders across Queensland.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            variant="whatsapp"
            size="lg"
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto text-base gap-2 px-7 py-3.5 shadow-emerald-700/20"
          >
            <MessageCircle className="h-5 w-5" />
            Join the WhatsApp Community
          </Button>

          <a
            href="#directory"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 shadow-sm hover:bg-stone-50 hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            <Search className="h-4 w-4 text-red-600" />
            Search Business Directory
          </a>

          <Button
            variant="ghost"
            size="lg"
            onClick={onOpenSubmitBusiness}
            className="w-full sm:w-auto text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            + List Your Business
          </Button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 dark:border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800">
            <div className="p-2 rounded-lg bg-red-100/70 text-red-700 dark:bg-red-950 dark:text-red-300">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Bot-Protected</div>
              <div className="text-[11px] text-stone-500">Verified WhatsApp</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800">
            <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Local Directory</div>
              <div className="text-[11px] text-stone-500">Doctors, Law, Trades</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800">
            <div className="p-2 rounded-lg bg-amber-100/70 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Active Community</div>
              <div className="text-[11px] text-stone-500">Brisbane & Gold Coast</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800">
            <div className="p-2 rounded-lg bg-sky-100/70 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Noticeboard</div>
              <div className="text-[11px] text-stone-500">Bulk Orders & Leads</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
