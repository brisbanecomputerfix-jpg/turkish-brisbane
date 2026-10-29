import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { Suspense } from "react";
import { DirectoryClient } from "../directory-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Interactive Map | Turkish Businesses & Services in Queensland",
  description:
    "Explore the interactive map of Turkish-speaking doctors, lawyers, grocers, restaurants, and trades across Greater Brisbane, Gold Coast, and Queensland.",
  alternates: {
    canonical: "https://qldturks.com/directory/map",
  },
  openGraph: {
    title: "Interactive Map | Queensland Turkish Directory",
    description:
      "Find Turkish businesses near you on the interactive Queensland community map.",
    url: "https://qldturks.com/directory/map",
    type: "website",
  },
};

export default async function DirectoryMapPage() {
  let businesses: any[] = [];

  try {
    businesses = await prisma.business.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load map businesses:", error);
  }

  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-zinc-500">
          Loading interactive map...
        </div>
      }
    >
      <DirectoryClient initialBusinesses={businesses} />
    </Suspense>
  );
}
