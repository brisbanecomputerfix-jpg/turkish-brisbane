import * as React from "react";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E30A17] text-white">
                <svg
                  viewBox="0 0 100 100"
                  width="16"
                  height="16"
                  className="h-4 w-4 fill-white shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="50" cy="50" r="30" fill="#ffffff" />
                  <circle cx="58" cy="50" r="24" fill="#E30A17" />
                  <polygon points="68,50 78,53 70,59 73,69 64,63 56,69 59,59 51,53 61,50 64,41" fill="#ffffff" />
                </svg>
              </div>
              <span className="text-base font-bold text-zinc-900 dark:text-white">
                QLD Turks
              </span>
              <span className="text-xs text-zinc-400 font-mono">qldturks.com</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              An independent, community-moderated directory connecting Turkish-Australians, students, and businesses across Greater Brisbane and Queensland.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#directory" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Business Directory
                </a>
              </li>
              <li>
                <a href="#noticeboard" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Community Noticeboard
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  About Community
                </a>
              </li>
              <li>
                <Link href="/api/businesses" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-mono text-xs">
                  API: Businesses (JSON)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Queensland Useful Contacts */}
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
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} qldturks.com. Built for the Queensland Turkish Diaspora.
          </p>
          <p className="text-zinc-400">
            Brisbane • Gold Coast • Sunshine Coast • Queensland
          </p>
        </div>
      </div>
    </footer>
  );
}
