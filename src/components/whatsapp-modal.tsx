"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, MessageCircle, AlertCircle, ExternalLink, CheckSquare, Square } from "lucide-react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink?: string;
}

export function WhatsAppModal({
  isOpen,
  onClose,
  whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://chat.whatsapp.com/sample-turkish-brisbane-invite",
}: WhatsAppModalProps) {
  const [agreed, setAgreed] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);

  // Reset state when modal is opened/closed
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
      title="Brisbane Turkish Community WhatsApp"
      description="Lütfen topluluk kurallarını okuyup onaylayınız. Please review the rules to access the invite link."
      maxWidth="md"
    >
      <div className="space-y-4 pt-1">
        {/* Anti-Scraping / Bot Shield Banner */}
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-3.5 border border-amber-200/80 text-amber-900 text-xs dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200">
          <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Bot ve Spam Koruması / Human Verification</p>
            <p className="mt-0.5 text-stone-600 dark:text-stone-300">
              To protect our Brisbane community from commercial spammers and automated bots, group access requires explicit agreement to our rules.
            </p>
          </div>
        </div>

        {/* Community Rules List */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2.5 text-xs text-stone-700 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300">
          <div className="flex items-start gap-2">
            <span className="font-bold text-red-600 dark:text-red-400 shrink-0">1.</span>
            <span><strong>Saygı ve Hoşgörü:</strong> Maintain a respectful, supportive, and harassment-free atmosphere at all times.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-red-600 dark:text-red-400 shrink-0">2.</span>
            <span><strong>Spam ve Reklam Yasağı:</strong> No unsolicited direct messaging, repetitive marketing, MLM schemes, or crypto promotion.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-red-600 dark:text-red-400 shrink-0">3.</span>
            <span><strong>Yerel Odak:</strong> Focus on Brisbane and Queensland topics: accommodation, job leads, immigration advice, and social gatherings.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-red-600 dark:text-red-400 shrink-0">4.</span>
            <span><strong>Güvenlik ve Gizlilik:</strong> Never share other members&apos; personal contact details without their express permission.</span>
          </div>
        </div>

        {/* Checkbox Acknowledgment */}
        <div
          onClick={() => setAgreed(!agreed)}
          className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 hover:bg-stone-50/80 dark:border-stone-800 dark:hover:bg-stone-800/50 cursor-pointer select-none transition-colors"
        >
          {agreed ? (
            <CheckSquare className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <Square className="h-5 w-5 text-stone-400 shrink-0" />
          )}
          <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
            Topluluk kurallarını kabul ediyorum • I understand and agree to adhere to the community guidelines.
          </span>
        </div>

        {/* Action Button */}
        {!revealed ? (
          <Button
            type="button"
            variant="default"
            disabled={!agreed}
            onClick={handleReveal}
            className="w-full h-11 text-sm font-semibold justify-center bg-red-700 hover:bg-red-800 disabled:opacity-50"
          >
            Verify & Reveal Invite Link
          </Button>
        ) : (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center dark:bg-emerald-950/40 dark:border-emerald-900">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block">
                ✓ Doğrulandı / Verified: Click below to join
              </span>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 hover:shadow-xl transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              Open WhatsApp Group Invite
              <ExternalLink className="h-4 w-4 opacity-75" />
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}

