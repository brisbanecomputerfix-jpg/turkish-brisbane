"use client";

import * as React from "react";
import {
  Coffee,
  Briefcase,
  Bell,
  MessageSquare,
  Plus,
  Calendar,
  UserCheck,
  Copy,
  Check,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface NoticeItem {
  id: string;
  title: string;
  type: string; // bulk_order, job, general
  content: string;
  contactInfo: string;
  createdAt: string | Date;
}

interface NoticeboardSectionProps {
  initialNotices: NoticeItem[];
  onOpenSubmitNotice: () => void;
}

export function NoticeboardSection({
  initialNotices,
  onOpenSubmitNotice,
}: NoticeboardSectionProps) {
  const [filterType, setFilterType] = React.useState("all");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const filteredNotices = React.useMemo(() => {
    if (filterType === "all") return initialNotices;
    return initialNotices.filter((n) => n.type === filterType);
  }, [initialNotices, filterType]);

  const counts = React.useMemo(() => {
    return {
      all: initialNotices.length,
      bulk_order: initialNotices.filter((n) => n.type === "bulk_order").length,
      job: initialNotices.filter((n) => n.type === "job").length,
      general: initialNotices.filter((n) => n.type === "general").length,
    };
  }, [initialNotices]);

  const handleCopyContact = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getNoticeTheme = (type: string) => {
    switch (type) {
      case "bulk_order":
        return {
          label: "Bulk Order / Toplu Sipariş",
          badgeVariant: "turquoise" as const,
          icon: Coffee,
          accentBar: "from-teal-500 to-cyan-500",
          cardBorder: "hover:border-teal-400/50 dark:hover:border-teal-500/40",
          iconBg: "bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300",
        };
      case "job":
        return {
          label: "Job & Housing / İlan",
          badgeVariant: "emerald" as const,
          icon: Briefcase,
          accentBar: "from-emerald-500 to-teal-600",
          cardBorder: "hover:border-emerald-400/50 dark:hover:border-emerald-500/40",
          iconBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
        };
      default:
        return {
          label: "Community / Duyuru",
          badgeVariant: "red" as const,
          icon: Bell,
          accentBar: "from-red-600 to-rose-600",
          cardBorder: "hover:border-red-400/50 dark:hover:border-red-500/40",
          iconBg: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
        };
    }
  };

  const formatDate = (dateInput: string | Date) => {
    try {
      const d = new Date(dateInput);
      return d.toLocaleDateString("en-AU", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "Recent";
    }
  };

  return (
    <section
      id="noticeboard"
      className="relative py-20 sm:py-24 bg-stone-50/80 dark:bg-stone-900/30 border-y border-stone-200/80 dark:border-stone-800 scroll-mt-16 overflow-hidden"
    >
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/90 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/90 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/50 dark:text-teal-300 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
              <span>Direct Community Board • Topluluk Panosu</span>
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
              Notices, Bulk Orders &{" "}
              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-teal-600 bg-clip-text text-transparent">
                Classifieds
              </span>
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Import group buys (Kurukahveci Mehmet Efendi, Aegean olive oil, Turkish tea), room rentals, job offers, and local Queensland gatherings.
            </p>
          </div>

          <Button
            onClick={onOpenSubmitNotice}
            variant="turquoise"
            className="gap-2 shrink-0 shadow-lg shadow-teal-500/20 active:scale-95 transition-transform"
          >
            <Plus className="h-4 w-4" />
            Post a Notice (Duyuru Ekle)
          </Button>
        </div>

        {/* Filter Pills with Counters */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setFilterType("all")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
              filterType === "all"
                ? "bg-gradient-to-r from-stone-900 to-stone-800 text-white shadow-md dark:from-stone-100 dark:to-stone-200 dark:text-stone-900"
                : "bg-white text-stone-700 border border-stone-200/90 hover:bg-stone-100/80 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800"
            }`}
          >
            All Notices
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                filterType === "all"
                  ? "bg-stone-700 text-stone-100 dark:bg-stone-300 dark:text-stone-900"
                  : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setFilterType("bulk_order")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
              filterType === "bulk_order"
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/25"
                : "bg-white text-stone-700 border border-stone-200/90 hover:border-teal-400 hover:text-teal-700 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800"
            }`}
          >
            <Coffee className="h-3.5 w-3.5 text-teal-500" />
            Bulk Orders & Imports
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                filterType === "bulk_order"
                  ? "bg-teal-700/60 text-white"
                  : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              {counts.bulk_order}
            </span>
          </button>

          <button
            onClick={() => setFilterType("job")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
              filterType === "job"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25"
                : "bg-white text-stone-700 border border-stone-200/90 hover:border-emerald-400 hover:text-emerald-700 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800"
            }`}
          >
            <Briefcase className="h-3.5 w-3.5 text-emerald-500" />
            Jobs & Housing
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                filterType === "job"
                  ? "bg-emerald-700/60 text-white"
                  : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              {counts.job}
            </span>
          </button>

          <button
            onClick={() => setFilterType("general")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
              filterType === "general"
                ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/25"
                : "bg-white text-stone-700 border border-stone-200/90 hover:border-red-400 hover:text-red-700 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800"
            }`}
          >
            <Bell className="h-3.5 w-3.5 text-red-500" />
            Community & Events
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                filterType === "general"
                  ? "bg-red-700/60 text-white"
                  : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              {counts.general}
            </span>
          </button>
        </div>

        {/* Bento Notice Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotices.map((notice) => {
            const theme = getNoticeTheme(notice.type);
            const IconComponent = theme.icon;
            const isPhone = notice.contactInfo.match(/(\+?\d[\d\s-]{7,})/);
            const isEmail = notice.contactInfo.includes("@");

            return (
              <Card
                key={notice.id}
                className={`relative flex flex-col justify-between overflow-hidden border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/90 shadow-sm transition-all duration-300 ${theme.cardBorder}`}
              >
                {/* Top ambient color bar indicating notice type */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.accentBar}`} />

                <CardHeader className="pt-6 pb-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <Badge variant={theme.badgeVariant} className="gap-1.5 shadow-xs">
                      <IconComponent className="h-3 w-3" />
                      {theme.label}
                    </Badge>

                    <span className="flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(notice.createdAt)}
                    </span>
                  </div>

                  <CardTitle className="mt-3 text-lg font-bold text-stone-900 dark:text-white leading-snug tracking-tight">
                    {notice.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                    {notice.content}
                  </p>
                </CardContent>

                <CardFooter className="pt-3.5 pb-3.5 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-900/60 rounded-b-2xl">
                  <div className="flex items-center justify-between gap-3 w-full">
                    {/* Contact info presentation */}
                    <div className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300 min-w-0">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-md ${theme.iconBg} shrink-0`}>
                        {isEmail ? (
                          <Mail className="h-3.5 w-3.5" />
                        ) : isPhone ? (
                          <Phone className="h-3.5 w-3.5" />
                        ) : (
                          <UserCheck className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 block leading-tight">
                          Contact
                        </span>
                        <span className="truncate font-mono text-xs font-semibold text-stone-800 dark:text-stone-200 select-all block">
                          {notice.contactInfo}
                        </span>
                      </div>
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={() => handleCopyContact(notice.id, notice.contactInfo)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                        copiedId === notice.id
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                          : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 hover:text-stone-900 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
                      }`}
                      title="Copy contact details"
                    >
                      {copiedId === notice.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-stone-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredNotices.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
              <Coffee className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-stone-900 dark:text-white">
              No notices under this filter
            </h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              Be the first to create an announcement or initiate a bulk food import order for Queensland.
            </p>
            <Button
              onClick={onOpenSubmitNotice}
              variant="turquoise"
              size="sm"
              className="mt-4 gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Post Notice Now
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
