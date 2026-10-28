"use client";

import * as React from "react";
import { Search, MapPin, Phone, Globe, PlusCircle, CheckCircle2, Building, Filter } from "lucide-react";
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
  "All",
  "Medical",
  "Legal",
  "Food & Groceries",
  "Tech Support & IT",
  "Trades",
  "Education",
];

export function DirectorySection({
  initialBusinesses,
  onOpenSubmitBusiness,
}: DirectorySectionProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

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

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Medical":
        return "red";
      case "Legal":
        return "blue";
      case "Food & Groceries":
        return "amber";
      case "Tech Support & IT":
        return "emerald";
      case "Trades":
        return "secondary";
      case "Education":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <section id="directory" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
            <Building className="h-4 w-4" />
            Verified Local Directory
          </div>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            Turkish Businesses in Brisbane
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl">
            Find Turkish-speaking doctors, solicitors, restaurants, builders, and specialists across Queensland.
          </p>
        </div>

        <Button
          onClick={onOpenSubmitBusiness}
          className="gap-2 shrink-0 bg-red-700 hover:bg-red-800"
        >
          <PlusCircle className="h-4 w-4" />
          List Your Business
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
          <Input
            type="text"
            placeholder="Search by business name, keyword, or suburb (e.g. South Bank, Sunnybank, Solicitor)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 text-base rounded-xl shadow-sm border-stone-300 dark:border-stone-700 focus-visible:ring-red-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 hover:text-stone-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-red-700 text-white shadow-sm"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
        <span>
          Showing <strong>{filteredBusinesses.length}</strong> {filteredBusinesses.length === 1 ? "business" : "businesses"}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {filteredBusinesses.length === 0 && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-red-700 dark:text-red-400 hover:underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Business Cards Grid */}
      {filteredBusinesses.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <Card
              key={biz.id}
              className="flex flex-col justify-between hover:border-red-300 dark:hover:border-red-900/60 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={getCategoryBadgeVariant(biz.category)}>
                    {biz.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md">
                    <MapPin className="h-3 w-3 text-red-600" />
                    {biz.suburb}
                  </span>
                </div>
                <CardTitle className="mt-2 text-lg font-bold hover:text-red-700 transition-colors">
                  {biz.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 pb-4">
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {biz.description}
                </p>
              </CardContent>

              <CardFooter className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-col gap-2">
                <div className="flex items-center justify-between w-full text-xs text-stone-600 dark:text-stone-300">
                  <a
                    href={`tel:${biz.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1.5 font-medium hover:text-red-700 dark:hover:text-red-400 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    {biz.phone}
                  </a>

                  {biz.website ? (
                    <a
                      href={biz.website.startsWith("http") ? biz.website : `https://${biz.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-red-700 hover:text-red-800 dark:text-red-400 hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Website
                    </a>
                  ) : (
                    <span className="text-stone-400 italic">Direct contact only</span>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center bg-stone-50/50 dark:bg-stone-900/30">
          <Building className="mx-auto h-12 w-12 text-stone-400" />
          <h3 className="mt-4 text-base font-semibold text-stone-900 dark:text-white">
            No businesses found
          </h3>
          <p className="mt-1 text-sm text-stone-500 max-w-sm mx-auto">
            We couldn&apos;t find any listings matching your criteria. Be the first to list a business in this category!
          </p>
          <div className="mt-6">
            <Button onClick={onOpenSubmitBusiness} className="bg-red-700 hover:bg-red-800">
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit Business Listing
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
