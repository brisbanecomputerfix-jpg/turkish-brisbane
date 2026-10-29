import { Metadata } from "next";
import { notFound } from "next/navigation";
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
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  BookOpen,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | QLD Turks",
    };
  }

  return {
    title: `${post.title} | QLD Turks Insights`,
    description: post.excerpt,
    alternates: {
      canonical: `https://qldturks.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://qldturks.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const renderIsometric = (icon: BlogPost["isometricIcon"]) => {
    switch (icon) {
      case "bridge":
        return <IsometricBridge size={64} />;
      case "jobpool":
        return <IsometricJobPool size={64} />;
      case "investment":
        return <IsometricInvestment size={64} />;
      case "legal":
        return <IsometricLegalTrade size={64} />;
      default:
        return <IsometricNetwork size={64} />;
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "QLD Turks",
      logo: "https://qldturks.com/icon.svg",
    },
    mainEntityOfPage: `https://qldturks.com/blog/${post.slug}`,
  };

  // Find related articles
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Insights & Articles
            </Link>
            <span>/</span>
            <span className="text-zinc-400 truncate max-w-xs">{post.category}</span>
          </nav>

          {/* Article Header */}
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-red-50 dark:bg-red-950/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#E30A17] ring-1 ring-inset ring-red-600/10">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.18]">
              {post.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author Byline (E-E-A-T Credentials) */}
            <div className="mt-8 flex items-center justify-between p-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 font-bold text-sm">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <span>{post.author.name}</span>
                    <ShieldCheck className="h-4 w-4 text-[#E30A17]" />
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {post.author.role} • <span className="font-medium text-zinc-700 dark:text-zinc-300">{post.author.credentials}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
                <span>Verified Author</span>
              </div>
            </div>
          </div>

          {/* Hero Banner with Isometric Accent */}
          <div className="mt-10 relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 shadow-md">
            <img
              src={post.image}
              alt={post.title}
              className="h-72 sm:h-96 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Top Right Floating Isometric Badge */}
            <div className="absolute top-6 right-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-xl border border-white/40 dark:border-zinc-800">
              {renderIsometric(post.isometricIcon)}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
                Executive Briefing
              </span>
              <p className="mt-1 text-sm sm:text-base font-medium text-zinc-100">
                Researched & published for the Queensland Turkish diaspora network.
              </p>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="my-10 rounded-2xl border border-red-200/80 bg-red-50/50 p-6 sm:p-8 dark:border-red-900/40 dark:bg-red-950/20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#E30A17] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Key Executive Takeaways</span>
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E30A17] text-white text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body Prose Content */}
          <div className="mt-10 space-y-6 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h2
                    key={index}
                    className="pt-6 text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100"
                  >
                    {paragraph.replace("### ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="ml-5 list-disc pl-1 text-zinc-600 dark:text-zinc-400">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  </li>
                );
              }
              if (/^\d+\.\s/.test(paragraph)) {
                return (
                  <div key={index} className="p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 my-2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  </div>
                );
              }
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              );
            })}
          </div>

          {/* Related Community CTA Banner */}
          <div className="mt-16 rounded-3xl bg-zinc-900 text-white p-8 sm:p-10 dark:bg-zinc-900 border border-zinc-800">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Take Concrete Action
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold">
                  Connect with Verified Turkish Leaders & Talent
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
                  Explore our verified business directory, submit open employment notices, or join our screened WhatsApp community hub.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/directory">
                  <Button variant="default" size="sm" className="bg-white text-zinc-900 hover:bg-zinc-100">
                    Browse Directory
                  </Button>
                </Link>
                <Link href="/noticeboard">
                  <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700">
                    Post on Noticeboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* More Articles */}
          <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-6">
              More Insights & Playbooks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="p-5 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 hover:border-zinc-300 transition-colors block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E30A17]">
                    {p.category}
                  </span>
                  <h4 className="mt-1.5 text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

