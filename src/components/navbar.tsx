"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, PlusCircle, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenWhatsApp: () => void;
  onOpenSubmitBusiness: () => void;
}

export function Navbar({ onOpenWhatsApp, onOpenSubmitBusiness }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-red-700 to-red-600 text-white font-bold shadow-md shadow-red-700/20 group-hover:scale-105 transition-transform">
            <span className="text-lg">🇹🇷</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-stone-900 dark:text-white leading-none">
              Turkish Brisbane
            </span>
            <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
              turkishbrisbane.com
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#directory"
            className="text-sm font-semibold text-stone-600 hover:text-red-700 dark:text-stone-300 dark:hover:text-red-400 transition-colors"
          >
            Business Directory
          </a>
          <a
            href="#noticeboard"
            className="text-sm font-semibold text-stone-600 hover:text-red-700 dark:text-stone-300 dark:hover:text-red-400 transition-colors"
          >
            Community Noticeboard
          </a>
          <a
            href="#about"
            className="text-sm font-semibold text-stone-600 hover:text-red-700 dark:text-stone-300 dark:hover:text-red-400 transition-colors"
          >
            About & Rules
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSubmitBusiness}
            className="font-medium gap-1.5 border-stone-300 hover:border-stone-400"
          >
            <PlusCircle className="h-4 w-4 text-red-600" />
            Add Business
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            onClick={onOpenWhatsApp}
            className="font-semibold gap-1.5"
          >
            <MessageCircle className="h-4 w-4" />
            Join WhatsApp
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-6 dark:border-stone-800 dark:bg-stone-900 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 pb-4">
            <a
              href="#directory"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-stone-700 dark:text-stone-200 py-1"
            >
              Business Directory
            </a>
            <a
              href="#noticeboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-stone-700 dark:text-stone-200 py-1"
            >
              Noticeboard & Orders
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-stone-700 dark:text-stone-200 py-1"
            >
              About & Community Rules
            </a>
          </div>
          <div className="flex flex-col gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <Button
              variant="whatsapp"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Join WhatsApp Group
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSubmitBusiness();
              }}
              className="w-full justify-center gap-2"
            >
              <PlusCircle className="h-4 w-4 text-red-600" />
              Submit Business Listing
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
