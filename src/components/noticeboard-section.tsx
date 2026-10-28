"use client";

import * as React from "react";
import { Coffee, Briefcase, Bell, MessageSquare, Plus, Calendar, UserCheck } from "lucide-react";
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

  const filteredNotices = React.useMemo(() => {
    if (filterType === "all") return initialNotices;
    return initialNotices.filter((n) => n.type === filterType);
  }, [initialNotices, filterType]);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "bulk_order":
        return { label: "Bulk Order / Toplu Sipariş", variant: "amber" as const, icon: Coffee };
      case "job":
        return { label: "Job & Housing / İlan", variant: "emerald" as const, icon: Briefcase };
      default:
        return { label: "Community / Duyuru", variant: "blue" as const, icon: Bell };
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
    <section id="noticeboard" className="py-16 sm:py-20 bg-stone-50/70 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <MessageSquare className="h-4 w-4" />
              Community Noticeboard
            </div>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
              Notices, Bulk Orders & Classifieds
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl">
              Direct community announcements: import group buys (Turkish coffee, olive oil), room rentals, job offers, and weekend family get-togethers.
            </p>
          </div>

          <Button
            onClick={onOpenSubmitNotice}
            variant="outline"
            className="gap-2 shrink-0 border-stone-300 dark:border-stone-700 hover:bg-white"
          >
            <Plus className="h-4 w-4 text-emerald-600" />
            Post a Notice
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              filterType === "all"
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
            }`}
          >
            All Notices ({initialNotices.length})
          </button>
          <button
            onClick={() => setFilterType("bulk_order")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              filterType === "bulk_order"
                ? "bg-amber-600 text-white"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
            }`}
          >
            ☕ Bulk Orders & Imports
          </button>
          <button
            onClick={() => setFilterType("job")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              filterType === "job"
                ? "bg-emerald-600 text-white"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
            }`}
          >
            💼 Jobs & Rentals
          </button>
          <button
            onClick={() => setFilterType("general")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              filterType === "general"
                ? "bg-sky-600 text-white"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
            }`}
          >
            📢 General & Events
          </button>
        </div>

        {/* Notices Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotices.map((notice) => {
            const badgeMeta = getTypeBadge(notice.type);
            const IconComponent = badgeMeta.icon;

            return (
              <Card
                key={notice.id}
                className="flex flex-col justify-between border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={badgeMeta.variant} className="gap-1.5">
                      <IconComponent className="h-3 w-3" />
                      {badgeMeta.label}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-stone-400">
                      <Calendar className="h-3 w-3" />
                      {formatDate(notice.createdAt)}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-base font-bold text-stone-900 dark:text-white leading-snug">
                    {notice.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                    {notice.content}
                  </p>
                </CardContent>

                <CardFooter className="pt-3 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/50 rounded-b-2xl">
                  <div className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300 w-full overflow-hidden">
                    <UserCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-stone-900 dark:text-white shrink-0">
                      Contact:
                    </span>
                    <span className="truncate font-mono text-[11px] text-stone-600 dark:text-stone-300 select-all">
                      {notice.contactInfo}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredNotices.length === 0 && (
          <div className="mt-8 text-center p-8 border border-dashed rounded-xl bg-white dark:bg-stone-900">
            <p className="text-sm text-stone-500">No notices under this filter right now.</p>
          </div>
        )}
      </div>
    </section>
  );
}

