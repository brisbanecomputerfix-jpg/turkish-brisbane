import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/notices?type=bulk_order
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const where: any = {};
    if (type && type !== "all") {
      where.type = type;
    }

    const notices = await prisma.notice.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: notices });
  } catch (error) {
    console.error("API GET /api/notices error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch notices" },
      { status: 500 }
    );
  }
}

// POST /api/notices
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, type, content, contactInfo } = body;

    if (!title || !type || !content || !contactInfo) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newNotice = await prisma.notice.create({
      data: {
        title,
        type,
        content,
        contactInfo,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Notice posted successfully.",
        data: newNotice,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST /api/notices error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create notice" },
      { status: 500 }
    );
  }
}
