import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { INITIAL_JOB_POSTINGS, INITIAL_CANDIDATE_PROFILES, JobPosting, CandidateProfile } from "@/data/job-listings";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    let jobs: JobPosting[] = [...INITIAL_JOB_POSTINGS];
    let candidates: CandidateProfile[] = [...INITIAL_CANDIDATE_PROFILES];

    // Also attempt to read any user-submitted jobs from Prisma Notice table
    try {
      const dbNotices = await prisma.notice.findMany({
        where: { type: "job" },
        orderBy: { createdAt: "desc" },
      });

      for (const n of dbNotices) {
        // parse extra fields if serialized or create synthetic posting
        const isDuplicate = jobs.some((j) => j.title.toLowerCase() === n.title.toLowerCase());
        if (!isDuplicate) {
          jobs.unshift({
            id: n.id,
            title: n.title,
            company: "Community Employer",
            category: "Hospitality",
            employmentType: "Full-time",
            suburb: "Brisbane",
            payRate: "Award Rate / TBD",
            description: n.content,
            requirements: ["Bilingual Turkish/English communication preferred"],
            contactEmail: n.contactInfo.includes("@") ? n.contactInfo : undefined,
            contactPhone: !n.contactInfo.includes("@") ? n.contactInfo : undefined,
            isFairWorkCompliant: true,
            visaFriendly: "Permanent / Full Working Rights",
            postedAt: n.createdAt.toISOString().split("T")[0],
          });
        }
      }
    } catch {
      // Prisma not connected or offline, fallback data remains active
    }

    if (category && category !== "All") {
      jobs = jobs.filter((j) => j.category.toLowerCase() === category.toLowerCase());
      candidates = candidates.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }

    if (type && type !== "All") {
      jobs = jobs.filter((j) => j.employmentType.toLowerCase() === type.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      jobs,
      candidates,
    });
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { kind, data } = body;

    if (!kind || !data) {
      return NextResponse.json(
        { success: false, error: "Invalid submission payload" },
        { status: 400 }
      );
    }

    // Persist to Prisma Notice table for longevity
    try {
      if (kind === "job") {
        await prisma.notice.create({
          data: {
            title: data.title,
            type: "job",
            content: `${data.company} (${data.suburb}) - ${data.employmentType} - Pay: ${data.payRate}. ${data.description}`,
            contactInfo: data.contactEmail || data.contactWhatsApp || data.contactPhone || "Community Portal",
          },
        });
      } else if (kind === "candidate") {
        await prisma.notice.create({
          data: {
            title: `Candidate: ${data.name} - ${data.targetRole}`,
            type: "job",
            content: `${data.bio} Skills: ${data.skills?.join(", ")}. Availability: ${data.availability}`,
            contactInfo: data.contactChannel || "Community Portal",
          },
        });
      }
    } catch (e) {
      console.warn("Could not write job submission to DB, will store in response:", e);
    }

    return NextResponse.json({
      success: true,
      message: kind === "job" ? "Job posted successfully!" : "Profile registered to Talent Pool!",
      data,
    });
  } catch (error) {
    console.error("POST /api/jobs error:", error);
    return NextResponse.json(
      { success: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
