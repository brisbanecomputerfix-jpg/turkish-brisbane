"use client";

import * as React from "react";
import { MessageCircle, Search, Shield, Building2, Users, Coffee, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenWhatsApp: () => void;
  onOpenSubmitBusiness: () => void;
}

export function Hero({ onOpenWhatsApp, onOpenSubmitBusiness }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50/50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 py-16 sm:py-24 border-b border-stone-200/70 dark:border-stone-800">
      {/* Decorative Turkish Red & Mediterranean Turquoise Auras */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/70 px-4 py-1.5 text-xs font-semibold text-teal-900 shadow-sm backdrop-blur-sm dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-300 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-red-600 font-bold">🇹🇷</span>
          <span>Queensland Türk Topluluğu & Resmi İş Rehberi</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          The Premier Network for the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-teal-600">
            Turkish Community
          </span>{" "}
          in Queensland
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Connecting Turkish-speaking families, expats, students, and professionals with trusted local doctors, solicitors, certified trades, authentic dining, and collective bulk orders across Greater Brisbane.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            variant="whatsapp"
            size="lg"
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto text-base gap-2.5 px-7 py-3.5 shadow-emerald-600/25 ring-2 ring-emerald-500/20 hover:scale-[1.02] transition-transform"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Join WhatsApp Community</span>
          </Button>

          <a
            href="#directory"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white/90 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-teal-900 shadow-sm hover:bg-teal-50/80 hover:border-teal-300 dark:border-teal-800 dark:bg-stone-900 dark:text-teal-200 dark:hover:bg-teal-950/60 transition-all"
          >
            <Search className="h-4 w-4 text-teal-600" />
            <span>Search Directory</span>
          </a>

          <Button
            variant="turkish"
            size="lg"
            onClick={onOpenSubmitBusiness}
            className="w-full sm:w-auto text-sm gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>+ List Your Business</span>
          </Button>
        </div>

        {/* 4 Bento Feature Badges */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 dark:border-stone-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          {/* Bento Card 1 */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/70 border border-stone-200/70 dark:border-stone-800 shadow-sm backdrop-blur-sm hover:border-teal-200 transition-colors">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 ring-1 ring-teal-200/60 dark:ring-teal-800/50">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Bot-Protected Gate</div>
              <div className="text-[11px] text-stone-500">Verified WhatsApp link</div>
            </div>
          </div>

          {/* Bento Card 2 */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/70 border border-stone-200/70 dark:border-stone-800 shadow-sm backdrop-blur-sm hover:border-red-200 transition-colors">
            <div className="p-2.5 rounded-xl bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 ring-1 ring-red-200/60 dark:ring-red-800/50">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Local Directory</div>
              <div className="text-[11px] text-stone-500">Doctors, Law & Trades</div>
            </div>
          </div>

          {/* Bento Card 3 */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/70 border border-stone-200/70 dark:border-stone-800 shadow-sm backdrop-blur-sm hover:border-teal-200 transition-colors">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 ring-1 ring-teal-200/60 dark:ring-teal-800/50">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Bulk Orders</div>
              <div className="text-[11px] text-stone-500">Turkish coffee & imports</div>
            </div>
          </div>

          {/* Bento Card 4 */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/70 border border-stone-200/70 dark:border-stone-800 shadow-sm backdrop-blur-sm hover:border-amber-200 transition-colors">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 ring-1 ring-amber-200/60 dark:ring-amber-800/50">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Queensland Wide</div>
              <div className="text-[11px] text-stone-500">Brisbane & Gold Coast</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
