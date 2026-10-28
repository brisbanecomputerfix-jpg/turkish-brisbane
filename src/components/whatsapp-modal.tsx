"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, MessageCircle, ExternalLink, CheckSquare, Square } from "lucide-react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink?: string;
}

const RULES = [
  "Maintain a respectful, friendly atmosphere for all members.",
  "No commercial spam, crypto promotions, or unsolicited direct messaging.",
  "Focus on Queensland & Brisbane topics (housing, jobs, events, mutual aid).",
  "Respect privacy: never share member phone numbers or details externally.",
];

export function WhatsAppModal({
  isOpen,
  onClose,
  whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://chat.whatsapp.com/sample-turkish-brisbane-invite",
}: WhatsAppModalProps) {
  const [agreed, setAgreed] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setAgreed(false);
      setRevealed(false);
    }
  }, [isOpen]);

  const handleReveal = () => {
    if (agreed) {
      setRevealed(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Join Queensland Turkish WhatsApp"
      description="Lütfen topluluk kurallarını okuyunuz. Please review our community guidelines to access the link."
      maxWidth="md"
    >
      <div className="space-y-4 pt-1">
        {/* Anti-spam notice */}
        <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-3.5 border border-zinc-200 text-zinc-800 text-xs dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
          <ShieldCheck className="h-5 w-5 text-[#E30A17] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              Anti-Spam Verification
            </p>
            <p className="mt-0.5 text-zinc-600 dark:text-zinc-300">
              To keep our community safe from commercial marketing bots, group access requires explicit agreement to our rules.
            </p>
          </div>
        </div>

        {/* Guidelines list */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-2 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          {RULES.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="font-bold text-[#E30A17] shrink-0">{idx + 1}.</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>

        {/* Checkbox */}
        <div
          onClick={() => setAgreed(!agreed)}
          className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 cursor-pointer select-none transition-colors"
        >
          {agreed ? (
            <CheckSquare className="h-4 w-4 text-[#E30A17] shrink-0" />
          ) : (
            <Square className="h-4 w-4 text-zinc-400 shrink-0" />
          )}
          <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
            Kuralları okudum ve kabul ediyorum • I agree to adhere to the community guidelines.
          </span>
        </div>

        {/* Action button */}
        {!revealed ? (
          <Button
            type="button"
            disabled={!agreed}
            onClick={handleReveal}
            variant="turkish"
            className="w-full h-11 text-sm font-semibold justify-center"
          >
            Verify & Reveal Invite Link
          </Button>
        ) : (
          <div className="space-y-3 pt-1">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-[#20ba5a] transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Open WhatsApp Group</span>
              <ExternalLink className="h-4 w-4 opacity-75" />
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
