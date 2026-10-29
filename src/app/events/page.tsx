import { Metadata } from "next";
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import { EventsClient } from "./events-client";
import { INITIAL_COMMUNITY_EVENTS, CommunityEvent } from "@/data/community-events";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Queensland Turkish Events & Community Calendar | Brisbane & Gold Coast",
  description:
    "Discover upcoming Turkish community gatherings, bilateral business breakfasts, Republic Day (29 Ekim) galas, and student mentorship meetups across Brisbane, Gold Coast, and Queensland.",
  keywords: [
    "Turkish events Brisbane",
    "Queensland Turkish community calendar",
    "Turkish breakfast Brisbane New Farm Park",
    "29 Ekim Cumhuriyet Bayrami Brisbane",
    "Turkish student meetup Queensland",
    "Turkish Australian business networking Brisbane",
  ],
  alternates: {
    canonical: "https://qldturks.com/events",
  },
  openGraph: {
    title: "Queensland Turkish Events & Community Calendar | QLD Turks",
    description:
      "Join upcoming cultural picnics, bilateral business briefings, and diaspora gatherings across Queensland.",
    url: "https://qldturks.com/events",
    type: "website",
  },
};

export default async function EventsPage() {
  let events: CommunityEvent[] = [...INITIAL_COMMUNITY_EVENTS];

  if (process.env.DATABASE_URL?.startsWith("postgres")) {
    try {
      const dbNotices = await prisma.notice.findMany({
        where: {
          OR: [{ type: "event" as any }, { type: "general" }],
        },
        orderBy: { createdAt: "desc" },
      });

      for (const n of dbNotices) {
        if (n.title.toLowerCase().includes("event:") || n.title.toLowerCase().includes("etkinlik:")) {
          const isDuplicate = events.some((e) => e.title.toLowerCase() === n.title.toLowerCase());
          if (!isDuplicate) {
            events.push({
              id: n.id,
              title: n.title.replace(/^(Event:|Etkinlik:)\s*/i, ""),
              category: "Community & Family",
              date: n.createdAt.toISOString().split("T")[0],
              startTime: "10:00 AM",
              endTime: "1:00 PM",
              locationName: "Brisbane Community Hub",
              address: "Brisbane QLD 4000",
              suburb: "Brisbane",
              cost: "Free (RSVP Required)",
              organizer: "Community Member",
              description: n.content,
              highlights: ["Community gathering", "Bilingual Turkish & English friendly"],
              image:
                "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
              rsvpCount: 12,
              googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Brisbane+QLD",
            });
          }
        }
      }
    } catch {
      // database offline or schema fallback
    }
  }

  // Schema.org Event schema for Google Events Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Queensland Turkish Community Events & Gatherings",
    description: "Upcoming cultural, business, and youth gatherings for the Turkish diaspora in Queensland.",
    numberOfItems: events.length,
    itemListElement: events.map((event, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Event",
        name: event.title,
        description: event.description,
        startDate: `${event.date}T10:00:00+10:00`,
        endDate: `${event.date}T13:00:00+10:00`,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.locationName,
          address: {
            "@type": "PostalAddress",
            streetAddress: event.address,
            addressLocality: event.suburb,
            addressRegion: "QLD",
            addressCountry: "AU",
          },
        },
        image: [event.image],
        organizer: {
          "@type": "Organization",
          name: event.organizer,
          url: "https://qldturks.com",
        },
        offers: {
          "@type": "Offer",
          price: event.cost.includes("$") ? event.cost.replace(/[^0-9.]/g, "") : "0",
          priceCurrency: "AUD",
          availability: "https://schema.org/InStock",
          url: "https://qldturks.com/events",
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
      <Suspense
        fallback={
          <div className="py-24 text-center text-sm text-zinc-500">
            Loading Queensland Turkish Community Calendar...
          </div>
        }
      >
        <EventsClient initialEvents={events} />
      </Suspense>
    </>
  );
}
