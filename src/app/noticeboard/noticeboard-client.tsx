"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/app-context";
import { NoticeItem } from "@/components/noticeboard-section";
import { Button } from "@/components/ui/button";
import {
  BellRing,
  Plus,
  Coffee,
  Briefcase,
  Home,
  MessageSquare,
  Copy,
  Check,
  ShieldAlert,
  Calendar,
  Sparkles,
} from "lucide-react";

const NOTICE_TYPES = [
  { id: "all", label: "All Notices", icon: BellRing },
  { id: "bulk_order", label: "Bulk Orders & Imports", icon: Coffee },
  { id: "housing", label: "Housing & Rooms", icon: Home },
  { id: "job", label: "Jobs & Careers", icon: Briefcase },
  { id: "general", label: "Community & Events", icon: MessageSquare },
];

export function NoticeboardClient({ initialNotices }: { initialNotices: NoticeItem[] }) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const { setSubmitNoticeOpen } = useApp();

  const [selectedType, setSelectedType] = React.useState<string>(initialType);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const t = searchParams.get("type");
    if (t) setSelectedType(t);
  }, [searchParams]);

  const handleCopyContact = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredNotices = React.useMemo(() => {
    if (selectedType === "all") return initialNotices;
    if (selectedType === "housing") {
      return initialNotices.filter(
        (n) =>
          n.type === "general" &&
          (n.title.toLowerCase().includes("room") ||
            n.title.toLowerCase().includes("house") ||
            n.content.toLowerCase().includes("rent") ||
            n.content.toLowerCase().includes("room"))
      );
    }
    return initialNotices.filter((n) => n.type === selectedType);
  }, [initialNotices, selectedType]);

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "bulk_order":
        return "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900";
      case "job":
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-2xl">
            <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] sm:text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <BellRing className="h-3.5 w-3.5 text-[#E30A17] shrink-0" />
              <span>Community Bulletin & Mutual Aid</span>
            </div>
            <h1 className="mt-4 text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 break-words">
              Community Noticeboard
            </h1>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Post and discover collective bulk imports (fresh Kurukahveci Turkish coffee, olive oil), trusted student room rentals, job opportunities, and upcoming Turkish community breakfasts in Queensland.
            </p>
          </div>

          <Button
            onClick={() => setSubmitNoticeOpen(true)}
            variant="turkish"
            size="lg"
            className="gap-2 shadow-xs shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Post a Notice (Free)</span>
          </Button>
        </div>

        {/* Visual Highlights Banner */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                <Coffee className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Bulk Freight Imports
                </h2>
                <p className="text-xs text-zinc-500">Save 40% on Turkish coffee & pantry pallets</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Safe Student Housing
                </h2>
                <p className="text-xs text-zinc-500">Room rentals near UQ, QUT, Griffith & Gold Coast</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Bilingual Hiring
                </h2>
                <p className="text-xs text-zinc-500">Accountants, baristas, trades & IT roles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
          {NOTICE_TYPES.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedType(t.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[#E30A17] text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Notices Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getBadgeStyle(
                      n.type
                    )}`}
                  >
                    {n.type === "bulk_order"
                      ? "Bulk Order"
                      : n.type === "job"
                      ? "Job / Housing"
                      : "Community"}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(n.createdAt).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {n.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {n.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[11px] text-zinc-400 font-medium block">CONTACT INFO:</span>
                  <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
                    {n.contactInfo}
                  </span>
                </div>

                <Button
                  onClick={() => handleCopyContact(n.id, n.contactInfo)}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  {copiedId === n.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Community Trust & Anti-Scam Notice (E-E-A-T) */}
        <div className="mt-16 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-6 sm:p-8 dark:border-amber-900/50 dark:bg-amber-950/20">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                Community Safety & Scammer Protection Guidelines
              </h3>
              <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
                Always verify accommodations in person or via live video before transferring bond deposits. For bulk orders, payments are managed through trusted community organizers with invoice receipts. Report any suspicious listings directly to the moderators via WhatsApp or our Contact page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

