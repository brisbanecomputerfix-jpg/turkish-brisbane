import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { Suspense } from "react";
import { DirectoryClient } from "./directory-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Queensland Turkish Business Directory | Verified Services in Brisbane & QLD",
  description:
    "Explore verified Turkish-speaking doctors, migration lawyers, halal restaurants, electricians, builders, and IT specialists in Brisbane, Gold Coast, and Queensland.",
  keywords: [
    "Turkish directory Brisbane",
    "Turkish doctors Queensland",
    "Turkish lawyer Brisbane",
    "Turkish food South Bank",
    "Turkish halal butcher Brisbane",
    "Turkish trades Brisbane",
  ],
  alternates: {
    canonical: "https://qldturks.com/directory",
  },
  openGraph: {
    title: "Queensland Turkish Business Directory | Verified Local Services",
    description:
      "Find verified Turkish-speaking professionals and local businesses across Queensland.",
    url: "https://qldturks.com/directory",
    type: "website",
  },
};

export default async function DirectoryPage() {
  let businesses: any[] = [];

  try {
    businesses = await prisma.business.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load directory businesses:", error);
  }

  // Schema.org ItemList with LocalBusiness items for E-E-A-T Google compliance
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Turkish Businesses and Services in Queensland",
    description: "Verified directory of Turkish-speaking professionals and local businesses in Queensland, Australia.",
    numberOfItems: businesses.length,
    itemListElement: businesses.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "LocalBusiness",
        name: b.name,
        description: b.description,
        telephone: b.phone,
        url: b.website || "https://qldturks.com/directory",
        address: {
          "@type": "PostalAddress",
          addressLocality: b.suburb,
          addressRegion: "QLD",
          addressCountry: "AU",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="py-20 text-center text-sm text-zinc-500">Loading directory...</div>}>
        <DirectoryClient initialBusinesses={businesses} />
      </Suspense>
    </>
  );
}

