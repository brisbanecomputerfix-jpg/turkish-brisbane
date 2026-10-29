import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { Suspense } from "react";
import { NoticeboardClient } from "./noticeboard-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Queensland Turkish Community Noticeboard | Housing, Jobs & Bulk Orders",
  description:
    "Community bulletin for Turkish-Australians in Queensland. Find room rentals near Brisbane universities, job openings, community breakfasts, and group import orders.",
  alternates: {
    canonical: "https://qldturks.com/noticeboard",
  },
  openGraph: {
    title: "Queensland Turkish Community Noticeboard | Housing & Jobs",
    description:
      "Find verified room rentals, job listings, and community bulk orders across Brisbane and Queensland.",
    url: "https://qldturks.com/noticeboard",
    type: "website",
  },
};

export default async function NoticeboardPage() {
  let notices: any[] = [];

  try {
    notices = await prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load notices:", error);
  }

  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-zinc-500">Loading noticeboard...</div>}>
      <NoticeboardClient initialNotices={notices} />
    </Suspense>
  );
}

