import { Metadata } from "next";
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import { SeniorsClient } from "./seniors-client";
import { SENIOR_PARK_PICNICS, SeniorPicnicEvent } from "@/data/seniors-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Queensland Turkish Seniors & Elders Gatherings | Park Picnics & Semaver Çayı",
  description:
    "Dedicated public park gatherings, freshly brewed samovar çay, backgammon tournaments, and youth carpooling for Turkish elders and retirees across Brisbane and Gold Coast. Shaded, accessible park picnics.",
  keywords: [
    "Turkish seniors Brisbane",
    "Queensland Turkish elders picnic",
    "Büyüklerimiz piknik Brisbane",
    "Turkish retirees Gold Coast",
    "Roma Street Parkland Turkish picnic",
    "New Farm Park Turkish çay saati",
    "Turkish elderly community Queensland",
  ],
  alternates: {
    canonical: "https://qldturks.com/seniors",
  },
  openGraph: {
    title: "Queensland Turkish Elders Circle & Park Picnics | QLD Turks",
    description:
      "Join our shaded public park picnics with fresh samovar tea, backgammon, homemade börek, and student volunteer carpools for Turkish elders in Queensland.",
    url: "https://qldturks.com/seniors",
    type: "website",
  },
};

export default async function SeniorsPage() {
  let picnics: SeniorPicnicEvent[] = [...SENIOR_PARK_PICNICS];

  if (process.env.DATABASE_URL?.startsWith("postgres")) {
    try {
      const dbNotices = await prisma.notice.findMany({
        where: {
          OR: [{ type: "senior" as any }, { type: "general" }],
        },
        orderBy: { createdAt: "desc" },
      });

      for (const n of dbNotices) {
        if (n.title.toLowerCase().includes("senior picnic:") || n.title.toLowerCase().includes("büyüklerimiz piknik:")) {
          const isDup = picnics.some((p) => p.titleEn.toLowerCase() === n.title.toLowerCase());
          if (!isDup) {
            picnics.push({
              id: n.id,
              titleEn: n.title,
              titleTr: n.title,
              parkName: "Community Park",
              address: "Queensland",
              suburb: "Brisbane",
              date: n.createdAt.toISOString().split("T")[0],
              time: "11:00 AM - 3:00 PM",
              descriptionEn: n.content,
              descriptionTr: n.content,
              accessibilityFeatures: ["Wheelchair accessible", "Public transport nearby"],
              traditions: ["Semaver çayı", "Tavla ve sohbet"],
              image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
              googleMapsUrl: "https://www.google.com/maps",
              rsvpCount: 15,
              contactCoordinator: n.contactInfo,
            });
          }
        }
      }
    } catch {
      // Fallback active
    }
  }

  // Schema.org Event JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Queensland Turkish Elders Park Picnics & Gatherings",
    description: "Accessible, shaded community picnics with traditional tea, games, and healthcare guidance for Turkish elders.",
    numberOfItems: picnics.length,
    itemListElement: picnics.map((picnic, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Event",
        name: picnic.titleEn,
        startDate: `${picnic.date}T10:30:00+10:00`,
        endDate: `${picnic.date}T15:00:00+10:00`,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: picnic.parkName,
          address: {
            "@type": "PostalAddress",
            streetAddress: picnic.address,
            addressLocality: picnic.suburb,
            addressRegion: "QLD",
            addressCountry: "AU",
          },
        },
        image: [picnic.image],
        description: picnic.descriptionEn,
        isAccessibleForFree: true,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="py-24 text-center text-sm text-zinc-500">
            Loading Queensland Turkish Elders Circle...
          </div>
        }
      >
        <SeniorsClient initialPicnics={picnics} />
      </Suspense>
    </>
  );
}

