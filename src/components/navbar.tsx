"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/app-context";
import { TurkishLogo } from "@/components/ui/turkish-logo";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Building2,
  Stethoscope,
  Scale,
  UtensilsCrossed,
  Laptop,
  Wrench,
  GraduationCap,
  MessageCircle,
  BellRing,
  BookOpen,
  ShieldCheck,
  Accessibility,
  Plus,
  Users,
  Compass,
  FileText,
  Phone,
  LayoutGrid,
  Map as MapIcon,
  Briefcase,
  Calendar as CalendarIcon,
  Heart,
} from "lucide-react";

export function Navbar() {
  const {
    toggleSidebar,
    setWhatsAppOpen,
    setSubmitBusinessOpen,
    setA11yOpen,
    language,
    toggleLanguage,
    t,
  } = useApp();

  const isTr = language === "tr";
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  React.useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
      <div
        ref={navRef}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Left: SaaS Sidebar Toggle & Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* SaaS Sidebar Trigger */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
            title={isTr ? "Hızlı Gezinme Menüsü" : "Open Quick Navigation Sidebar"}
            aria-label="Toggle navigation sidebar"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>

          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <TurkishLogo
              size={36}
              className="transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  QLD Turks
                </span>
                <span className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/50 px-2 py-0.5 text-[10px] font-semibold text-[#E30A17] ring-1 ring-inset ring-red-600/10 dark:ring-red-500/20">
                  Türkiye
                </span>
              </div>
              <span className="hidden sm:inline-block text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
                {isTr ? "Queensland Türk Topluluğu" : "Queensland Community Directory"}
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Detailed Drop-Down Mega Menus */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {/* 1. Directory Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("directory")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeDropdown === "directory" || pathname.startsWith("/directory")
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              }`}
              aria-expanded={activeDropdown === "directory"}
            >
              <span>{isTr ? "Rehber" : "Directory"}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "directory" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Directory Dropdown Menu */}
            {activeDropdown === "directory" && (
              <div className="absolute left-0 mt-2 w-[440px] rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/directory?category=Medical"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Stethoscope className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Sağlık & Tıp" : "Medical & Health"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Türk doktorlar & klinikler" : "Turkish doctors & GPs"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/directory?category=Legal"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Scale className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Hukuk & Göçmenlik" : "Legal & Migration"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Avukatlar & vize danışmanları" : "Solicitors & visa agents"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/directory?category=Food%20%26%20Groceries"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <UtensilsCrossed className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Market & Yeme-İçme" : "Food & Groceries"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Fırınlar, pide & helal kasaplar" : "Bakeries, pide & halal"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/directory?category=Tech%20Support%20%26%20IT"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Laptop className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Bilişim & IT" : "Tech & IT"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Yazılım, web & teknik destek" : "Web, POS & support"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/directory?category=Trades"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Wrench className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Ustalar & Hizmetler" : "Trades & Services"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Elektrikçi, boyacı & tamirat" : "Electricians, painters"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/directory?category=Education"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <GraduationCap className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Eğitim & Dersler" : "Education & Tutors"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Türkçe okulu & özel dersler" : "Turkish school & lessons"}
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/directory"
                      className="font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[#E30A17]"
                    >
                      {isTr ? "Rehbere Göz At →" : "Browse Directory →"}
                    </Link>
                    <Link
                      href="/directory/map"
                      className="inline-flex items-center gap-1 font-semibold text-[#E30A17] hover:underline"
                    >
                      <MapIcon className="h-3 w-3" />
                      <span>{isTr ? "İnteraktif Harita →" : "Interactive Map →"}</span>
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      setSubmitBusinessOpen(true);
                    }}
                    className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  >
                    {isTr ? "+ İşletme Ekle" : "+ Add Business"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Community Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("community")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeDropdown === "community" || pathname.startsWith("/noticeboard")
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              }`}
              aria-expanded={activeDropdown === "community"}
            >
              <span>{isTr ? "Topluluk" : "Community"}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "community" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "community" && (
              <div className="absolute left-0 mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      setWhatsAppOpen(true);
                    }}
                    className="flex w-full items-start gap-2.5 p-2 rounded-xl text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{isTr ? "WhatsApp Topluluğu" : "WhatsApp Network"}</span>
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-full font-bold">
                          {isTr ? "Aktif" : "Live"}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Queensland genelinde 420+ üyeye katıl" : "Join 420+ members across Queensland"}
                      </div>
                    </div>
                  </button>

                  <Link
                    href="/noticeboard"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <BellRing className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Duyuru Panosu" : "Community Noticeboard"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Oda kiralama, ortak ithalat & ilanlar" : "Room rentals, bulk imports & jobs"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/jobs"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Briefcase className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{isTr ? "Kariyer & İş Havuzu" : "Careers & Job Pool"}</span>
                        <span className="text-[9px] bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 px-1.5 py-0.2 rounded-full font-bold">
                          {isTr ? "İlanlar" : "Hiring"}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Onaylı iş ilanları & yetenek havuzu" : "Verified vacancies & talent registry"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/events"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <CalendarIcon className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{isTr ? "Etkinlikler & Takvim" : "Events & Calendar"}</span>
                        <span className="text-[9px] bg-red-50 text-[#E30A17] dark:bg-red-950/60 px-1.5 py-0.2 rounded-full font-bold">
                          {isTr ? "Buluşmalar" : "Gatherings"}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Kahvaltılar, Cumhuriyet Balosu & buluşmalar" : "Monthly breakfasts, gala balls & forums"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/hire-a-student"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <GraduationCap className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{language === "tr" ? "Bir Öğrenciye Destek Ol" : "Hire a Turkish Student"}</span>
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 px-1.5 py-0.2 rounded-full font-bold">
                          {language === "tr" ? "Destek" : "Support"}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {language === "tr" ? "Çocuk bakımı, temizlik, tamirat & ders" : "Babysitting, cleaning, handyman & tutoring"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/seniors"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Heart className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{language === "tr" ? "Büyüklerimiz & Park Piknikleri" : "Elders & Park Picnics"}</span>
                        <span className="text-[9px] bg-red-50 text-[#E30A17] dark:bg-red-950/60 px-1.5 py-0.2 rounded-full font-bold">
                          {language === "tr" ? "Semaver" : "Picnics"}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {language === "tr" ? "Gölgeli park buluşmaları, çay, tavla & genç şoförler" : "Shaded park picnics, samovar tea & youth carpool"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/noticeboard?type=bulk_order"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Users className="h-4 w-4 text-zinc-600 dark:text-zinc-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Toplu Sipariş & Dayanışma" : "Bulk Orders & Mutual Aid"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Doğrudan Türk kahvesi & zeytinyağı alımları" : "Direct Turkish coffee & olive oil pallets"}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3. Living in QLD (Guides) */}
          <Link
            href="/guide"
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              pathname === "/guide"
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {isTr ? "QLD Yaşam Rehberi" : "Living in QLD Guide"}
          </Link>

          {/* 4. Careers & Job Pool */}
          <Link
            href="/jobs"
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              pathname.startsWith("/jobs")
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <span>{isTr ? "Kariyer & İlanlar" : "Careers & Jobs"}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          </Link>

          {/* 5. Insights & Articles */}
          <Link
            href="/blog"
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              pathname.startsWith("/blog")
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {isTr ? "Makaleler" : "Insights & Playbooks"}
          </Link>

          {/* 6. About & E-E-A-T */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("about")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeDropdown === "about" || pathname.startsWith("/about")
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              }`}
              aria-expanded={activeDropdown === "about"}
            >
              <span>{isTr ? "Hakkımızda & Güven" : "About & Trust"}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "about" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "about" && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="space-y-1">
                  <Link
                    href="/about"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "QLD Turks Hakkında" : "About QLD Turks"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Misyonumuz, yönetim & ilkelerimiz" : "Mission, governance & ethics"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/blog/why-qld-turks-bridging-the-missing-gap"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 text-[#E30A17] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Eksik Olan Halka" : "The Missing Gap"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Neden QLD Turks kuruldu?" : "Why QLD Turks was founded"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/about#verification"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <FileText className="h-4 w-4 text-zinc-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "Onay & Standartlar" : "Verification & Standards"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "İşletmeler nasıl denetlenir (E-E-A-T)" : "How listings are vetted (E-E-A-T)"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-zinc-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {isTr ? "İletişim & Destek" : "Contact & Support"}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {isTr ? "Sorularınız ve geri bildirim" : "Enquiries & community feedback"}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Accessibility, List Business & WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Accessibility Toggle Button */}
          <button
            type="button"
            onClick={() => setA11yOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            title="Accessibility settings / Erişilebilirlik"
            aria-label="Open accessibility settings"
          >
            <Accessibility className="h-4 w-4 text-[#E30A17]" />
          </button>

          {/* Language Switcher (TR | EN) */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex h-9 items-center gap-1.5 px-2.5 rounded-lg border border-zinc-200 bg-white text-xs font-bold text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
            title={language === "tr" ? "Switch to English" : "Türkçe'ye geç"}
            aria-label="Toggle language between Turkish and English"
          >
            <span className={language === "tr" ? "text-[#E30A17] font-black" : "text-zinc-400 font-normal"}>
              TR
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className={language === "en" ? "text-cyan-600 font-black" : "text-zinc-400 font-normal"}>
              EN
            </span>
          </button>

          {/* List Business Button */}
          <Button
            onClick={() => setSubmitBusinessOpen(true)}
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex gap-1.5 text-xs font-medium"
          >
            <Plus className="h-3.5 w-3.5 text-[#E30A17]" />
            <span>{isTr ? "İşletme Ekle" : "List Business"}</span>
          </Button>

          {/* WhatsApp Button */}
          <Button
            onClick={() => setWhatsAppOpen(true)}
            variant="turkish"
            size="sm"
            className="gap-1.5 text-xs font-semibold shadow-xs"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">WhatsApp</span>
            <span className="xs:hidden">{isTr ? "Katıl" : "Join"}</span>
          </Button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Accordion Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <Link
              href="/directory"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              <Building2 className="h-4 w-4 text-[#E30A17]" />
              <span>{isTr ? "Rehber" : "Directory"}</span>
            </Link>
            <Link
              href="/noticeboard"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              <BellRing className="h-4 w-4 text-[#E30A17]" />
              <span>{isTr ? "Duyuru Panosu" : "Noticeboard"}</span>
            </Link>
            <Link
              href="/guide"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              <BookOpen className="h-4 w-4 text-[#E30A17]" />
              <span>{isTr ? "QLD Rehberi" : "QLD Guide"}</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              <BookOpen className="h-4 w-4 text-emerald-600" />
              <span>{isTr ? "Makaleler" : "Insights & Blog"}</span>
            </Link>
            <Link
              href="/jobs"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 col-span-2"
            >
              <Briefcase className="h-4 w-4 text-blue-600" />
              <div className="flex items-center justify-between w-full">
                <span>{isTr ? "Kariyer & İş Havuzu" : "Careers & Job Pool"}</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-bold">
                  {isTr ? "İlanlar" : "Hiring"}
                </span>
              </div>
            </Link>
            <Link
              href="/events"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 col-span-2"
            >
              <CalendarIcon className="h-4 w-4 text-[#E30A17]" />
              <div className="flex items-center justify-between w-full">
                <span>{isTr ? "Etkinlikler & Takvim" : "Events & Gatherings"}</span>
                <span className="text-[10px] bg-red-100 dark:bg-red-950 text-[#E30A17] px-1.5 py-0.5 rounded font-bold">
                  {isTr ? "Takvim" : "Calendar"}
                </span>
              </div>
            </Link>
            <Link
              href="/hire-a-student"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 col-span-2"
            >
              <GraduationCap className="h-4 w-4 text-emerald-600" />
              <div className="flex items-center justify-between w-full">
                <span>{isTr ? "Bir Öğrenciye Destek Ol" : "Hire a Turkish Student"}</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                  {isTr ? "Dayanışma" : "Support"}
                </span>
              </div>
            </Link>
            <Link
              href="/seniors"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 col-span-2"
            >
              <Heart className="h-4 w-4 text-[#E30A17]" />
              <div className="flex items-center justify-between w-full">
                <span>{isTr ? "Büyüklerimiz & Park Piknikleri" : "Elders & Park Picnics"}</span>
                <span className="text-[10px] bg-red-100 dark:bg-red-950 text-[#E30A17] px-1.5 py-0.5 rounded font-bold">
                  {isTr ? "Semaver" : "Picnics"}
                </span>
              </div>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 col-span-2"
            >
              <ShieldCheck className="h-4 w-4 text-[#E30A17]" />
              <span>{isTr ? "Hakkımızda & Güven İlkeleri" : "About & Trust Standards"}</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                setSubmitBusinessOpen(true);
              }}
              variant="outline"
              size="sm"
              className="w-1/2 text-xs gap-1.5"
            >
              <Plus className="h-3.5 w-3.5 text-[#E30A17]" />
              <span>{isTr ? "İşletme Ekle" : "Add Listing"}</span>
            </Button>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                setA11yOpen(true);
              }}
              variant="secondary"
              size="sm"
              className="w-1/2 text-xs gap-1.5"
            >
              <Accessibility className="h-3.5 w-3.5 text-[#E30A17]" />
              <span>{isTr ? "Erişilebilirlik" : "Accessibility"}</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
