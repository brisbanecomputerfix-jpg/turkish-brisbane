import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/businesses?category=Medical&q=Sunnybank
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const where: any = { isApproved: true };

    if (category && category !== "All") {
      where.category = category;
    }

    if (query && query.trim()) {
      const q = query.trim();
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { suburb: { contains: q } },
      ];
    }

    const businesses = await prisma.business.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: businesses });
  } catch (error) {
    console.error("API GET /api/businesses error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}

// POST /api/businesses
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, description, phone, website, suburb } = body;

    if (!name || !category || !description || !phone || !suburb) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, category, description, phone, suburb" },
        { status: 400 }
      );
    }

    const newBusiness = await prisma.business.create({
      data: {
        name,
        category,
        description,
        phone,
        website: website || null,
        suburb,
        isApproved: false, // Moderation gate
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Business listing submitted successfully (pending review).",
        data: newBusiness,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST /api/businesses error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create business" },
      { status: 500 }
    );
  }
}

