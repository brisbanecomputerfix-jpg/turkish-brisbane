import * as React from "react";
import Link from "next/link";
import { PhoneCall, ShieldCheck, Heart } from "lucide-react";
import { TurkishLogo } from "@/components/ui/turkish-logo";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <TurkishLogo size={32} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-zinc-900 dark:text-white">
                    QLD Turks
                  </span>
                  <span className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/50 px-2 py-0.5 text-[10px] font-semibold text-[#E30A17] ring-1 ring-inset ring-red-600/10 dark:ring-red-500/20">
                    Türkiye
                  </span>
                </div>
                <span className="text-xs text-zinc-400 font-mono">qldturks.com</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              An independent, community-moderated directory connecting Turkish-Australians, students, and businesses across Greater Brisbane, Gold Coast, and Queensland.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Australian Business Register (ABR) Verified</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/directory" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Business Directory
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5">
                  <span>Careers & Job Pool</span>
                  <span className="text-[9px] bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded font-bold">Hiring</span>
                </Link>
              </li>
              <li>
                <Link href="/noticeboard" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Noticeboard & Housing
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Living in QLD Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Insights & Playbooks
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  About & E-E-A-T
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about#verification" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Verification Standards
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Privacy Policy (APPs)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Community Terms
                </Link>
              </li>
              <li>
                <Link href="/api/businesses" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-mono text-xs">
                  API: Businesses (JSON)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Queensland Useful Contacts */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <PhoneCall className="h-3.5 w-3.5 text-[#E30A17]" />
              Useful Queensland Contacts
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Emergency:</strong>{" "}
                <a href="tel:000" className="hover:underline">000 (Police / Fire / Ambulance)</a>
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Policelink:</strong>{" "}
                <a href="tel:131444" className="hover:underline">131 444 (Non-Emergency)</a>
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">QLD Healthline:</strong>{" "}
                <a href="tel:13432584" className="hover:underline">13 HEALTH (13 43 25 84)</a>
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">TIS National:</strong>{" "}
                <a href="tel:131450" className="hover:underline">131 450 (Turkish Interpreter)</a>
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Sydney Consulate:</strong>{" "}
                <a href="tel:+61293024600" className="hover:underline">+61 2 9302 4600</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} qldturks.com. Built with care for the Queensland Turkish Community.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <span>Brisbane • Gold Coast • Sunshine Coast</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
