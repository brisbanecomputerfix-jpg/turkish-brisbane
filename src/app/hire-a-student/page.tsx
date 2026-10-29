import { Metadata } from "next";
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import { StudentsClient } from "./students-client";
import {
  INITIAL_STUDENT_PROFILES,
  INITIAL_STUDENT_TASKS,
  StudentProfile,
  StudentTaskRequest,
} from "@/data/students-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Hire A Turkish Student in Queensland | Babysitting, Cleaning, Handyman & Tutoring",
  description:
    "Empowering international Turkish students across Brisbane, Gold Coast, and Queensland with dignified community work. Hire verified students for babysitting, home cleaning, moving help, handyman repairs, PC troubleshooting, and bilingual tutoring.",
  keywords: [
    "Hire Turkish student Brisbane",
    "Turkish babysitter Brisbane",
    "Turkish cleaning student Gold Coast",
    "Turkish handyman student Queensland",
    "Turkish language tutor Brisbane",
    "International Turkish student support Queensland",
    "Fair Work Turkish student jobs",
  ],
  alternates: {
    canonical: "https://qldturks.com/hire-a-student",
  },
  openGraph: {
    title: "Hire A Turkish Student in Queensland | QLD Turks Solidarity Initiative",
    description:
      "Support Turkish university students abroad with fair-wage community jobs: babysitting, cleaning, handyman repairs, and tech support. Dignity over gig delivery.",
    url: "https://qldturks.com/hire-a-student",
    type: "website",
  },
};

export default async function HireStudentPage() {
  let students: StudentProfile[] = [...INITIAL_STUDENT_PROFILES];
  let tasks: StudentTaskRequest[] = [...INITIAL_STUDENT_TASKS];

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
      // Offline fallback
    }
  }

  // Schema.org Service & ItemList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Queensland Turkish Student Employment & Community Hiring Hub",
    provider: {
      "@type": "Organization",
      name: "QLD Turks",
      url: "https://qldturks.com",
    },
    serviceType: "Student Employment & Community Task Marketplace",
    areaServed: {
      "@type": "State",
      name: "Queensland",
    },
    description:
      "Connecting Queensland households and small businesses with verified Turkish international students for babysitting, home cleaning, moving, handyman repairs, and academic tutoring.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Student Services",
      itemListElement: students.map((s, idx) => ({
        "@type": "Offer",
        position: idx + 1,
        itemOffered: {
          "@type": "Service",
          name: `${s.name} - ${s.categories.join(", ")}`,
          description: s.bio,
          provider: {
            "@type": "Person",
            name: s.name,
            alumniOf: s.university,
          },
        },
      })),
    },
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
            Loading Queensland Turkish Student Directory...
          </div>
        }
      >
        <StudentsClient initialStudents={students} initialTasks={tasks} />
      </Suspense>
    </>
  );
}
