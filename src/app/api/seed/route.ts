import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    const count = await prisma.business.count();
    if (count > 0 && !force) {
      return NextResponse.json({
        message: "Database already contains businesses. Pass ?force=true to re-seed.",
        businessesCount: count,
      });
    }

    if (force) {
      await prisma.notice.deleteMany({});
      await prisma.business.deleteMany({});
    }

    const businesses = [
      {
        name: "Bosphorus Meze & Grill",
        category: "Food & Groceries",
        description:
          "Authentic woodfired Turkish pide, slow-cooked lamb shanks, hand-rolled borek, and freshly brewed Turkish tea overlooking South Bank.",
        phone: "+61 7 3844 5500",
        website: "https://bosphorusmeze.com.au",
        suburb: "South Bank",
        isApproved: true,
      },
      {
        name: "Anatolian IT & Cloud Solutions",
        category: "Tech Support & IT",
        description:
          "Bilingual IT consulting, small business cybersecurity, custom web development, POS systems, and cloud infrastructure for Brisbane businesses.",
        phone: "+61 400 123 456",
        website: "https://anatolianit.com.au",
        suburb: "Indooroopilly",
        isApproved: true,
      },
      {
        name: "Dr. Aylin Yilmaz Family Clinic",
        category: "Medical",
        description:
          "Experienced bilingual General Practitioner providing comprehensive family healthcare, preventative screenings, and paediatric health in Sunnybank.",
        phone: "+61 7 3345 8899",
        website: "https://dryilmazmedical.com.au",
        suburb: "Sunnybank",
        isApproved: true,
      },
      {
        name: "Ottoman Legal & Migration Services",
        category: "Legal",
        description:
          "Registered migration agents and Australian legal practitioners specializing in partner visas, skilled migration, commercial leasing, and conveyancing.",
        phone: "+61 7 3221 7711",
        website: "https://ottomanlegal.com.au",
        suburb: "Brisbane CBD",
        isApproved: true,
      },
      {
        name: "Toros Electrical & Air Conditioning",
        category: "Trades",
        description:
          "Licensed master electrician serving greater Brisbane. Split system air conditioning, solar repairs, switchboard upgrades, and emergency callouts.",
        phone: "+61 412 888 999",
        website: "https://toroselectrical.com.au",
        suburb: "Chermside",
        isApproved: true,
      },
      {
        name: "Turquoise Language & Tutoring",
        category: "Education",
        description:
          "Weekend Turkish school for kids, adult conversational Turkish lessons, and high school STEM tutoring by accredited Brisbane educators.",
        phone: "+61 433 777 666",
        website: "https://turquoisetutoring.com.au",
        suburb: "Toowong",
        isApproved: true,
      },
      {
        name: "Antalya Travertine & Natural Stone",
        category: "Trades",
        description:
          "Direct importer and QBCC licensed stone specialists supplying Turkish travertine pavers, Denizli marble, and custom tile installations across SEQ.",
        phone: "+61 7 3100 8822",
        website: "https://antalyastone.com.au",
        suburb: "Fortitude Valley",
        isApproved: true,
      },
      {
        name: "Aegean Family Dental Care",
        category: "Medical",
        description:
          "Bilingual general and cosmetic dental clinic. Child dental benefits, dental implants, teeth whitening, and emergency toothache relief in Mount Gravatt.",
        phone: "+61 7 3422 9900",
        website: "https://aegeandental.com.au",
        suburb: "Mount Gravatt",
        isApproved: true,
      },
      {
        name: "Surfers Paradise Turkish Kebabs & Bakery",
        category: "Food & Groceries",
        description:
          "Authentic wood-smoked lamb and chicken döner kebabs, fresh spinach & cheese borek, and pistachio baklava freshly baked daily on the Gold Coast.",
        phone: "+61 7 5538 1234",
        website: "https://surfersturkish.com.au",
        suburb: "Gold Coast",
        isApproved: true,
      },
      {
        name: "Bosphorus Accounting & Advisory",
        category: "Legal",
        description:
          "Registered Tax Agents and CPAs advising Turkish-Australian enterprises on company tax returns, ASIC compliance, BAS lodgement, and startup structuring.",
        phone: "+61 7 3012 6600",
        website: "https://bosphorusadvisory.com.au",
        suburb: "Brisbane CBD",
        isApproved: true,
      },
    ];

    for (const b of businesses) {
      await prisma.business.create({ data: b });
    }

    const notices = [
      {
        title: "Bulk Kurukahveci Mehmet Efendi Turkish Coffee Order (Pallet Import)",
        type: "bulk_order",
        content:
          "Organizing a collective sea freight container order directly from Istanbul to save 40% on bulk fresh Turkish coffee & copper cezves. Pickups in Brisbane Southside.",
        contactInfo: "WhatsApp: +61 400 999 111 (Emre B.)",
      },
      {
        title: "Spacious Private Room Available for Student/Professional",
        type: "general",
        content:
          "Furnished master bedroom with private ensuite near UQ St Lucia & CityCat terminal. Looking for a tidy, non-smoking Turkish speaker. $280/wk bills included.",
        contactInfo: "Telegram / SMS: +61 411 222 333 (Zeynep)",
      },
      {
        title: "Urgent: Seeking Bilingual CPA / Tax Accountant for Small Business",
        type: "job",
        content:
          "Local hospitality group seeking a Brisbane-based accountant fluent in English and Turkish for quarterly BAS lodgement and annual company returns.",
        contactInfo: "Email: accounts@bosphorusmeze.com.au",
      },
      {
        title: "Monthly Community Turkish Breakfast & Networking",
        type: "general",
        content:
          "Join us this coming Sunday at New Farm Park for Turkish tea, simit, feta, and good conversations. Bring your family and lawn chairs!",
        contactInfo: "WhatsApp Community Group #Events",
      },
    ];

    for (const n of notices) {
      await prisma.notice.create({ data: n });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      seededBusinesses: businesses.length,
      seededNotices: notices.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

