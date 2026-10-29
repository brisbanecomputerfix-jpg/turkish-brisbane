"use client";

import * as React from "react";
import Link from "next/link";
import { TurkishLogo } from "@/components/ui/turkish-logo";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  FileCheck,
  Scale,
  Stethoscope,
  HeartHandshake,
  MessageCircle,
  HelpCircle,
  Mail,
  ArrowRight,
  Camera,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/app-context";

export function AboutClient() {
  const { language } = useApp();
  const isTr = language === "tr";

  return (
    <div className="py-10 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] sm:text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <TurkishLogo size={14} className="rounded-[3px] shrink-0" />
            <span className="truncate sm:whitespace-normal">
              {isTr
                ? "Bağımsız & Gönüllü Topluluk Portalı"
                : "Independent & Volunteer-Led"}
            </span>
          </div>

          <h1 className="mt-4 text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.18] break-words">
            {isTr
              ? "Queensland Türk topluluğunu birbirine bağlıyor ve güçlendiriyoruz."
              : "Connecting and empowering the Turkish community across Queensland."}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {isTr
              ? "QLD Turks; Brisbane ve Queensland genelindeki Türk profesyoneller, üniversite öğrencileri ve aileler tarafından, dolandırıcılık veya yetkisiz aracılardan uzak, resmi denetimli Türkçe hizmetlere güvenle ulaşmak için kurulmuştur."
              : "QLD Turks was founded by local professionals, students, and families in Greater Brisbane to solve a common challenge: finding reliable, verified, Turkish-speaking services without fear of scams or unaccredited providers."}
          </p>
        </div>

        {/* Primary Hero Image: Brisbane Story Bridge */}
        <div className="mt-8 sm:mt-12 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-xl group">
          <img
            src="/images/story-bridge-brisbane.jpg"
            alt="Brisbane Story Bridge spanning the river with city skyline, Queensland Australia"
            className="h-72 sm:h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Badge & Caption */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-white shadow-sm mb-2 sm:mb-3">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
              <span>Brisbane, Queensland · Story Bridge</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
              {isTr
                ? "Nehrin İki Yakasını Birleştiren Köprü Gibi"
                : "Building Bridges Across Greater Brisbane & Queensland"}
            </h2>
            <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm text-zinc-200 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
              {isTr
                ? "Tıpkı Brisbane'in simgesi olan tarihi Story Bridge'in nehrin iki yakasını birbirine bağlaması gibi; QLD Turks de Brisbane, Gold Coast ve Sunshine Coast'taki Türkleri, öğrencileri ve ustaları güçlü bir dayanışma bağıyla birleştiriyor."
                : "Just as Brisbane's iconic Story Bridge connects Kangaroo Point, Fortitude Valley, and the CBD across the river, QLD Turks bridges Turkish-Australians, university students, professionals, and elders across South East Queensland."}
            </p>
          </div>
        </div>

        {/* Dual Visual Strip: Story Bridge Daylight & Night Illumination */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 group">
            <img
              src="/images/story-bridge-daylight.jpg"
              alt="Story Bridge daylight cantilever view with city background"
              className="h-48 sm:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-300">
                {isTr ? "Gündüz Görünümü" : "Daylight Perspective"}
              </span>
              <p className="text-xs font-bold text-white">
                {isTr ? "Wilson's Lookout & Kangaroo Point Açısı" : "Story Bridge from Wilson's Lookout"}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 group">
            <img
              src="/images/story-bridge-night.jpg"
              alt="Story Bridge illuminated at night with river reflections and Howard Smith Wharves"
              className="h-48 sm:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                {isTr ? "Gece Işıkları" : "Night Reflections"}
              </span>
              <p className="text-xs font-bold text-white">
                {isTr ? "Işıklandırılmış Story Bridge & Howard Smith Wharves" : "Illuminated Story Bridge & Brisbane River"}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mt-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center">
            {isTr ? "Temel İlkelerimiz & Değerlerimiz" : "Our Guiding Principles"}
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#E30A17] dark:bg-red-950/50">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                {isTr ? "%100 Ticari Olmayan Bağımsız Yapı" : "100% Non-Commercial"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "İşletmelerden hiçbir listeleme veya komisyon ücreti alınmaz. Kullanıcılardan abonelik talep edilmez. Ücretli sıralama yükseltme yoktur."
                  : "We charge zero listing fees to businesses and zero subscription fees to users. There are no sponsored rankings or paid boosts."}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                {isTr ? "Sıkı Resmi Sicil Teyidi" : "Rigorous Verification"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Rehberde yer alan her doktor, avukat ve usta; AHPRA, OMARA, QBCC ve ABR resmi sicilleriyle karşılaştırıldıktan sonra onaylanır."
                  : "Every listed medical doctor, legal practitioner, and trade contractor is cross-referenced with Australian statutory registries before publication."}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                {isTr ? "Spamsiz Güvenli İletişim Ağı" : "Spam-Shielded Network"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Resmi WhatsApp topluluğumuz iki aşamalı insan onayıyla korunur; kripto dolandırıcıları, ticari spam ve saygısız tutumlar engellenir."
                  : "Our community WhatsApp hub requires two-step screening, eliminating crypto scammers, commercial spam, and disrespectful conduct."}
              </p>
            </div>
          </div>
        </div>

        {/* Verification Protocol (Google E-E-A-T Framework) */}
        <section id="verification" className="mt-20 scroll-mt-20">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-8 sm:p-12 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E30A17]">
                {isTr ? "Yetkinlik, Otorite ve Güven (E-E-A-T)" : "Authoritativeness & Trust"}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {isTr ? "Rehber İşletmelerini Nasıl Doğruluyoruz?" : "How We Verify Directory Listings"}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Google'ın E-E-A-T (Deneyim, Uzmanlık, Otorite ve Güvenilirlik) standartlarına uymak ve topluluk üyelerimizi korumak için sıkı kriterler uyguluyoruz:"
                  : "To adhere to Google's E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) standards and safeguard vulnerable community members, our review board applies strict criteria:"}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <Stethoscope className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {isTr ? "Doktorlar ve Sağlık Uzmanları" : "Medical & Dental Practitioners"}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                    {isTr
                      ? "Avustralya Sağlık Meslekleri Düzenleme Kurumu (AHPRA) nezdinde aktif kayıtlı olmalı ve akredite Queensland kliniklerinde çalışmalıdır."
                      : "Must be actively registered with the Australian Health Practitioner Regulation Agency (AHPRA) and practice in accredited Queensland clinics."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <Scale className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {isTr ? "Avukatlar ve Göçmenlik Danışmanları" : "Lawyers & Migration Agents"}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                    {isTr
                      ? "Göç danışmanları OMARA tescilli, avukatlar ise Queensland Hukuk Cemiyeti (QLS) aktif mesleki ruhsatına sahip olmalıdır."
                      : "Migration agents must hold active OMARA registration. Solicitors must hold Queensland Law Society practicing certificates."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <FileCheck className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {isTr ? "Ustalar, Elektrikçiler ve İnşaat" : "Trades & Builders"}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                    {isTr
                      ? "Elektrikçi, tesisatçı ve müteahhitler aktif Queensland Building and Construction Commission (QBCC) lisansına ve mali sorumluluk sigortasına sahip olmalıdır."
                      : "Electricians, plumbers, and builders must hold active Queensland Building and Construction Commission (QBCC) licenses with public liability insurance."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <Award className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {isTr ? "Gıda, Restoranlar ve Helal Marketler" : "Food, Dining & Grocers"}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                    {isTr
                      ? "Brisbane City Council gıda güvenliği lisansına sahip olmalı, helal et tedarikçileri geçerli helal sertifikasyonu ile doğrulanmalıdır."
                      : "Must hold valid Brisbane City Council Food Safety Licenses. Halal meat providers are verified for authentic certification."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-zinc-500">
                {isTr
                  ? "Yanlış bir bilgi mi fark ettiniz veya işletme mi bildirmek istiyorsunuz?"
                  : "Notice an incorrect listing or have a community report?"}
              </span>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Mail className="h-3.5 w-3.5 text-[#E30A17]" />
                  <span>{isTr ? "Bildirimde Bulun / İletişim" : "Report Listing or Inaccuracy"}</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteer Steering Committee Note */}
        <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {isTr
              ? "Topluluk Yönetimi ve Editoryal Bağımsızlık"
              : "Community Governance & Editorial Independence"}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {isTr
              ? "QLD Turks; üniversite akademisyenleri (UQ ve QUT lisansüstü öğrencileri), sağlık çalışanları ve topluluk büyüklerimizin gönüllü katkılarıyla işletilmektedir. Siyasi kuruluşlardan veya denetlenmemiş özel aracılardan sponsorluk kabul edilmez."
              : "QLD Turks operates as a mutual-benefit initiative maintained by volunteers from academia (UQ & QUT postgraduates), medical practitioners, and community elders. We do not accept advertising sponsorships from political entities or unvetted private recruiters."}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/directory">
              <Button variant="default" size="sm" className="gap-2 text-xs">
                <span>{isTr ? "Rehberi İncele" : "Explore Directory"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href="/guide">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <span>{isTr ? "QLD Yaşam Rehberi" : "Living in QLD Guide"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

