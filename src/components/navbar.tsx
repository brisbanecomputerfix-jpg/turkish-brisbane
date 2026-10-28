"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenWhatsApp: () => void;
  onOpenSubmitBusiness: () => void;
}

export function Navbar({ onOpenWhatsApp, onOpenSubmitBusiness }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E30A17] text-white">
            {/* Turkish Crescent & Star */}
            <svg
              viewBox="0 0 100 100"
              width="20"
              height="20"
              className="h-5 w-5 fill-white shrink-0"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="30" fill="#ffffff" />
              <circle cx="58" cy="50" r="24" fill="#E30A17" />
              <polygon points="68,50 78,53 70,59 73,69 64,63 56,69 59,59 51,53 61,50 64,41" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              QLD Turks
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-zinc-400 font-normal">
              Queensland Directory
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a
            href="#directory"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Directory
          </a>
          <a
            href="#noticeboard"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Noticeboard
          </a>
          <a
            href="#about"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            About
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Button
            onClick={onOpenSubmitBusiness}
            variant="outline"
            size="sm"
            className="gap-1.5 text-zinc-700"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>List Business</span>
          </Button>

          <Button
            onClick={onOpenWhatsApp}
            variant="turkish"
            size="sm"
            className="gap-1.5"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>WhatsApp Group</span>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <Button
            onClick={onOpenWhatsApp}
            variant="turkish"
            size="sm"
            className="px-2.5 py-1 text-xs"
          >
            WhatsApp
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 space-y-3">
          <a
            href="#directory"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300"
          >
            Business Directory
          </a>
          <a
            href="#noticeboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300"
          >
            Noticeboard & Bulk Orders
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300"
          >
            About Community
          </a>
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubmitBusiness();
              }}
              variant="outline"
              size="sm"
              className="w-full justify-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              List Your Business (Free)
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
