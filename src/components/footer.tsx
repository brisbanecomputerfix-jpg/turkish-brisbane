import * as React from "react";
import Link from "next/link";
import { Heart, Shield, PhoneCall, Globe, Sparkles, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="relative border-t border-stone-200/90 bg-white text-stone-600 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400 overflow-hidden">
      {/* Top ambient dual-color gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-rose-500 to-teal-500" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand & Community Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 shadow-md shadow-red-600/25 text-white transition-transform group-hover:scale-105">
                {/* Turkish Crescent and Star */}
                <svg
                  viewBox="0 0 100 100"
                  className="h-6 w-6 fill-white"
                  aria-hidden="true"
                >
                  <circle cx="50" cy="50" r="30" />
                  <circle cx="58" cy="50" r="24" className="fill-red-600" />
                  <polygon points="68,50 78,53 70,59 73,69 64,63 56,69 59,59 51,53 61,50 64,41" />
                </svg>
                {/* Turquoise Aegean jewel accent */}
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-400 border-2 border-white dark:border-stone-950 shadow-xs" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                    QLD<span className="text-red-600">Turks</span>
                  </span>
                  <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700 border border-teal-200/80 dark:bg-teal-950/50 dark:border-teal-800 dark:text-teal-300">
                    qldturks.com
                  </span>
                </div>
                <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                  Queensland & Brisbane Turkish Community Portal
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-md">
              Queensland&apos;deki Türk topluluğu, göçmenler, öğrenciler ve aileler için bağımsız, reklamsız dijital buluşma noktası. Brisbane, Gold Coast, Sunshine Coast ve çevre bölgelerde yaşayan herkesi bir araya getiriyoruz.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-stone-500">
              <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 dark:bg-stone-800 px-2.5 py-1 font-mono text-[11px]">
                <MapPin className="h-3 w-3 text-red-600" /> Brisbane, Queensland, Australia
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 px-2.5 py-1 text-[11px] font-semibold border border-teal-200/60 dark:border-teal-800">
                <Sparkles className="h-3 w-3" /> Live & Community Moderated
              </span>
            </div>
          </div>

          {/* Column 2: Navigation & Sections (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Directory & Portal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#directory" className="text-stone-600 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  Business Directory (Rehber)
                </a>
              </li>
              <li>
                <a href="#noticeboard" className="text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Community Noticeboard (Pano)
                </a>
              </li>
              <li>
                <a href="#rules" className="text-stone-600 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  Why QLD Turks? (Hakkımızda)
                </a>
              </li>
              <li>
                <Link href="/api/businesses" className="text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1">
                  <span>API: Businesses (JSON)</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/api/notices" className="text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1">
                  <span>API: Notices (JSON)</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Queensland Emergency & Support (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white flex items-center gap-1.5">
              <PhoneCall className="h-3.5 w-3.5 text-red-600" />
              Queensland Useful Contacts
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Acil durumlarda ve resmi yardımlarda kullanabileceğiniz doğrudan hatlar:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a
                href="tel:000"
                className="p-2.5 rounded-xl border border-red-200/80 bg-red-50/50 hover:bg-red-50 dark:border-red-900/60 dark:bg-red-950/30 text-stone-800 dark:text-stone-200 transition-colors block"
              >
                <div className="font-bold text-red-600 text-xs">000 (Emergency)</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">Police, Fire, Ambulance</div>
              </a>

              <a
                href="tel:131444"
                className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors block"
              >
                <div className="font-bold text-stone-900 dark:text-white text-xs">131 444 (Policelink)</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">Non-emergency Police</div>
              </a>

              <a
                href="tel:13432584"
                className="p-2.5 rounded-xl border border-teal-200/80 bg-teal-50/50 hover:bg-teal-50 dark:border-teal-900/60 dark:bg-teal-950/30 text-stone-800 dark:text-stone-200 transition-colors block"
              >
                <div className="font-bold text-teal-700 dark:text-teal-400 text-xs">13 HEALTH</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">24/7 Registered Nurse</div>
              </a>

              <a
                href="tel:131450"
                className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors block"
              >
                <div className="font-bold text-stone-900 dark:text-white text-xs">131 450 (TIS National)</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400">Türkçe Tercüman / Interpreter</div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} <strong>qldturks.com</strong> (Turkish Brisbane). Designed with love for the Queensland Turkish Diaspora.
          </p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>Powered by Turkish Red & Mediterranean Turquoise</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-red-600">
              <Heart className="h-3.5 w-3.5 fill-red-600" /> Brisbane
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
