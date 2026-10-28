import prisma from "@/lib/prisma";
import { HomeClient } from "@/components/home-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turkish Brisbane | Local Business Directory & Community Hub",
  description:
    "Discover Turkish-speaking doctors, lawyers, restaurants, trades, and IT services in Brisbane. Join the verified Brisbane Turkish community WhatsApp group.",
  keywords: [
    "Turkish Brisbane",
    "Brisbane Turkish Community",
    "Turkish doctor Brisbane",
    "Turkish lawyer Brisbane",
    "Turkish restaurant South Bank",
    "Turkish grocery Brisbane",
    "Turkish businesses Queensland",
  ],
  alternates: {
    canonical: "https://turkishbrisbane.com",
  },
  openGraph: {
    title: "Turkish Brisbane | Community Hub & Local Directory",
    description:
      "Find verified Turkish-speaking professionals, authentic groceries, trades, and join the Brisbane Turkish WhatsApp community.",
    url: "https://turkishbrisbane.com",
    siteName: "Turkish Brisbane",
    locale: "en_AU",
    type: "website",
  },
};

export default async function HomePage() {
  // Server-side fetching from database (Prisma)
  let businesses: any[] = [];
  let notices: any[] = [];

  try {
    businesses = await prisma.business.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    });

    notices = await prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database fetch error:", error);
  }

  // Generate Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://turkishbrisbane.com/#website",
        url: "https://turkishbrisbane.com",
        name: "Turkish Brisbane",
        description: "Brisbane Turkish Community Hub & Local Business Directory",
        inLanguage: ["en-AU", "tr-TR"],
      },
      {
        "@type": "ItemList",
        name: "Turkish Businesses in Brisbane",
        itemListElement: businesses.map((b, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "LocalBusiness",
            name: b.name,
            description: b.description,
            telephone: b.phone,
            url: b.website || "https://turkishbrisbane.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: b.suburb,
              addressRegion: "QLD",
              addressCountry: "AU",
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient
        initialBusinesses={JSON.parse(JSON.stringify(businesses))}
        initialNotices={JSON.parse(JSON.stringify(notices))}
      />
    </>
  );
}
