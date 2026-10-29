"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/app-context";
import { TurkishLogo } from "@/components/ui/turkish-logo";
import { Button } from "@/components/ui/button";
import {
  X,
  Home,
  Building2,
  BellRing,
  BookOpen,
  Info,
  Mail,
  Plus,
  MessageCircle,
  Accessibility,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Scale,
  UtensilsCrossed,
  Wrench,
  Laptop,
  GraduationCap,
  ExternalLink,
  Map as MapIcon,
  Briefcase,
  Calendar as CalendarIcon,
  Heart,
} from "lucide-react";

export function SaasSidebar() {
  const {
    isSidebarOpen,
    setSidebarOpen,
    setWhatsAppOpen,
    setSubmitBusinessOpen,
    setSubmitNoticeOpen,
    setA11yOpen,
    language,
    toggleLanguage,
  } = useApp();

  const isTr = language === "tr";
  const pathname = usePathname();

  // Close on route change
  React.useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, setSidebarOpen]);

  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, setSidebarOpen]);

  if (!isSidebarOpen) return null;

  const navLinks = [
    { href: "/", label: isTr ? "Ana Sayfa" : "Home", icon: Home, exact: true },
    { href: "/directory", label: isTr ? "İşletme Rehberi" : "Business Directory", icon: Building2, badge: isTr ? "Onaylı" : "Verified" },
    { href: "/directory/map", label: isTr ? "İnteraktif Harita" : "Interactive Map", icon: MapIcon, badge: isTr ? "Harita" : "Map" },
    { href: "/jobs", label: isTr ? "Kariyer & İş Havuzu" : "Careers & Job Pool", icon: Briefcase, badge: isTr ? "İlanlar" : "Hiring" },
    { href: "/hire-a-student", label: isTr ? "Bir Öğrenciye Destek Ol" : "Hire a Turkish Student", icon: GraduationCap, badge: isTr ? "Dayanışma" : "Support" },
    { href: "/seniors", label: isTr ? "Büyüklerimiz & Park Piknikleri" : "Elders & Park Picnics", icon: Heart, badge: isTr ? "Piknik" : "Semaver" },
    { href: "/events", label: isTr ? "Etkinlikler & Takvim" : "Events & Calendar", icon: CalendarIcon, badge: isTr ? "Yaklaşan" : "Upcoming" },
    { href: "/noticeboard", label: isTr ? "Duyuru Panosu" : "Noticeboard", icon: BellRing, badge: isTr ? "Aktif" : "Active" },
    { href: "/guide", label: isTr ? "QLD Yaşam Rehberi" : "Living in QLD Guide", icon: BookOpen },
    { href: "/blog", label: isTr ? "Makaleler & Rehberler" : "Insights & Playbooks", icon: BookOpen, badge: isTr ? "Yeni" : "New" },
    { href: "/about", label: isTr ? "Hakkımızda & Standartlar" : "About & E-E-A-T Standards", icon: Info },
    { href: "/contact", label: isTr ? "İletişim & Destek" : "Contact & Support", icon: Mail },
  ];

  const categories = [
    { name: isTr ? "Sağlık & Tıp" : "Medical & Health", icon: Stethoscope, href: "/directory?category=Medical" },
    { name: isTr ? "Hukuk & Göçmenlik" : "Legal & Migration", icon: Scale, href: "/directory?category=Legal" },
    { name: isTr ? "Market & Yeme-İçme" : "Food & Groceries", icon: UtensilsCrossed, href: "/directory?category=Food%20%26%20Groceries" },
    { name: isTr ? "Bilişim & IT" : "Tech Support & IT", icon: Laptop, href: "/directory?category=Tech%20Support%20%26%20IT" },
    { name: isTr ? "Ustalar & Tamirat" : "Trades & Services", icon: Wrench, href: "/directory?category=Trades" },
    { name: isTr ? "Eğitim & Dersler" : "Education & Lessons", icon: GraduationCap, href: "/directory?category=Education" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Sidebar Drawer */}
      <aside
        className="relative z-10 flex w-full max-w-xs flex-col bg-white dark:bg-zinc-950 shadow-2xl border-r border-zinc-200 dark:border-zinc-800 h-full"
        aria-label="Navigation Sidebar"
      >
        {/* Top Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-zinc-100 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2.5">
            <TurkishLogo size={32} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  QLD Turks
                </span>
                <span className="text-[10px] font-semibold text-[#E30A17] bg-red-50 dark:bg-red-950/60 px-1.5 py-0.2 rounded-full ring-1 ring-inset ring-red-500/20">
                  Hub
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-normal">
                Queensland Directory
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Quick Actions Card */}
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isTr ? "Onaylı WhatsApp Topluluğu" : "Verified WhatsApp Network"}</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              {isTr ? "Brisbane, Gold Coast ve QLD genelinde 420+ Türk üye." : "420+ Turkish-Australians across Brisbane, Gold Coast & QLD."}
            </p>
            <Button
              variant="turkish"
              size="sm"
              className="mt-3 w-full gap-1.5 text-xs font-semibold"
              onClick={() => {
                setSidebarOpen(false);
                setWhatsAppOpen(true);
              }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{isTr ? "WhatsApp Grubuna Katıl" : "Join WhatsApp Hub"}</span>
            </Button>
          </div>

          {/* Main Links */}
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              {isTr ? "Menü & Sayfalar" : "Navigation"}
            </div>
            {navLinks.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-red-50 text-[#E30A17] dark:bg-red-950/40 dark:text-red-400 font-semibold"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-zinc-500 dark:text-zinc-400 font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Directory Categories */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <span>{isTr ? "Rehber Kategorileri" : "Directory Sectors"}</span>
              <Link
                href="/directory"
                className="text-[10px] text-[#E30A17] hover:underline"
              >
                {isTr ? "Tümünü Gör" : "View all"}
              </Link>
            </div>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{cat.name}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
                </Link>
              );
            })}
          </div>

          {/* Community Actions */}
          <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-xs"
              onClick={() => {
                setSidebarOpen(false);
                setSubmitBusinessOpen(true);
              }}
            >
              <Plus className="h-3.5 w-3.5 text-[#E30A17]" />
              <span>{isTr ? "İşletme Ekle (Ücretsiz)" : "List Turkish Business (Free)"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-xs"
              onClick={() => {
                setSidebarOpen(false);
                setSubmitNoticeOpen(true);
              }}
            >
              <Plus className="h-3.5 w-3.5 text-zinc-500" />
              <span>{isTr ? "Duyuru / İlan Ver" : "Post Community Notice"}</span>
            </Button>
          </div>
        </div>

        {/* Footer info & Accessibility button */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              setA11yOpen(true);
            }}
            className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4 text-[#E30A17]" />
              <span>Accessibility / Erişilebilirlik</span>
            </div>
            <span className="text-[10px] text-zinc-400">Settings</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

