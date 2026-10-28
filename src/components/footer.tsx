import * as React from "react";
import Link from "next/link";
import { Heart, Shield, PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="border-t border-stone-200 bg-white text-stone-600 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇹🇷</span>
              <span className="text-lg font-bold text-stone-900 dark:text-white">
                Turkish Brisbane (turkishbrisbane.com)
              </span>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-md">
              An independent, community-driven platform created to connect Turkish-speaking Australians, migrants, students, and businesses in Greater Brisbane and Queensland.
            </p>
            <div className="pt-2 text-xs text-stone-400 flex items-center gap-1.5">
              <span>Built with Next.js, Prisma & Tailwind CSS</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">Ready for Coolify & Hostinger</span>
            </div>
          </div>

          {/* Column 2: Navigation & Sections */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
              Directory & Links
            </h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a href="#directory" className="hover:text-red-600 transition-colors">
                  Business Directory
                </a>
              </li>
              <li>
                <a href="#noticeboard" className="hover:text-red-600 transition-colors">
                  Community Noticeboard
                </a>
              </li>
              <li>
                <a href="#rules" className="hover:text-red-600 transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <Link href="/api/businesses" className="hover:text-red-600 transition-colors">
                  API: Businesses (JSON)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Queensland Emergency & Support */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white flex items-center gap-1">
              <PhoneCall className="h-3.5 w-3.5 text-red-600" /> Useful QLD Contacts
            </h4>
            <ul className="space-y-1 text-xs text-stone-500 dark:text-stone-400">
              <li>
                <strong>Emergency (Police/Fire/Ambulance):</strong> 000
              </li>
              <li>
                <strong>Police Non-Emergency (Policelink):</strong> 131 444
              </li>
              <li>
                <strong>Queensland Healthline:</strong> 13 HEALTH (13 43 25 84)
              </li>
              <li>
                <strong>Lifeline Crisis Support:</strong> 13 11 14
              </li>
              <li>
                <strong>TIS National (Translating/Interpreting):</strong> 131 450
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} turkishbrisbane.com. Designed for the Brisbane Turkish Community.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-red-600 fill-red-600" /> for Brisbane & Queensland
          </p>
        </div>
      </div>
    </footer>
  );
}
