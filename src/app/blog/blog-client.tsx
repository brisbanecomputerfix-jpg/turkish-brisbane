"use client";

import * as React from "react";
import Link from "next/link";
import { BLOG_POSTS, BlogPost } from "@/data/blog-posts";
import {
  IsometricNetwork,
  IsometricJobPool,
  IsometricInvestment,
  IsometricLegalTrade,
  IsometricBridge,
} from "@/components/ui/isometric-icons";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Briefcase,
  TrendingUp,
  Scale,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Community",
  "Careers & Jobs",
  "Business & Investment",
  "Legal & Trade",
] as const;

export function BlogClient() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const filteredPosts = React.useMemo(() => {
    if (selectedCategory === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const renderIsometric = (icon: BlogPost["isometricIcon"], size = 56) => {
    switch (icon) {
      case "bridge":
        return <IsometricBridge size={size} />;
      case "jobpool":
        return <IsometricJobPool size={size} />;
      case "investment":
        return <IsometricInvestment size={size} />;
      case "legal":
        return <IsometricLegalTrade size={size} />;
      default:
        return <IsometricNetwork size={size} />;
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-10 sm:pb-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] sm:text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <BookOpen className="h-3.5 w-3.5 text-[#E30A17] shrink-0" />
            <span className="truncate sm:whitespace-normal">Community Insights, Playbooks & Industry Articles</span>
          </div>

          <h1 className="mt-4 text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15] break-words">
            Uniting Community, Unlocking Business & Building the Future
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In-depth guides on filling the missing diaspora gap, creating a Queensland-wide Turkish job pool, scaling bilateral trade and investments, and mastering Australian business compliance.
          </p>
        </div>

        {/* 4 Core Mission Pillars with Custom Isometric Icons */}
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 mb-4">
                  <IsometricBridge size={48} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Uniting Diaspora
                </h3>
                <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                  Filling the missing gap by connecting isolated families, professionals, and students across Greater Brisbane, Gold Coast, and regional QLD.
                </p>
              </div>
              <Link
                href="/blog/why-qld-turks-bridging-the-missing-gap"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E30A17] hover:underline"
              >
                <span>Read Story</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 mb-4">
                  <IsometricJobPool size={48} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Unified Job Pool
                </h3>
                <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                  Connecting skilled immigrant talent, university scholars, and local trades with verified bilingual employers and mentorship.
                </p>
              </div>
              <Link
                href="/blog/creating-a-unified-turkish-job-pool-queensland"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E30A17] hover:underline"
              >
                <span>Career Guide</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 mb-4">
                  <IsometricInvestment size={48} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Trade & Investment
                </h3>
                <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                  Unlocking bilateral trade corridors in Aegean olive oil, Turkish travertine, agriculture, and high-margin enterprise co-investments.
                </p>
              </div>
              <Link
                href="/blog/unlocking-business-potential-bilateral-trade-investments"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E30A17] hover:underline"
              >
                <span>Trade Corridors</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 mb-4">
                  <IsometricLegalTrade size={48} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Legal & Compliance
                </h3>
                <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                  Practical regulatory roadmap covering ABN/PTY LTD setup, QBCC trade licensing, Fair Work awards, and DAFF biosecurity clearance.
                </p>
              </div>
              <Link
                href="/blog/legal-playbook-starting-business-trade-queensland"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E30A17] hover:underline"
              >
                <span>Legal Playbook</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-14 flex flex-wrap items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#E30A17] text-white shadow-xs"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
            >
              <div>
                {/* Visual Header with Image & Isometric Badge */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Floating Isometric Icon */}
                  <div className="absolute top-4 right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-md border border-white/40 dark:border-zinc-800">
                    {renderIsometric(post.isometricIcon, 44)}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-[#E30A17] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Key Takeaway Snippet */}
                  <div className="mt-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      KEY TAKEAWAY:
                    </span>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                      "{post.keyTakeaways[0]}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Author & CTA Footer */}
              <div className="p-6 sm:p-7 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 mt-2 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {post.author.name}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {post.author.credentials}
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs group-hover:border-[#E30A17] group-hover:text-[#E30A17]">
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

