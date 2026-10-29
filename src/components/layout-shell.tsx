"use client";

import * as React from "react";
import { AppProvider, useApp } from "@/context/app-context";
import { Navbar } from "@/components/navbar";
import { SaasSidebar } from "@/components/saas-sidebar";
import { AccessibilityPanel } from "@/components/accessibility-panel";
import { Footer } from "@/components/footer";
import { WhatsAppModal } from "@/components/whatsapp-modal";
import { SubmitBusinessModal } from "@/components/submit-business-modal";
import { SubmitNoticeModal } from "@/components/submit-notice-modal";

function ShellContent({ children }: { children: React.ReactNode }) {
  const {
    isWhatsAppOpen,
    setWhatsAppOpen,
    isSubmitBusinessOpen,
    setSubmitBusinessOpen,
    isSubmitNoticeOpen,
    setSubmitNoticeOpen,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased selection:bg-red-50 selection:text-[#E30A17]">
      {/* Global Top Navbar */}
      <Navbar />

      {/* Slide-out SaaS Sidebar */}
      <SaasSidebar />

      {/* Accessible Control Panel */}
      <AccessibilityPanel />

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setWhatsAppOpen(false)}
      />

      <SubmitBusinessModal
        isOpen={isSubmitBusinessOpen}
        onClose={() => setSubmitBusinessOpen(false)}
      />

      <SubmitNoticeModal
        isOpen={isSubmitNoticeOpen}
        onClose={() => setSubmitNoticeOpen(false)}
      />
    </div>
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ShellContent>{children}</ShellContent>
    </AppProvider>
  );
}

