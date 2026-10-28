import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#b91c1c", // Crimson red matching Turkish branding
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://qldturks.com"),
  title: {
    default: "QLD Turks | Turkish Brisbane & Queensland Community Hub",
    template: "%s | QLD Turks",
  },
  description:
    "Official directory and community portal for Turkish speakers in Brisbane, Gold Coast, and Queensland. Verified medical, legal, food, trade services and WhatsApp community connection.",
  applicationName: "QLD Turks",
  authors: [{ name: "QLD Turks Community" }],
  generator: "Next.js",
  keywords: [
    "QLD Turks",
    "Queensland Turks",
    "Turkish Brisbane",
    "Brisbane Turkish Community",
    "Turkish doctor Brisbane",
    "Turkish lawyer Brisbane",
    "Turkish restaurant South Bank",
    "Turkish grocery Brisbane",
    "Queensland Turkish Expats",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "QLD Turks | Community Hub & Local Directory",
    description:
      "Find Turkish-speaking professionals and join the Queensland Turkish WhatsApp community safely.",
    url: "https://qldturks.com",
    siteName: "QLD Turks",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turkish Brisbane | Directory & Community Hub",
    description:
      "Find Turkish-speaking professionals and join the Brisbane Turkish WhatsApp community safely.",
  },
};

import { LayoutShell } from "@/components/layout-shell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
