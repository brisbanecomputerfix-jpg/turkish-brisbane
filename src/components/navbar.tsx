"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, PlusCircle, Building2, BellRing, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenWhatsApp: () => void;
  onOpenSubmitBusiness: () => void;
}

export function Navbar({ onOpenWhatsApp, onOpenSubmitBusiness }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/70 bg-white/80 backdrop-blur-xl dark:border-stone-800 dark:bg-stone-950/80 transition-all">
      {/* Top micro-accent line: Turkish Red to Turquoise */}
      <div className="h-[2px] w-full bg-gradient-to-r from-red-600 via-rose-500 to-teal-500" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group select-none">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-bold shadow-md shadow-red-600/25 ring-1 ring-red-500/30 group-hover:scale-105 transition-transform duration-200">
            {/* Turkish Crescent & Star SVG */}
            <svg
              className="h-6 w-6 text-white drop-shadow-sm"
              viewBox="0 0 100 100"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="48" cy="50" r="30" />
              <circle cx="56" cy="50" r="24" fill="#E30A17" />
              <polygon points="76,40 68,46 72,55 63,51 57,59 58,49 50,44 60,42 61,32 67,39" />
            </svg>
            {/* Turquoise jewel dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-teal-400 ring-2 ring-white dark:ring-stone-950" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-stone-900 dark:text-white leading-none">
                QLD Turks
              </span>
              <span className="rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-bold text-teal-700 ring-1 ring-teal-200/80 dark:bg-teal-950/60 dark:text-teal-300 dark:ring-teal-800">
                qldturks.com
              </span>
            </div>
            <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
              Brisbane & Queensland Community
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#directory"
            className="flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-red-600 dark:text-stone-300 dark:hover:text-teal-400 transition-colors"
          >
            <Building2 className="h-4 w-4 text-teal-600" />
            <span>Business Directory</span>
          </a>
          <a
            href="#noticeboard"
            className="flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-red-600 dark:text-stone-300 dark:hover:text-teal-400 transition-colors"
          >
            <BellRing className="h-4 w-4 text-red-600" />
            <span>Noticeboard & Bulk Orders</span>
          </a>
          <a
            href="#rules"
            className="flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-red-600 dark:text-stone-300 dark:hover:text-teal-400 transition-colors"
          >
            <ShieldCheck className="h-4 w-4 text-stone-400" />
            <span>Community Rules</span>
          </a>
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSubmitBusiness}
            className="gap-1.5 border-teal-200 text-teal-800 hover:bg-teal-50/70 hover:border-teal-300 dark:border-teal-800 dark:text-teal-300 dark:hover:bg-teal-950/50"
          >
            <PlusCircle className="h-4 w-4 text-teal-600" />
            <span>List Business</span>
          </Button>

          <Button
            variant="whatsapp"
            size="sm"
            onClick={onOpenWhatsApp}
            className="gap-2 shadow-emerald-600/25 ring-1 ring-emerald-400/40"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Join WhatsApp</span>
          </Button>
        </div>

        {/* Mobile menu hamburger button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="whatsapp"
            size="sm"
            onClick={onOpenWhatsApp}
            className="gap-1.5 text-xs px-2.5 h-8"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </Button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white/95 px-4 pt-3 pb-5 dark:border-stone-800 dark:bg-stone-950/95 backdrop-blur-xl">
          <nav className="flex flex-col space-y-3">
            <a
              href="#directory"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 py-1.5"
            >
              <Building2 className="h-4 w-4 text-teal-600" />
              <span>Business Directory</span>
            </a>
            <a
              href="#noticeboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-red-600 py-1.5"
            >
              <BellRing className="h-4 w-4 text-red-600" />
              <span>Noticeboard & Bulk Orders</span>
            </a>
            <a
              href="#rules"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-stone-900 py-1.5"
            >
              <ShieldCheck className="h-4 w-4 text-stone-400" />
              <span>Community Guidelines</span>
            </a>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
              <Button
                variant="turquoise"
                size="sm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSubmitBusiness();
                }}
                className="w-full gap-2 justify-center"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Submit Business to Directory</span>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
