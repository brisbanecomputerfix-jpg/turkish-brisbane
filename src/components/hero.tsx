"use client";

import * as React from "react";
import { Search, ArrowRight, MessageCircle, Plus, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenWhatsApp: () => void;
  onOpenSubmitBusiness: () => void;
}

export function Hero({ onOpenWhatsApp, onOpenSubmitBusiness }: HeroProps) {
  return (
    <section className="relative pt-16 pb-14 sm:pt-24 sm:pb-20 border-b border-zinc-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E30A17]" />
          <span>Queensland Turkish Directory & Community Portal</span>
        </div>

        {/* Clear, confident headline */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white leading-[1.12]">
          Find trusted Turkish businesses & services in Queensland.
        </h1>

        {/* Informative, readable subtitle */}
        <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Connecting Turkish-speaking doctors, lawyers, grocers, trades, and professionals across Greater Brisbane, Gold Coast, and Sunshine Coast.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#directory">
            <Button variant="default" size="lg" className="w-full sm:w-auto gap-2">
              <Search className="h-4 w-4" />
              <span>Explore Directory</span>
            </Button>
          </a>

          <Button
            onClick={onOpenWhatsApp}
            variant="turkish"
            size="lg"
            className="w-full sm:w-auto gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Join WhatsApp Hub</span>
          </Button>

          <Button
            onClick={onOpenSubmitBusiness}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>List Business (Free)</span>
          </Button>
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-[#E30A17]" />
            <span>Verified Local Providers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#E30A17]" />
            <span>Spam-Shielded WhatsApp</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-[#E30A17]" />
            <span>100% Free & Independent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
