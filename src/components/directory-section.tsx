"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Plus,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Map as MapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app-context";

export interface BusinessItem {
  id: string;
  name: string;
  category: string;
  suburb: string;
  phone: string;
  website: string | null;
  description: string;
  isApproved: boolean;
}

interface DirectorySectionProps {
  initialBusinesses: BusinessItem[];
  onOpenSubmitBusiness: () => void;
}

const CATEGORIES = [
  "All",
  "Food & Groceries",
  "Medical",
  "Legal",
  "Tech Support & IT",
  "Trades",
  "Education",
];

const CATEGORY_TR_MAP: Record<string, string> = {
  All: "Tümü",
  "Food & Groceries": "Market & Restoran",
  Medical: "Sağlık & Tıp",
  Legal: "Hukuk & Göçmenlik",
  "Tech Support & IT": "Bilişim & IT",
  Trades: "Ustalar & Tamirat",
  Education: "Eğitim & Dersler",
};

export function DirectorySection({
  initialBusinesses,
  onOpenSubmitBusiness,
}: DirectorySectionProps) {
  const { language } = useApp();
  const isTr = language === "tr";

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const filteredBusinesses = React.useMemo(() => {
    return initialBusinesses.filter((b) => {
      const matchesCategory =
        selectedCategory === "All" || b.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.suburb.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialBusinesses, selectedCategory, searchQuery]);

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard?.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="directory" className="py-16 sm:py-20 scroll-mt-16 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {isTr ? "Doğrulanmış İşletme Rehberi" : "Verified Business Directory"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {isTr
                ? "Queensland genelinde Türkçe konuşan profesyoneller, hizmetler ve işletmeler."
                : "Turkish-speaking professionals, services, and shops across Queensland."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <Link
              href="/directory/map"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:border-[#E30A17] hover:text-[#E30A17] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 shadow-2xs transition-colors shrink-0"
            >
              <MapIcon className="h-3.5 w-3.5 text-[#E30A17]" />
              <span>{isTr ? "İnteraktif Harita" : "Interactive Map"}</span>
            </Link>
            <Button
              onClick={onOpenSubmitBusiness}
              variant="outline"
              size="sm"
              className="gap-1.5 shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>{isTr ? "İşletmenizi Ekleyin" : "List Your Business"}</span>
            </Button>
          </div>
        </div>

        {/* Search Bar & Filters */}
        <div className="mt-6 space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTr
                  ? "İsim, uzmanlık veya bölgeye göre ara (örn. Doktor, Helal, South Bank)..."
                  : "Search by name, specialty, or suburb (e.g. Doctor, Halal, South Bank)..."
              }
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-700"
            />
          </div>

          {/* Minimal Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All"
                  ? initialBusinesses.length
                  : initialBusinesses.filter((b) => b.category === category).length;

              const label = isTr ? CATEGORY_TR_MAP[category] || category : category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-[10px] font-semibold ${
                      isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 text-xs text-zinc-500 font-medium">
          {isTr
            ? `${filteredBusinesses.length} işletme gösteriliyor`
            : `Showing ${filteredBusinesses.length} ${
                filteredBusinesses.length === 1 ? "listing" : "listings"
              }`}
        </div>

        {/* Business Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBusinesses.map((b) => (
            <div
              key={b.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                {/* Header: Title + Category */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 leading-snug">
                    {b.name}
                  </h3>
                  <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {b.category}
                  </span>
                </div>

                {/* Suburb */}
                <div className="mt-2 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                  <span>{b.suburb}, QLD</span>
                  <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#c40813]">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 line-clamp-3">
                  {b.description}
                </p>
              </div>

              {/* Card Footer: Phone + Actions */}
              <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <a
                  href={`tel:${b.phone}`}
                  className="font-mono font-medium text-zinc-800 dark:text-zinc-200 hover:text-[#E30A17] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{b.phone}</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyPhone(b.id, b.phone)}
                    className="p-1.5 rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
                    title="Copy phone"
                    aria-label="Copy phone"
                  >
                    {copiedId === b.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {b.website && (
                    <a
                      href={b.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700 hover:text-[#E30A17] transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBusinesses.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center bg-zinc-50/50 dark:bg-zinc-900/50">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              No businesses found matching your criteria.
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Try searching a different keyword or view all categories.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
