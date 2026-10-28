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
  metadataBase: new URL("https://turkishbrisbane.com"),
  title: {
    default: "Turkish Brisbane | Local Business Directory & Community Hub",
    template: "%s | Turkish Brisbane",
  },
  description:
    "Official directory and community portal for Turkish speakers in Brisbane, Queensland. Verified medical, legal, food, trade services and WhatsApp community connection.",
  applicationName: "Turkish Brisbane",
  authors: [{ name: "Turkish Brisbane Community" }],
  generator: "Next.js",
  keywords: [
    "Turkish Brisbane",
    "Brisbane Turkish Community",
    "Turkish doctor Brisbane",
    "Turkish lawyer Brisbane",
    "Turkish restaurant South Bank",
    "Turkish grocery Brisbane",
    "Queensland Turkish Expats",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Turkish Brisbane | Directory & Community Hub",
    description:
      "Find Turkish-speaking professionals and join the Brisbane Turkish WhatsApp community safely.",
    url: "https://turkishbrisbane.com",
    siteName: "Turkish Brisbane",
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
      <body className="min-h-full flex flex-col font-sans bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        {children}
      </body>
    </html>
  );
}
