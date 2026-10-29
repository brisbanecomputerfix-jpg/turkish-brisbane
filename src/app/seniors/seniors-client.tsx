"use client";

import * as React from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  Coffee,
  MapPin,
  Calendar,
  Clock,
  Car,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Phone,
  MessageCircle,
  ExternalLink,
  Info,
  X,
  Stethoscope,
  Smile,
  Sparkles,
} from "lucide-react";
import {
  SeniorPicnicEvent,
  SENIOR_PARK_PICNICS,
} from "@/data/seniors-data";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app-context";

interface SeniorsClientProps {
  initialPicnics: SeniorPicnicEvent[];
}

export function SeniorsClient({ initialPicnics }: SeniorsClientProps) {
  const { language } = useApp();
  const isTr = language === "tr";

  const [picnics, setPicnics] = React.useState<SeniorPicnicEvent[]>(initialPicnics);
  const [rsvpedIds, setRsvpedIds] = React.useState<Set<string>>(new Set());

  // Modal States
  const [registerElderModalOpen, setRegisterElderModalOpen] = React.useState(false);
  const [volunteerDriverModalOpen, setVolunteerDriverModalOpen] = React.useState(false);
  const [rsvpModalOpen, setRsvpModalOpen] = React.useState(false);
  const [selectedPicnic, setSelectedPicnic] = React.useState<SeniorPicnicEvent | null>(null);

  // Form States
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const [elderForm, setElderForm] = React.useState({
    elderName: "",
    age: "",
    suburb: "",
    needsTransport: true,
    notes: "",
    familyContact: "",
  });

  const [volunteerForm, setVolunteerForm] = React.useState({
    driverName: "",
    suburbsCovered: "",
    vehicleType: "",
    contactWhatsApp: "",
  });

  const [rsvpName, setRsvpName] = React.useState("");
  const [rsvpPhone, setRsvpPhone] = React.useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleRegisterElder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!elderForm.elderName || !elderForm.familyContact) {
      alert(isTr ? "Lütfen isim ve iletişim numarasını giriniz." : "Please fill in name and contact number.");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch("/api/seniors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register_elder",
          elderData: elderForm,
        }),
      });
      setRegisterElderModalOpen(false);
      setElderForm({
        elderName: "",
        age: "",
        suburb: "",
        needsTransport: true,
        notes: "",
        familyContact: "",
      });
      showToast(
        isTr
          ? "Büyüğümüzün kaydı başarıyla oluşturuldu! Koordinatörlerimiz sizinle iletişime geçecektir."
          : "Elder registration submitted! Our volunteer coordinators will be in touch."
      );
    } catch {
      alert("Hata oluştu, lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.driverName || !volunteerForm.contactWhatsApp) {
      alert(isTr ? "Lütfen isim ve WhatsApp numaranızı giriniz." : "Please enter your name and WhatsApp number.");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch("/api/seniors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "volunteer_driver",
          volunteerData: volunteerForm,
        }),
      });
      setVolunteerDriverModalOpen(false);
      setVolunteerForm({
        driverName: "",
        suburbsCovered: "",
        vehicleType: "",
        contactWhatsApp: "",
      });
      showToast(
        isTr
          ? "Gönüllü şoför kaydınız için sonsuz teşekkürler! Büyüklerimiz adına minnettarız."
          : "Thank you for volunteering as a driver! We will connect you with nearby seniors."
      );
    } catch {
      alert("Hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRsvpPicnic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPicnic || !rsvpName) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/seniors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "picnic_rsvp",
          rsvpData: {
            picnicId: selectedPicnic.id,
            attendeeName: rsvpName,
            phone: rsvpPhone,
          },
        }),
      });
      setRsvpedIds((prev) => new Set(prev).add(selectedPicnic.id));
      setPicnics((prev) =>
        prev.map((p) =>
          p.id === selectedPicnic.id ? { ...p, rsvpCount: p.rsvpCount + 1 } : p
        )
      );
      setRsvpModalOpen(false);
      setRsvpName("");
      setRsvpPhone("");
      showToast(
        isTr
          ? `Harika! "${selectedPicnic.titleTr}" pikniğine kaydınız alındı. Semaverde çayımız hazır olacak!`
          : `RSVP confirmed for "${selectedPicnic.titleEn}"! Fresh tea will be waiting for you.`
      );
    } catch {
      alert("RSVP failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-900 shadow-xl dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner with Turkish Crimson & Warm Community Accents */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-red-50/50 via-white to-zinc-50/60 py-12 dark:border-zinc-800 dark:from-red-950/20 dark:via-zinc-950 dark:to-zinc-950 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(#E30A17_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl space-y-3.5">
              <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-red-200 bg-red-50/90 px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#E30A17] dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                <Heart className="h-3.5 w-3.5 text-[#E30A17] shrink-0" />
                <span className="truncate sm:whitespace-normal">
                  {isTr
                    ? "Queensland Türk Büyüklerimiz & Emekliler Buluşması"
                    : "Queensland Turkish Seniors & Elders Circle"}
                </span>
              </div>
              <h1 className="text-2xl xs:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl break-words">
                {isTr ? (
                  <>
                    Park Piknikleri,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30A17] via-red-600 to-cyan-600 dark:to-cyan-400">
                      Semaver Çayı & Büyüklerimiz Buluşması
                    </span>
                  </>
                ) : (
                  <>
                    Public Park Picnics,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30A17] via-red-600 to-cyan-600 dark:to-cyan-400">
                      Samovar Tea & Elders Gatherings
                    </span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isTr
                  ? "Queensland'de yaşayan saygıdeğer büyüklerimiz, emeklilerimiz ve memleket hasreti çeken anne-babalarımız için Brisbane ve Gold Coast'un en güzel, gölgelik parklarında düzenli piknikler organize ediyoruz. Kömürlü semaver çayı, tavla karşılaşmaları, ev yapımı börekler, eski şarkılar ve gençlerin ücretsiz araçla alma desteğiyle yalnızlığa son veriyoruz."
                  : "Dedicated open-air gatherings in Queensland's most accessible, shaded public parks for our beloved Turkish elders and retirees. Combating social isolation with fresh samovar çay, backgammon tournaments, homemade börek, traditional folk music, and free youth carpooling support."}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
              <Button
                onClick={() => setRegisterElderModalOpen(true)}
                variant="turkish"
                className="gap-2 text-xs font-semibold shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span>{isTr ? "Büyüğümüzü Kaydet (Ulaşım & Çay)" : "Register an Elder Family Member"}</span>
              </Button>

              <Button
                onClick={() => setVolunteerDriverModalOpen(true)}
                variant="outline"
                className="gap-2 text-xs font-medium border-zinc-300 bg-white dark:bg-zinc-900 dark:border-zinc-700 hover:border-[#E30A17]"
              >
                <Car className="h-4 w-4 text-[#E30A17]" />
                <span>{isTr ? "Genç Şoför Ol (Gönüllü Ulaşım)" : "Volunteer as Youth Driver"}</span>
              </Button>
            </div>
          </div>

          {/* 4 Pillars of Elders Gatherings */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/60">
                <Coffee className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {isTr ? "Kömürlü Semaver Çayı" : "Samovar Tea & Tulip Glasses"}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {isTr
                    ? "İnce belli bardakta gün boyu taze Rize çayı, börek & sarma ikramları."
                    : "Freshly brewed Turkish tea all afternoon with homemade börek and treats."}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                <Car className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {isTr ? "Torun Eli: Ücretsiz Araç" : "Free Youth Carpooling"}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {isTr
                    ? "Araç kullanmayan büyüklerimiz Türk üniversite öğrencileri tarafından evden alınıp bırakılır."
                    : "Non-driving seniors are picked up and returned safely by verified student volunteers."}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {isTr ? "Sağlık & Tansiyon Kontrolü" : "Free Wellness & Vitals Check"}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {isTr
                    ? "Gönüllü hemşirelik öğrencilerimizden ücretsiz tansiyon ve kan şekeri ölçümü."
                    : "Blood pressure and sugar checks by volunteer nursing students."}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {isTr ? "Düz Ayak & Engelsiz Parklar" : "100% Step-Free & Shaded"}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {isTr
                    ? "Tekerlekli sandalye ve yürüteç uyumlu, asansörlü, engelli tuvaletli parklar."
                    : "Accessible pathways, clean restrooms, station lifts, and shady pavilions."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Upcoming Park Picnics */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
              {isTr ? "Yaklaşan Park Piknikleri ve Çay Saatleri" : "Upcoming Seniors Park Picnics & Tea Hours"}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {isTr
                ? "Tüm piknikler ücretsizdir. Katılım sayısına göre semaver ve masa ayarlanmaktadır."
                : "All gatherings are 100% free of charge. RSVPs help us prepare enough hot samovars and folding chairs."}
            </p>
          </div>

          <Link href="/hire-a-student">
            <span className="text-xs font-semibold text-[#E30A17] hover:underline flex items-center gap-1">
              <span>{isTr ? "Yaşlı Bakım & Öğrenci Refakatçisi Bul →" : "Find a Student Senior Companion →"}</span>
            </span>
          </Link>
        </div>

        {/* Picnic Cards Grid */}
        <div className="mt-6 space-y-6">
          {picnics.map((picnic) => {
            const isRsvped = rsvpedIds.has(picnic.id);
            return (
              <article
                key={picnic.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs hover:shadow-md transition-all dark:border-zinc-800/80 dark:bg-zinc-900"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  {/* Left: Park Image & Badge */}
                  <div className="relative md:col-span-4 min-h-[220px] md:min-h-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={picnic.image}
                      alt={isTr ? picnic.titleTr : picnic.titleEn}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex flex-col items-center justify-center rounded-xl bg-white/95 px-3 py-2 text-center shadow-md backdrop-blur-xs border border-white/40 dark:bg-zinc-900/95 dark:border-zinc-800">
                      <span className="text-[10px] font-extrabold tracking-wider text-[#E30A17]">
                        {isTr ? "TARİH" : "DATE"}
                      </span>
                      <span className="text-lg font-black text-zinc-900 dark:text-white leading-none">
                        {picnic.date.slice(8)}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase">
                        {picnic.date.slice(5, 7)} / 2026
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center rounded-full bg-emerald-600/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                        {isTr ? "Ücretsiz Park Buluşması" : "Free Community Picnic"}
                      </span>
                    </div>
                  </div>

                  {/* Right: Details & Traditions */}
                  <div className="p-6 md:col-span-8 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Meta bar */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-200">
                          <Clock className="h-3.5 w-3.5 text-[#E30A17]" />
                          <span>{picnic.time}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium text-cyan-700 dark:text-cyan-400">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{picnic.parkName}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-[#E30A17] transition-colors">
                        {isTr ? picnic.titleTr : picnic.titleEn}
                      </h3>

                      {/* Description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {isTr ? picnic.descriptionTr : picnic.descriptionEn}
                      </p>

                      {/* Accessibility Perks */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {picnic.accessibilityFeatures.map((feat, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          >
                            <ShieldCheck className="h-3 w-3" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>

                      {/* Traditions Box */}
                      <div className="mt-4 rounded-xl bg-red-50/50 p-3.5 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#E30A17] mb-1.5">
                          {isTr ? "Piknikte Neler Var?" : "Gathering Highlights & Traditions"}
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                          {picnic.traditions.map((trad, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#E30A17] font-bold mt-0.5">☕</span>
                              <span>{trad}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-zinc-700 dark:text-zinc-300">
                          <Users className="h-4 w-4 text-[#E30A17]" />
                          <span>
                            {picnic.rsvpCount} {isTr ? "büyük & aile katılıyor" : "elders & families attending"}
                          </span>
                        </div>

                        <a
                          href={picnic.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                          <span>{isTr ? "Yol Tarifi" : "Directions"}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${picnic.contactCoordinator.replace(/[^0-9+]/g, "")}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                          <Phone className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{isTr ? "Koordinatörü Ara" : "Call Coordinator"}</span>
                        </a>

                        {isRsvped ? (
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span>{isTr ? "Katılıyorsunuz" : "You're Attending"}</span>
                          </div>
                        ) : (
                          <Button
                            onClick={() => {
                              setSelectedPicnic(picnic);
                              setRsvpModalOpen(true);
                            }}
                            variant="turkish"
                            size="sm"
                            className="text-xs font-semibold shadow-xs"
                          >
                            <span>{isTr ? "Pikniğe Katıl (Ücretsiz)" : "RSVP Free"}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Essential Bilingual Aged Care & Healthcare Contacts for Turkish Elders */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E30A17]">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {isTr
                  ? "Büyüklerimiz İçin Avustralya Resmi Haklar ve Tercüman Rehberi"
                  : "Essential Australian Rights & Interpreters for Turkish Elders"}
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
              {isTr
                ? "Avustralya'da Yaşayan Türk Emeklilerin Hakları ve Ücretsiz Hizmetler"
                : "Free Interpreters, Home Care & Support for Turkish Seniors in QLD"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isTr
                ? "Avustralya'da İngilizce bilmemek hiçbir kamu hizmetinden mahrum kalmanıza sebep olamaz. Hastanelerde, doktor randevularında ve Centrelink görüşmelerinde hükümet ücretsiz Türkçe tercüman sağlamak zorundadır."
                : "Language barriers should never prevent Turkish elders from accessing top-quality medical care, home cleaning assistance, or pension entitlements in Queensland."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                  <span>TIS National (Ücretsiz Tercüman)</span>
                  <span className="text-[#E30A17] font-mono font-bold">131 450</span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  {isTr
                    ? "7/24 telefonla ücretsiz Türkçe tercüman. 'Turkish please' demeniz yeterlidir."
                    : "Free 24/7 telephone translation for doctors, banks, and government agencies."}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                  <span>My Aged Care (Evde Bakım)</span>
                  <span className="text-[#E30A17] font-mono font-bold">1800 200 422</span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  {isTr
                    ? "Ev temizliği, bahçe bakımı, yürüteç ve yemek yardımı için devlet desteği başvurusu."
                    : "Government-funded Home Care Packages for cleaning, gardening, and mobility aids."}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                  <span>Centrelink Yaşlılık Aylığı</span>
                  <span className="text-[#E30A17] font-mono font-bold">132 300</span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  {isTr
                    ? "Age Pension, indirimli elektrik/ulaşım kartı (Pensioner Concession Card)."
                    : "Age Pension, concession travel cards, and utility subsidies."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Register an Elder */}
      {registerElderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fade-in"
            onClick={() => setRegisterElderModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/50">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {isTr ? "Büyüğümüzü / Anne-Babamızı Kaydedin" : "Register an Elder Family Member"}
                  </h3>
                  <div className="text-[11px] text-zinc-500">
                    {isTr ? "Piknik organizasyonu ve araç desteği için" : "For transport & picnic coordination"}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRegisterElderModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterElder} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isTr ? "Büyüğümüzün Adı Soyadı" : "Elder's Full Name"} <span className="text-[#E30A17]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hasan Yılmaz"
                  value={elderForm.elderName}
                  onChange={(e) => setElderForm({ ...elderForm, elderName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {isTr ? "Yaşı (İsteğe bağlı)" : "Age (Optional)"}
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 72"
                    value={elderForm.age}
                    onChange={(e) => setElderForm({ ...elderForm, age: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {isTr ? "Yaşadığı Bölge / Suburb" : "Suburb / Area"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chermside, Sunnybank"
                    value={elderForm.suburb}
                    onChange={(e) => setElderForm({ ...elderForm, suburb: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={elderForm.needsTransport}
                    onChange={(e) =>
                      setElderForm({ ...elderForm, needsTransport: e.target.checked })
                    }
                    className="rounded border-zinc-300 text-[#E30A17] focus:ring-[#E30A17]"
                  />
                  <span>
                    {isTr
                      ? "Pikniğe gitmek için genç gönüllü şoför araç desteği rica ediyoruz"
                      : "Request volunteer youth driver carpool transport to the park"}
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isTr ? "Özel Durumlar & Notlar" : "Special Notes / Walking Aids"}
                </label>
                <textarea
                  rows={2}
                  placeholder={
                    isTr
                      ? "Örn: Yürüteç kullanıyor, şeker hastası, tavla oynamayı çok sever..."
                      : "e.g. Uses a walker, diabetic, loves playing backgammon..."
                  }
                  value={elderForm.notes}
                  onChange={(e) => setElderForm({ ...elderForm, notes: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isTr ? "Aile İletişim Telefonu (WhatsApp)" : "Family Contact Phone / WhatsApp"}{" "}
                  <span className="text-[#E30A17]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="+61 400 123 456"
                  value={elderForm.familyContact}
                  onChange={(e) =>
                    setElderForm({ ...elderForm, familyContact: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRegisterElderModalOpen(false)}
                  className="text-xs"
                >
                  {isTr ? "İptal" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  variant="turkish"
                  size="sm"
                  disabled={isSubmitting}
                  className="text-xs font-semibold"
                >
                  {isSubmitting ? (isTr ? "Kaydediliyor..." : "Saving...") : (isTr ? "Kaydı Tamamla" : "Complete Registration")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Volunteer Driver */}
      {volunteerDriverModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fade-in"
            onClick={() => setVolunteerDriverModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50">
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {isTr ? "Genç Şoför Gönüllüsü Ol" : "Volunteer as Youth Driver"}
                  </h3>
                  <div className="text-[11px] text-zinc-500">
                    {isTr ? "Büyüklerimizi piknik günleri evden alıp bırakın" : "Help transport seniors on picnic days"}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVolunteerDriverModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterVolunteer} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isTr ? "Adınız Soyadınız" : "Your Full Name"} <span className="text-[#E30A17]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Burak Demir"
                  value={volunteerForm.driverName}
                  onChange={(e) =>
                    setVolunteerForm({ ...volunteerForm, driverName: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isTr ? "Hizmet Verebileceğiniz Bölgeler" : "Suburbs You Can Cover"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. West End, St Lucia, Toowong, Chermside"
                  value={volunteerForm.suburbsCovered}
                  onChange={(e) =>
                    setVolunteerForm({ ...volunteerForm, suburbsCovered: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {isTr ? "Araç Tipi / Koltuk" : "Vehicle Type / Seats"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sedan (4 koltuk)"
                    value={volunteerForm.vehicleType}
                    onChange={(e) =>
                      setVolunteerForm({ ...volunteerForm, vehicleType: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {isTr ? "WhatsApp Numaranız" : "WhatsApp Number"} <span className="text-[#E30A17]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+61 400 123 456"
                    value={volunteerForm.contactWhatsApp}
                    onChange={(e) =>
                      setVolunteerForm({ ...volunteerForm, contactWhatsApp: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setVolunteerDriverModalOpen(false)}
                  className="text-xs"
                >
                  {isTr ? "İptal" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  variant="turkish"
                  size="sm"
                  disabled={isSubmitting}
                  className="text-xs font-semibold"
                >
                  {isSubmitting ? (isTr ? "Kaydediliyor..." : "Saving...") : (isTr ? "Gönüllü Ol" : "Register as Driver")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: RSVP for Picnic */}
      {rsvpModalOpen && selectedPicnic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fade-in"
            onClick={() => setRsvpModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#E30A17] dark:bg-red-950/50">
                  <Coffee className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {isTr ? "Pikniğe Katılım (Ücretsiz)" : "RSVP for Senior Picnic"}
                  </h3>
                  <div className="text-[11px] text-zinc-500">
                    {isTr ? selectedPicnic.titleTr : selectedPicnic.titleEn}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRsvpModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRsvpPicnic} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isTr ? "Katılımcı / Aile Adı" : "Your Name / Family Name"} <span className="text-[#E30A17]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yılmaz Ailesi (3 kişi)"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {isTr ? "Telefon Numarası" : "Phone Number"}
                </label>
                <input
                  type="text"
                  placeholder="+61 400 000 000"
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-xs focus:ring-2 focus:ring-[#E30A17] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRsvpModalOpen(false)}
                  className="text-xs"
                >
                  {isTr ? "İptal" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  variant="turkish"
                  size="sm"
                  disabled={isSubmitting}
                  className="text-xs font-semibold"
                >
                  {isSubmitting ? (isTr ? "Onaylanıyor..." : "Confirming...") : (isTr ? "Semaverde Çayımı Ayır" : "Confirm RSVP")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

