"use client";

import * as React from "react";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Hero } from "@/components/hero";
import { DirectorySection, BusinessItem } from "@/components/directory-section";
import { NoticeboardSection, NoticeItem } from "@/components/noticeboard-section";
import { Button } from "@/components/ui/button";
import {
  IsometricBridge,
  IsometricJobPool,
  IsometricInvestment,
  IsometricLegalTrade,
} from "@/components/ui/isometric-icons";
import {
  Shield,
  Building,
  Coffee,
  MessageCircle,
  Plus,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Heart,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface HomeClientProps {
  initialBusinesses: BusinessItem[];
  initialNotices: NoticeItem[];
}

export function HomeClient({ initialBusinesses, initialNotices }: HomeClientProps) {
  const { setWhatsAppOpen, setSubmitBusinessOpen, setSubmitNoticeOpen, language } = useApp();
  const isTr = language === "tr";

  return (
    <div>
      {/* Minimal Hero */}
      <Hero
        onOpenWhatsApp={() => setWhatsAppOpen(true)}
        onOpenSubmitBusiness={() => setSubmitBusinessOpen(true)}
      />

      {/* Community Spotlight Banners: Students Solidarity & Elders Picnics */}
      <section className="py-8 bg-zinc-50/80 dark:bg-zinc-900/50 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Hire a Student */}
            <Link
              href="/hire-a-student"
              className="group relative flex items-start gap-4 rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all dark:border-emerald-950 dark:bg-zinc-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                    {isTr ? "Öğrenci Dayanışması" : "Student Solidarity"}
                  </span>
                  <span className="text-xs text-zinc-400">QLD Universities</span>
                </div>
                <h3 className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {isTr ? "Bir Türk Öğrenciye Destek Olun" : "Hire A Turkish Student Abroad"}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {isTr
                    ? "Çocuk bakımı, temizlik, boya-tamirat ve özel derslerde gece kuryeliği yerine saygın iş ve adil kazanç."
                    : "Fair-pay babysitting, cleaning, handyman & tutoring jobs for Queensland Turkish students facing high living costs."}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>{isTr ? "Profilleri & İlanları İncele" : "Explore Profiles & Post Tasks"}</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Card 2: Elders & Park Picnics */}
            <Link
              href="/seniors"
              className="group relative flex items-start gap-4 rounded-2xl border border-red-200/80 bg-white p-5 shadow-xs hover:shadow-md hover:border-red-300 transition-all dark:border-red-950 dark:bg-zinc-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#E30A17] dark:bg-red-950/60 dark:text-red-300 group-hover:scale-105 transition-transform">
                <Heart className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E30A17] dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-full">
                    {isTr ? "Büyüklerimiz Kulübü" : "Elders Circle"}
                  </span>
                  <span className="text-xs text-zinc-400">Brisbane & Gold Coast</span>
                </div>
                <h3 className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#E30A17] dark:group-hover:text-red-400 transition-colors">
                  {isTr ? "Park Piknikleri, Semaver Çayı & Tavla" : "Public Park Picnics & Samovar Tea"}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {isTr
                    ? "Roma Street, New Farm ve South Bank gölgeliklerinde açık hava çayı, ev yapımı börekler ve genç şoför desteği."
                    : "Shaded park gatherings, fresh samovar çay, backgammon tournaments, and free youth volunteer carpool."}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#E30A17] dark:text-red-400">
                  <span>{isTr ? "Piknik Takvimi & Gönüllü Şoför Ol" : "View Picnics & Volunteer Driver"}</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <DirectorySection
        initialBusinesses={initialBusinesses}
        onOpenSubmitBusiness={() => setSubmitBusinessOpen(true)}
      />

      {/* Noticeboard Section */}
      <NoticeboardSection
        initialNotices={initialNotices}
        onOpenSubmitNotice={() => setSubmitNoticeOpen(true)}
      />

      {/* Strategic Mission & 4 Isometric Pillars */}
      <section id="strategic-pillars" className="py-20 bg-zinc-50/70 dark:bg-zinc-900/40 border-y border-zinc-200/80 dark:border-zinc-800/80 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-50 px-3 py-1 text-xs font-semibold text-[#E30A17] dark:bg-red-950/30 dark:border-red-500/30 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E30A17] animate-pulse" />
                {isTr ? "Stratejik Misyon & Platform Temelleri" : "Strategic Mission & Platform Pillars"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                {isTr
                  ? "Queensland Türk Topluluğu İçin Eksik Halka Tamamlanıyor"
                  : "Bridging the Missing Gap for Queensland Turks"}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Dağınık sosyal medya gruplarının yerini kurumsal, güvenilir bir ekosistem alıyor: ABR onaylı işletme rehberi, kariyer iş havuzu, iki yönlü ticaret açılımı ve kapsamlı yasal-ticari mevzuat rehberliği."
                  : "We replace fragmented social groups with an authoritative ecosystem: verified local directory, career job pool, bilateral business expansion, and comprehensive legal & trade compliance."}
              </p>
            </div>
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:border-[#E30A17] hover:text-[#E30A17] dark:hover:border-[#E30A17] dark:hover:text-[#E30A17] transition-all shadow-sm group"
              >
                <BookOpen className="h-4 w-4 text-[#E30A17]" />
                <span>{isTr ? "Makale & Rehberleri İncele" : "Read Full Insights & Playbooks"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 4 Isometric Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <Link
              href="/blog/why-qld-turks-bridging-the-missing-gap"
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-[#E30A17]/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50/80 p-2 dark:bg-red-950/30 group-hover:scale-105 transition-transform">
                  <IsometricBridge size={56} />
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold tracking-wide uppercase text-[#E30A17]">
                    {isTr ? "Topluluk Birliği" : "Community Unity"}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-[#E30A17] transition-colors dark:text-zinc-100">
                    {isTr ? "Dağınıklığı Ortadan Kaldırıyoruz" : "Bridging Community Fragmentation"}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isTr
                      ? "Brisbane, Gold Coast ve QLD'deki Türk diasporasını bağımsız, güvenilir ve sürdürülebilir kurumsal bir çatı altında birleştiriyoruz."
                      : "Uniting scattered Turkish diaspora into an institutional, human-moderated network across Brisbane, Gold Coast & QLD."}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#E30A17]">
                <span>{isTr ? "Analizi oku" : "Read analysis"}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 2 */}
            <Link
              href="/jobs"
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50/80 p-2 dark:bg-blue-950/30 group-hover:scale-105 transition-transform">
                  <IsometricJobPool size={56} />
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold tracking-wide uppercase text-blue-600 dark:text-blue-400">
                    {isTr ? "Yetenek & Kariyer" : "Talent & Careers"}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-blue-600 transition-colors dark:text-zinc-100">
                    {isTr ? "Ortak Türk İş Havuzu" : "Unified Turkish Job Pool"}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isTr
                      ? "İki dilli mühendisleri, ustaları, bilişim uzmanlarını ve üniversite öğrencilerini saygın, adil ücretli işverenlerle buluşturuyoruz."
                      : "Connecting bilingual engineers, tradespeople, tech specialists, and students with verified, fair-pay employers."}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>{isTr ? "İş İlanları & Havuzu Keşfet" : "Explore Jobs & Talent Pool"}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 3 */}
            <Link
              href="/blog/unlocking-business-potential-bilateral-trade-investments"
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50/80 p-2 dark:bg-emerald-950/30 group-hover:scale-105 transition-transform">
                  <IsometricInvestment size={56} />
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold tracking-wide uppercase text-emerald-600 dark:text-emerald-400">
                    {isTr ? "İki Yönlü Ticaret" : "Bilateral Trade"}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors dark:text-zinc-100">
                    {isTr ? "Ticaret & Yatırım Fırsatları" : "Bilateral Trade & Investments"}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isTr
                      ? "Türkiye ve Queensland arasında inşaat malzemeleri, gıda tedariki, toptan ithalat ve diaspora yatırım ortaklıklarını canlandırıyoruz."
                      : "Unlocking cross-border capital, construction materials, food distribution, and diaspora investment syndicates."}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>{isTr ? "Fırsatları incele" : "Explore opportunities"}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Pillar 4 */}
            <Link
              href="/blog/legal-playbook-starting-business-trade-queensland"
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-violet-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50/80 p-2 dark:bg-violet-950/30 group-hover:scale-105 transition-transform">
                  <IsometricLegalTrade size={56} />
                </div>
                <div className="mt-5">
                  <span className="text-xs font-semibold tracking-wide uppercase text-violet-600 dark:text-violet-400">
                    {isTr ? "Mevzuat & Hukuk" : "Legal & Compliance"}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-violet-600 transition-colors dark:text-zinc-100">
                    {isTr ? "Queensland Ticaret & Hukuk Rehberi" : "Trade & Legal Playbook"}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isTr
                      ? "ABN ve Pty Ltd şirket kuruluşu, QBCC müteahhit lisansları, Fair Work çalışan hakları ve DAFF biyogüvenlik ithalat mevzuatı."
                      : "Practical legal roadmaps: ABN vs Pty Ltd, QBCC builder licensing, Fair Work standards, and DAFF import biosecurity."}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
                <span>{isTr ? "Hukuk rehberini oku" : "Read legal guide"}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalist Community Info / About */}
      <section id="about" className="py-20 bg-white dark:bg-zinc-950 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {isTr ? "Queensland Türk Topluluğu İçin İnşa Edildi" : "Built for the Queensland Turkish Community"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {isTr
                ? "QLD Turks'ü yeni gelenler, uzun yıllardır yaşayanlar, öğrenciler ve işletmeler arasındaki bağı güçlendirmek için kurduk. Güvenilir ve teyitli temas noktaları."
                : "We started QLD Turks to bridge the gap between newcomers, long-term residents, students, and businesses. A reliable directory with verified contact points."}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Shield className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {isTr ? "Güvenli WhatsApp Topluluğu" : "Protected WhatsApp Hub"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Resmi WhatsApp grubumuz spam, reklam ve manipülasyondan uzak, saygılı ve yardımsever bir ortam sağlamak için yönetici onaylıdır."
                  : "Our official WhatsApp group is guarded by human confirmation to keep conversations spam-free, respectful, and genuine."}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Building className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {isTr ? "%100 Ücretsiz İlan & Kayıt" : "100% Free Listings"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Türkçe konuşan doktorlar, avukatlar, ustalar, restoranlar ve bilişim uzmanları hizmetlerini hiçbir listeleme ücreti ödemeden tanıtabilir."
                  : "Turkish-speaking doctors, lawyers, tradespeople, restaurants, and IT specialists can list their services without listing fees."}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Coffee className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {isTr ? "Ortak Sipariş & Dayanışma" : "Bulk Orders & Mutual Aid"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Topluluk tabanlı ortak siparişler sayesinde taze Türk kahvesi, Ege sızma zeytinyağı ve temel lezzetlerde navlun maliyetleri düşüyor."
                  : "Community-led group orders reduce freight costs on authentic Turkish coffee, Aegean olive oil, and kitchen essentials."}
              </p>
            </div>
          </div>

          {/* Quick Call to Action Banner */}
          <div className="mt-16 rounded-2xl bg-zinc-900 p-8 sm:p-10 text-white dark:bg-zinc-900 border border-zinc-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {isTr ? "Queensland Türk Ağına Katılın" : "Join the Queensland Turkish Network"}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 max-w-lg">
                  {isTr
                    ? "Özel WhatsApp grubumuza katılın veya işletmenizi rehbere ücretsiz ekleyin."
                    : "Get access to the private WhatsApp group or list your business on the directory."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setWhatsAppOpen(true)}
                  variant="turkish"
                  className="gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  {isTr ? "WhatsApp'a Katıl" : "Join WhatsApp"}
                </Button>
                <Button
                  onClick={() => setSubmitBusinessOpen(true)}
                  variant="outline"
                  className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                  {isTr ? "İşletme Ekle" : "List Business"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
