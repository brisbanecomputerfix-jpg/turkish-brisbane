"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/app-context";
import { BusinessItem } from "@/components/directory-section";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Plus,
  ShieldCheck,
  Stethoscope,
  Scale,
  UtensilsCrossed,
  Wrench,
  Laptop,
  GraduationCap,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Medical",
  "Legal",
  "Food & Groceries",
  "Tech Support & IT",
  "Trades",
  "Education",
];

const SUBURBS = [
  "All Suburbs",
  "Brisbane CBD",
  "South Bank",
  "Sunnybank",
  "Toowong",
  "Chermside",
  "Indooroopilly",
  "Gold Coast",
  "Sunshine Coast",
];

const CATEGORY_CARDS = [
  {
    name: "Medical & Health",
    filter: "Medical",
    count: "Bilingual GPs & Clinics",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    icon: Stethoscope,
    description: "Turkish-speaking doctors, dentists, and health specialists in Brisbane.",
  },
  {
    name: "Legal & Migration",
    filter: "Legal",
    count: "Solicitors & Agents",
    image:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    icon: Scale,
    description: "Registered migration agents, solicitors, and conveyancing experts.",
  },
  {
    name: "Food & Groceries",
    filter: "Food & Groceries",
    count: "Restaurants & Markets",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    icon: UtensilsCrossed,
    description: "Woodfired pide, halal butchers, Turkish bakeries, and cafes.",
  },
  {
    name: "Trades & Services",
    filter: "Trades",
    count: "Electricians & Painters",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    icon: Wrench,
    description: "Licensed electricians, builders, painters, and maintenance.",
  },
  {
    name: "Tech & IT Solutions",
    filter: "Tech Support & IT",
    count: "Cloud & Dev Services",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    icon: Laptop,
    description: "Small business cybersecurity, custom web development, and cloud.",
  },
  {
    name: "Education & Language",
    filter: "Education",
    count: "Turkish School & Tutoring",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    icon: GraduationCap,
    description: "Weekend Turkish language classes for kids and adult learners.",
  },
];

export function DirectoryClient({ initialBusinesses }: { initialBusinesses: BusinessItem[] }) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const { setSubmitBusinessOpen } = useApp();

  const [selectedCategory, setSelectedCategory] = React.useState<string>(initialCat);
  const [selectedSuburb, setSelectedSuburb] = React.useState<string>("All Suburbs");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  React.useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredBusinesses = React.useMemo(() => {
    return initialBusinesses.filter((b) => {
      const matchesCategory =
        selectedCategory === "All" || b.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSuburb =
        selectedSuburb === "All Suburbs" ||
        b.suburb.toLowerCase().includes(selectedSuburb.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        b.name.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.suburb.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query);

      return matchesCategory && matchesSuburb && matchesQuery;
    });
  }, [initialBusinesses, selectedCategory, selectedSuburb, searchQuery]);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <ShieldCheck className="h-4 w-4 text-[#E30A17]" />
              <span>Australian Business Register (ABR) Verified</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Queensland Turkish Directory
            </h1>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Find trusted, bilingual doctors, solicitors, tradespeople, restaurants, and IT professionals operating across Greater Brisbane, Gold Coast, and Sunshine Coast.
            </p>
          </div>

          <Button
            onClick={() => setSubmitBusinessOpen(true)}
            variant="turkish"
            size="lg"
            className="gap-2 shadow-xs shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>List Your Business (Free)</span>
          </Button>
        </div>

        {/* Visual Category Cards Carousel / Grid */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Featured Sectors
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORY_CARDS.map((card) => {
              const Icon = card.icon;
              const isSelected = selectedCategory === card.filter;
              return (
                <button
                  key={card.name}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? "All" : card.filter)}
                  className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#E30A17] ring-2 ring-[#E30A17] shadow-md"
                      : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  <div className="relative h-36 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-bold">{card.name}</span>
                      </div>
                      <span className="text-[11px] text-zinc-200 font-medium">
                        {card.count}
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                      {card.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Suburb Filter Controls */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by business name, medical specialty, pide, suburb..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#E30A17] focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <select
                value={selectedSuburb}
                onChange={(e) => setSelectedSuburb(e.target.value)}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-xs font-medium text-zinc-700 focus:border-[#E30A17] focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 shrink-0"
              >
                {SUBURBS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {(selectedCategory !== "All" || selectedSuburb !== "All Suburbs" || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedSuburb("All Suburbs");
                    setSearchQuery("");
                  }}
                  className="rounded-xl px-3 py-2.5 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium whitespace-nowrap"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/80">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#E30A17] text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Verified Note */}
        <div className="mt-8 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Showing <strong className="text-zinc-900 dark:text-zinc-100">{filteredBusinesses.length}</strong> verified businesses
          </span>
          <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Community Vetted & Active</span>
          </span>
        </div>

        {/* Business Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((b) => (
            <div
              key={b.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {b.name}
                  </h3>
                  <span className="text-[10px] font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-zinc-600 dark:text-zinc-300 shrink-0">
                    {b.category}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{b.suburb}, QLD</span>
                  </div>
                  {b.isApproved && (
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <p className="mt-3.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <a
                  href={`tel:${b.phone.replace(/\s+/g, "")}`}
                  className="font-mono font-medium text-zinc-800 dark:text-zinc-200 hover:text-[#E30A17] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{b.phone}</span>
                </a>

                {b.website ? (
                  <a
                    href={b.website.startsWith("http") ? b.website : `https://${b.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#E30A17] hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Website</span>
                  </a>
                ) : (
                  <span className="text-zinc-400 text-[11px]">Direct Phone Only</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="mt-12 text-center py-16 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <Search className="h-8 w-8 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              No businesses found
            </h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
              We couldn't find any listing matching your filters. Try clearing your search query or submit a new listing.
            </p>
            <Button
              onClick={() => setSubmitBusinessOpen(true)}
              variant="outline"
              size="sm"
              className="mt-4 gap-1.5 text-xs"
            >
              <Plus className="h-3.5 w-3.5 text-[#E30A17]" />
              <span>List a Business in this Category</span>
            </Button>
          </div>
        )}

        {/* E-E-A-T Editorial Standards Callout */}
        <div className="mt-16 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/60 text-[#E30A17]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Our Verification & Trust Standards (Google E-E-A-T Compliant)
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every business listed on QLD Turks is independently reviewed by our volunteer moderation team. We check Australian Business Numbers (ABN), professional qualifications (e.g., AHPRA registration for medical practitioners, OMARA for migration agents, QBCC for tradespeople), and community references to prevent scammers and guarantee reliable Turkish-speaking service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
