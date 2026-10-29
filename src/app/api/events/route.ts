import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { INITIAL_COMMUNITY_EVENTS, CommunityEvent } from "@/data/community-events";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let events: CommunityEvent[] = [...INITIAL_COMMUNITY_EVENTS];

    // Attempt to load community events saved to Prisma Notice table
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
        // Prisma offline or schema mismatch fallback
      }
    }

    if (category && category !== "All") {
      events = events.filter((e) => e.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.suburb.toLowerCase().includes(q) ||
          e.locationName.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, eventData, rsvpData } = body;

    if (action === "rsvp") {
      const { eventId, name, email } = rsvpData || {};
      if (!eventId || !name) {
        return NextResponse.json(
          { success: false, error: "Missing eventId or attendee name" },
          { status: 400 }
        );
      }

      // Record RSVP notice in Prisma if database available
      if (process.env.DATABASE_URL?.startsWith("postgres")) {
        try {
          await prisma.notice.create({
            data: {
              title: `RSVP: ${name} for Event ID ${eventId}`,
              type: "general",
              content: `Attendee: ${name} (${email || "No email"}). Confirmed spot via Community Calendar.`,
              contactInfo: email || name,
            },
          });
        } catch (dbErr) {
          console.warn("Could not save RSVP to DB, recorded in session:", dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: "RSVP confirmed! We look forward to seeing you there.",
      });
    }

    // Default action: Create new event submission
    if (!eventData || !eventData.title || !eventData.date) {
      return NextResponse.json(
        { success: false, error: "Title and date are required" },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL?.startsWith("postgres")) {
      try {
        await prisma.notice.create({
          data: {
            title: `Event: ${eventData.title}`,
            type: "general",
            content: `${eventData.description}\nCategory: ${eventData.category}\nDate: ${eventData.date} (${eventData.startTime} - ${eventData.endTime})\nVenue: ${eventData.locationName}, ${eventData.address}\nCost: ${eventData.cost}\nOrganizer: ${eventData.organizer}`,
            contactInfo: eventData.contactEmail || eventData.contactWhatsApp || "Community Portal",
          },
        });
      } catch (dbErr) {
        console.warn("Could not write event to DB:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Community event submitted successfully and listed for moderation!",
      event: eventData,
    });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      { success: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
