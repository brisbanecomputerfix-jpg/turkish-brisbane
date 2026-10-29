import { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About QLD Turks | Community Mission, Governance & E-E-A-T Standards",
  description:
    "Learn about QLD Turks — an independent, volunteer-moderated community platform connecting Turkish-Australians across Brisbane and Queensland with verified services and mutual aid.",
  alternates: {
    canonical: "https://qldturks.com/about",
  },
  openGraph: {
    title: "About QLD Turks | Community Mission & Trust Standards",
    description:
      "Learn about our verification guidelines, moderation standards, and independent volunteer committee.",
    url: "https://qldturks.com/about",
    type: "website",
    images: [
      {
        url: "https://turks.4pxl.com/images/story-bridge-brisbane.jpg",
        width: 1200,
        height: 630,
        alt: "Story Bridge Brisbane, Queensland",
      },
    ],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About QLD Turks Community & Verification Standards",
    description:
      "Independent community initiative and verified business directory for Turkish-Australians across Queensland.",
    url: "https://qldturks.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "QLD Turks",
      url: "https://qldturks.com",
      logo: "https://qldturks.com/icon.svg",
      sameAs: ["https://qldturks.com"],
      areaServed: {
        "@type": "State",
        name: "Queensland",
      },
      knowsAbout: [
        "Turkish community in Queensland",
        "Turkish doctors in Brisbane",
        "Turkish legal and migration support",
        "Halal Turkish dining and grocery in Brisbane",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
