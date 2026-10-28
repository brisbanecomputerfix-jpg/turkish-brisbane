"use client";

import * as React from "react";
import { Plus, Calendar, Copy, Check, MessageSquare } from "lucide-react";
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

  const handleCopyContact = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getNoticeBadge = (type: string) => {
    switch (type) {
      case "bulk_order":
        return { label: "Bulk Order", style: "bg-amber-50 text-amber-800 border-amber-200/80" };
      case "job":
        return { label: "Job / Housing", style: "bg-emerald-50 text-emerald-800 border-emerald-200/80" };
      default:
        return { label: "Community", style: "bg-zinc-100 text-zinc-700 border-zinc-200" };
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
      className="py-16 sm:py-20 border-t border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/30 dark:border-zinc-800 scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Community Noticeboard
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Bulk imports (Turkish coffee, olive oil), room rentals, job leads, and local announcements.
            </p>
          </div>

          <Button
            onClick={onOpenSubmitNotice}
            variant="outline"
            size="sm"
            className="gap-1.5 self-start md:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Post a Notice</span>
          </Button>
        </div>

        {/* Minimal Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterType === "all"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            All Notices ({initialNotices.length})
          </button>
          <button
            onClick={() => setFilterType("bulk_order")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterType === "bulk_order"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            Bulk Orders & Imports
          </button>
          <button
            onClick={() => setFilterType("job")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterType === "job"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            Jobs & Housing
          </button>
          <button
            onClick={() => setFilterType("general")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterType === "general"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            General & Events
          </button>
        </div>

        {/* Notices Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredNotices.map((notice) => {
            const badge = getNoticeBadge(notice.type);

            return (
              <div
                key={notice.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${badge.style}`}
                    >
                      {badge.label}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <Calendar className="h-3 w-3" />
                      {formatDate(notice.createdAt)}
                    </span>
                  </div>

                  <h3 className="mt-3 font-semibold text-base text-zinc-900 dark:text-zinc-100 leading-snug">
                    {notice.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {notice.content}
                  </p>
                </div>

                {/* Footer / Contact */}
                <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <div className="text-zinc-600 dark:text-zinc-400 truncate mr-3">
                    <span className="text-[11px] text-zinc-400 uppercase font-medium mr-1.5">
                      Contact:
                    </span>
                    <span className="font-mono text-xs font-medium text-zinc-800 dark:text-zinc-200 select-all">
                      {notice.contactInfo}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyContact(notice.id, notice.contactInfo)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedId === notice.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredNotices.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-10 text-center bg-white dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              No notices currently posted under this category.
            </p>
            <Button
              onClick={onOpenSubmitNotice}
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Post the First Notice
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
