import { Metadata } from "next";
import { BlogClient } from "./blog-client";
import { BLOG_POSTS } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Insights & Articles | Uniting Community, Job Pool & Trade Investments | QLD Turks",
  description:
    "Authoritative articles on uniting the Queensland Turkish community, unlocking career potential with our unified job pool, bilateral trade and investment corridors, and Australian business legal compliance.",
  keywords: [
    "Queensland Turkish community articles",
    "Turkish business network Brisbane",
    "Turkish job pool Queensland",
    "Australia Turkey bilateral trade investments",
    "QBCC license Turkish builder Brisbane",
    "Turkish food import compliance Australia",
  ],
  alternates: {
    canonical: "https://qldturks.com/blog",
  },
  openGraph: {
    title: "Insights & Articles | Uniting Community, Job Pool & Trade Investments",
    description:
      "Explore how QLD Turks is bridging the diaspora gap, creating a statewide job pool, and fostering bilateral trade and investments.",
    url: "https://qldturks.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "QLD Turks Community Insights & Industry Articles",
    description: "Authoritative guides on community development, workforce integration, trade logistics, and legal compliance in Queensland.",
    url: "https://qldturks.com/blog",
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      author: {
        "@type": "Person",
        name: p.author.name,
        jobTitle: p.author.role,
      },
      url: `https://qldturks.com/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient />
    </>
  );
}
