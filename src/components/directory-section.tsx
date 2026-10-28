"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  PlusCircle,
  CheckCircle2,
  Building2,
  Stethoscope,
  Scale,
  UtensilsCrossed,
  Laptop,
  Wrench,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface BusinessItem {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  website: string | null;
  suburb: string;
  isApproved: boolean;
  createdAt: string | Date;
}

interface DirectorySectionProps {
  initialBusinesses: BusinessItem[];
  onOpenSubmitBusiness: () => void;
}

const CATEGORIES = [
  { name: "All", icon: Sparkles },
  { name: "Medical", icon: Stethoscope },
  { name: "Legal", icon: Scale },
  { name: "Food & Groceries", icon: UtensilsCrossed },
  { name: "Tech Support & IT", icon: Laptop },
  { name: "Trades", icon: Wrench },
  { name: "Education", icon: GraduationCap },
];

export function DirectorySection({
  initialBusinesses,
  onOpenSubmitBusiness,
}: DirectorySectionProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const filteredBusinesses = React.useMemo(() => {
    return initialBusinesses.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.suburb.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialBusinesses, searchQuery, selectedCategory]);

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Medical":
        return {
          badge: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300",
          iconColor: "text-red-600",
        };
      case "Legal":
        return {
          badge: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300",
          iconColor: "text-sky-600",
        };
      case "Food & Groceries":
        return {
          badge: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          iconColor: "text-amber-600",
        };
      case "Tech Support & IT":
        return {
          badge: "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300",
          iconColor: "text-teal-600",
        };
      case "Trades":
        return {
          badge: "bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-800 dark:text-stone-300",
          iconColor: "text-stone-600",
        };
      case "Education":
        return {
          badge: "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300",
          iconColor: "text-indigo-600",
        };
      default:
        return {
          badge: "bg-stone-50 text-stone-800 border-stone-200",
          iconColor: "text-teal-600",
        };
    }
  };

  return (
    <section id="directory" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            <Building2 className="h-4 w-4" />
            <span>Doğrulanmış Türk İş Rehberi</span>
          </div>
          <h2 className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-stone-900 dark:text-white">
            Turkish Businesses in Queensland
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Find vetted Turkish-speaking medical doctors, solicitors, cafes, registered electricians, and IT specialists across Greater Brisbane, Gold Coast, and Sunshine Coast.
          </p>
        </div>

        <Button
          onClick={onOpenSubmitBusiness}
          variant="turkish"
          className="gap-2 shrink-0 self-start md:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>+ Add Your Business</span>
        </Button>
      </div>

      {/* Modern Search & Category Filter Controls */}
      <div className="mt-8 space-y-5">
        {/* Search Input Box */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-600 pointer-events-none" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by business name, suburb (e.g. South Bank, Indooroopilly), service..."
            className="pl-12 pr-10 h-12 text-sm sm:text-base rounded-xl border-stone-200 focus:border-teal-500 focus:ring-teal-500/20 shadow-sm bg-white dark:bg-stone-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            const count =
              cat.name === "All"
                ? initialBusinesses.length
                : initialBusinesses.filter((b) => b.category === cat.name).length;

            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/20 ring-1 ring-teal-400/40"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50/40 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800 dark:hover:bg-stone-800"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-white" : "text-stone-500"}`} />
                <span>{cat.name}</span>
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="mt-6 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <span>
          Showing <strong>{filteredBusinesses.length}</strong> {filteredBusinesses.length === 1 ? "business" : "businesses"}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
      </div>

      {/* Directory Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-stone-50/60 p-12 text-center dark:border-stone-800 dark:bg-stone-900/30">
          <Building2 className="mx-auto h-12 w-12 text-stone-300 dark:text-stone-600" />
          <h3 className="mt-4 text-base font-bold text-stone-800 dark:text-stone-200">
            No businesses found matching your criteria
          </h3>
          <p className="mt-1 text-sm text-stone-500 max-w-md mx-auto">
            Try adjusting your search terms or filter, or be the first to list a Turkish-speaking service in this category!
          </p>
          <div className="mt-6">
            <Button
              variant="turquoise"
              size="sm"
              onClick={onOpenSubmitBusiness}
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Submit a Business Now</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((item) => {
            const theme = getCategoryTheme(item.category);
            const isCopied = copiedId === item.id;

            return (
              <Card
                key={item.id}
                className="flex flex-col justify-between overflow-hidden border-stone-200/90 dark:border-stone-800/90 hover:border-teal-300 dark:hover:border-teal-700/60 transition-all duration-300"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[11px] font-bold ${theme.badge}`}>
                        {item.category}
                      </span>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 rounded-md">
                        <MapPin className="h-3 w-3 text-red-600" />
                        <span>{item.suburb}</span>
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg font-extrabold text-stone-900 dark:text-white group-hover:text-teal-600 transition-colors">
                        {item.name}
                      </CardTitle>
                      <span className="shrink-0 flex items-center gap-1 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800 px-2 py-0.5 text-[10px] font-bold" title="Community Verified">
                        <CheckCircle2 className="h-3 w-3 text-teal-600" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </div>

                {/* Footer with Direct Action Buttons */}
                <CardFooter className="pt-3 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <a
                      href={`tel:${item.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800 px-3 py-1.5 text-xs font-bold hover:bg-teal-100 transition-colors flex-1 justify-center"
                    >
                      <Phone className="h-3.5 w-3.5 text-teal-600" />
                      <span className="truncate">{item.phone}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyPhone(item.id, item.phone)}
                      className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-500 hover:text-stone-800 dark:border-stone-800 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                      title="Copy Phone Number"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  {item.website && (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white dark:bg-stone-800 dark:border-stone-700 px-2.5 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-red-600 hover:border-red-200 transition-colors shrink-0"
                      title="Visit Website"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Web</span>
                      <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                    </a>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
