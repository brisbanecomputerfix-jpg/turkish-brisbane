import { Metadata } from "next";
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import { JobsClient } from "./jobs-client";
import { INITIAL_JOB_POSTINGS, INITIAL_CANDIDATE_PROFILES, JobPosting } from "@/data/job-listings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Queensland Turkish Careers & Job Pool | Jobs in Brisbane & Gold Coast",
  description:
    "Find verified employment opportunities and bilingual talent across Brisbane, Gold Coast, and Queensland. Fair Work compliant roles in trades, hospitality, medical, and IT.",
  keywords: [
    "Turkish jobs Brisbane",
    "Queensland Turkish careers",
    "Turkish chef jobs Queensland",
    "Turkish apprentice electrician Brisbane",
    "Bilingual Turkish jobs Australia",
    "Turkish student jobs Brisbane",
  ],
  alternates: {
    canonical: "https://qldturks.com/jobs",
  },
  openGraph: {
    title: "Queensland Turkish Careers & Job Pool | QLD Turks",
    description:
      "Connecting Turkish-speaking tradespeople, professionals, and students with trusted employers across Queensland.",
    url: "https://qldturks.com/jobs",
    type: "website",
  },
};

export default async function JobsPage() {
  let jobs: JobPosting[] = [...INITIAL_JOB_POSTINGS];
  let candidates = [...INITIAL_CANDIDATE_PROFILES];

  try {
    const dbNotices = await prisma.notice.findMany({
      where: { type: "job" },
      orderBy: { createdAt: "desc" },
    });

    for (const n of dbNotices) {
      const isDuplicate = jobs.some((j) => j.title.toLowerCase() === n.title.toLowerCase());
      if (!isDuplicate) {
        jobs.unshift({
          id: n.id,
          title: n.title,
          company: "Community Employer",
          category: "Hospitality",
          employmentType: "Full-time",
          suburb: "Brisbane",
          payRate: "Award Rate / Competitive",
          description: n.content,
          requirements: ["Bilingual communication skills preferred"],
          contactEmail: n.contactInfo.includes("@") ? n.contactInfo : undefined,
          contactPhone: !n.contactInfo.includes("@") ? n.contactInfo : undefined,
          isFairWorkCompliant: true,
          visaFriendly: "Permanent / Full Working Rights",
          postedAt: n.createdAt.toISOString().split("T")[0],
        });
      }
    }
  } catch {
    // database not reachable, fallback stays active
  }

  // Schema.org JobPosting schema for Google Jobs Indexation
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Queensland Turkish Careers & Job Openings",
    description: "Verified job vacancies for Turkish-speaking professionals in Queensland, Australia.",
    numberOfItems: jobs.length,
    itemListElement: jobs.map((j, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "JobPosting",
        title: j.title,
        description: j.description,
        datePosted: j.postedAt,
        employmentType: j.employmentType.toUpperCase().replace("-", "_"),
        hiringOrganization: {
          "@type": "Organization",
          name: j.company,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: j.suburb,
            addressRegion: "QLD",
            addressCountry: "AU",
          },
        },
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "AUD",
          value: {
            "@type": "QuantitativeValue",
            value: j.payRate,
          },
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
            Loading Queensland Turkish Job Pool...
          </div>
        }
      >
        <JobsClient initialJobs={jobs} initialCandidates={candidates} />
      </Suspense>
    </>
  );
}

