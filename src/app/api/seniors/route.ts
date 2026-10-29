import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SENIOR_PARK_PICNICS, SeniorPicnicEvent } from "@/data/seniors-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let picnics: SeniorPicnicEvent[] = [...SENIOR_PARK_PICNICS];

    // Merge any user-submitted community picnics from database
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

    return NextResponse.json({ success: true, picnics });
  } catch (error) {
    console.error("GET /api/seniors error:", error);
    return NextResponse.json({ success: false, error: "Failed to load senior picnics" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, elderData, volunteerData, rsvpData } = body;

    if (action === "register_elder") {
      if (!elderData?.elderName || !elderData?.familyContact) {
        return NextResponse.json(
          { success: false, error: "Elder name and family contact are required" },
          { status: 400 }
        );
      }

      if (process.env.DATABASE_URL?.startsWith("postgres")) {
        try {
          await prisma.notice.create({
            data: {
              title: `Senior Registration: ${elderData.elderName} (${elderData.suburb})`,
              type: "general",
              content: `Needs transport: ${elderData.needsTransport ? "YES" : "No"}. Notes: ${elderData.notes || "None"}. Registered for park picnics.`,
              contactInfo: elderData.familyContact,
            },
          });
        } catch (dbErr) {
          console.warn("Could not save elder registration:", dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: "Büyüğümüz başarıyla kaydedildi! Gönüllü koordinatörlerimiz sizinle iletişime geçecektir.",
      });
    }

    if (action === "volunteer_driver") {
      if (!volunteerData?.driverName || !volunteerData?.contactWhatsApp) {
        return NextResponse.json(
          { success: false, error: "Driver name and WhatsApp are required" },
          { status: 400 }
        );
      }

      if (process.env.DATABASE_URL?.startsWith("postgres")) {
        try {
          await prisma.notice.create({
            data: {
              title: `Volunteer Driver: ${volunteerData.driverName}`,
              type: "general",
              content: `Vehicle: ${volunteerData.vehicleType || "Car"}. Available suburbs: ${volunteerData.suburbsCovered || "Brisbane"}. Student/Volunteer carpool offer.`,
              contactInfo: volunteerData.contactWhatsApp,
            },
          });
        } catch (dbErr) {
          console.warn("Could not save volunteer driver:", dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: "Gönüllü şoför kaydınız alındı! Büyüklerimize desteğiniz için teşekkür ederiz.",
      });
    }

    if (action === "picnic_rsvp") {
      const { picnicId, attendeeName, phone } = rsvpData || {};
      if (!picnicId || !attendeeName) {
        return NextResponse.json(
          { success: false, error: "Picnic ID and Attendee Name required" },
          { status: 400 }
        );
      }

      if (process.env.DATABASE_URL?.startsWith("postgres")) {
        try {
          await prisma.notice.create({
            data: {
              title: `Picnic RSVP: ${attendeeName} for ${picnicId}`,
              type: "general",
              content: `Attendee: ${attendeeName}. Contact: ${phone || "N/A"}. Confirmed attendance.`,
              contactInfo: phone || attendeeName,
            },
          });
        } catch (dbErr) {
          console.warn("Could not save picnic RSVP:", dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: "Piknik katılımınız onaylandı! Semaverde çayınız hazır olacak.",
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/seniors error:", error);
    return NextResponse.json({ success: false, error: "Operation failed" }, { status: 500 });
  }
}
