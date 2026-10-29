import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  INITIAL_STUDENT_PROFILES,
  INITIAL_STUDENT_TASKS,
  StudentProfile,
  StudentTaskRequest,
} from "@/data/students-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let students: StudentProfile[] = [...INITIAL_STUDENT_PROFILES];
    let tasks: StudentTaskRequest[] = [...INITIAL_STUDENT_TASKS];

    // Read community student submissions from Prisma Notice table
    if (process.env.DATABASE_URL?.startsWith("postgres")) {
      try {
        const dbNotices = await prisma.notice.findMany({
          where: {
            OR: [{ type: "student" as any }, { type: "general" }],
          },
          orderBy: { createdAt: "desc" },
        });

        for (const n of dbNotices) {
          if (n.title.toLowerCase().startsWith("student profile:")) {
            const isDup = students.some((s) => s.name.toLowerCase() === n.title.toLowerCase());
            if (!isDup) {
              students.unshift({
                id: n.id,
                name: n.title.replace(/^student profile:\s*/i, ""),
                university: "QUT (Queensland University of Technology)",
                degree: "University Student",
                suburb: "Brisbane",
                categories: ["Cleaning & Moving", "Handyman & Yard Care"],
                hourlyRate: "$30 - $35/hr",
                bio: n.content,
                skills: ["Bilingual Turkish & English", "Reliable and punctual"],
                languages: ["Turkish (Native)", "English"],
                hasBlueCard: false,
                hasWhiteCard: false,
                hasDriversLicence: true,
                avatar:
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
                availability: "Flexible weekdays & weekends",
                contactWhatsApp: n.contactInfo,
                verifiedStudent: true,
              });
            }
          } else if (n.title.toLowerCase().startsWith("student task:")) {
            const isDup = tasks.some((t) => t.title.toLowerCase() === n.title.toLowerCase());
            if (!isDup) {
              tasks.unshift({
                id: n.id,
                title: n.title.replace(/^student task:\s*/i, ""),
                category: "Babysitting & Childcare",
                suburb: "Brisbane",
                payOffer: "$35 / hr",
                dateOrFrequency: "Flexible",
                description: n.content,
                postedBy: "Community Member",
                contactChannel: n.contactInfo,
                postedAt: n.createdAt.toISOString().split("T")[0],
              });
            }
          }
        }
      } catch {
        // Fallback data remains active
      }
    }

    if (category && category !== "All Services") {
      students = students.filter((s) => s.categories.some((c) => c.toLowerCase() === category.toLowerCase()));
      tasks = tasks.filter((t) => t.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      students = students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.degree.toLowerCase().includes(q) ||
          s.suburb.toLowerCase().includes(q) ||
          s.skills.some((sk) => sk.toLowerCase().includes(q)) ||
          s.bio.toLowerCase().includes(q)
      );
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.suburb.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      students,
      tasks,
    });
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json({ success: false, error: "Failed to load students" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, studentData, taskData } = body;

    if (action === "register_student") {
      if (!studentData?.name || !studentData?.degree) {
        return NextResponse.json(
          { success: false, error: "Name and Degree are required" },
          { status: 400 }
        );
      }

      if (process.env.DATABASE_URL?.startsWith("postgres")) {
        try {
          await prisma.notice.create({
            data: {
              title: `Student Profile: ${studentData.name} - ${studentData.degree}`,
              type: "general",
              content: `${studentData.bio}\nCategories: ${studentData.categories?.join(", ")}\nRate: ${studentData.hourlyRate}\nSuburb: ${studentData.suburb}`,
              contactInfo: studentData.contactWhatsApp || studentData.contactEmail || "Community Portal",
            },
          });
        } catch (dbErr) {
          console.warn("Could not save student to DB:", dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: "Your student profile has been submitted and listed for community employers!",
        student: studentData,
      });
    }

    if (action === "post_task") {
      if (!taskData?.title || !taskData?.payOffer) {
        return NextResponse.json(
          { success: false, error: "Title and Pay offer are required" },
          { status: 400 }
        );
      }

      if (process.env.DATABASE_URL?.startsWith("postgres")) {
        try {
          await prisma.notice.create({
            data: {
              title: `Student Task: ${taskData.title}`,
              type: "general",
              content: `${taskData.description}\nCategory: ${taskData.category}\nPay: ${taskData.payOffer}\nSuburb: ${taskData.suburb}`,
              contactInfo: taskData.contactChannel || "Community Portal",
            },
          });
        } catch (dbErr) {
          console.warn("Could not save task to DB:", dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: "Your task request has been published for Turkish students!",
        task: taskData,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/students error:", error);
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
  }
}

