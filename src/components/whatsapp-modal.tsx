"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  MessageCircle,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Lock,
  Unlock,
  Users,
  Sparkles,
} from "lucide-react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink?: string;
}

const COMMUNITY_RULES = [
  {
    id: 1,
    title: "Saygı ve Nezaket / Respect & Courtesy",
    desc: "Maintain a respectful, friendly, and harassment-free atmosphere. No political hostility or insults.",
  },
  {
    id: 2,
    title: "Spam ve Reklam Yasağı / Zero Spam Policy",
    desc: "No unsolicited direct messaging, repetitive business spam, crypto shills, or MLM schemes.",
  },
  {
    id: 3,
    title: "Queensland & Brisbane Odaklı / Local Focus",
    desc: "Focus on Brisbane, Gold Coast, Sunshine Coast, and QLD life: housing, jobs, migration, and family gatherings.",
  },
  {
    id: 4,
    title: "Güvenlik ve Gizlilik / Privacy & Safety",
    desc: "Never scrape member numbers or share someone's personal contact details without explicit consent.",
  },
];

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
      title="Brisbane Turkish Community Hub"
      description="Official QLD Turks WhatsApp Group • Topluluk Katılım Kapısı"
      maxWidth="md"
    >
      <div className="space-y-4 pt-1">
        {/* Anti-Bot Verification Banner with Turquoise Accent */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 via-teal-50/50 to-white p-4 border border-teal-200/90 text-teal-950 dark:from-teal-950/40 dark:via-stone-900 dark:to-stone-900 dark:border-teal-800/80 dark:text-teal-100 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-xs uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  Bot Koruması & Doğrulama
                </p>
                <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping" />
              </div>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                To keep our community safe from automated spam, marketing bots, and scam numbers, group entry requires accepting our community charter.
              </p>
            </div>
          </div>
        </div>

        {/* Community Rules List */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 px-1">
            Topluluk İlkeleri • Guidelines:
          </p>
          <div className="rounded-2xl border border-stone-200/90 bg-stone-50/80 p-3.5 space-y-2 text-xs text-stone-700 dark:border-stone-800 dark:bg-stone-900/70 dark:text-stone-300">
            {COMMUNITY_RULES.map((rule) => (
              <div key={rule.id} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 font-bold text-[10px] shrink-0 mt-0.5">
                  {rule.id}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {rule.title}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Checkbox Acknowledgment */}
        <button
          type="button"
          onClick={() => setAgreed(!agreed)}
          className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer select-none transition-all text-left ${
            agreed
              ? "border-teal-500 bg-teal-50/70 text-teal-900 dark:bg-teal-950/30 dark:border-teal-500/80 dark:text-teal-200 shadow-sm"
              : "border-stone-200/90 bg-white hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800/60 text-stone-700 dark:text-stone-300"
          }`}
        >
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors shrink-0 ${
              agreed
                ? "bg-teal-600 border-teal-600 text-white"
                : "border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
            }`}
          >
            {agreed && <CheckCircle2 className="h-4 w-4" />}
          </div>
          <span className="text-xs font-semibold leading-snug">
            Kuralları okudum ve kabul ediyorum • I understand and agree to adhere strictly to the community guidelines.
          </span>
        </button>

        {/* Action Button: Locked vs Unlocked */}
        {!revealed ? (
          <Button
            type="button"
            disabled={!agreed}
            onClick={handleReveal}
            className={`w-full h-12 text-sm font-bold justify-center gap-2 rounded-2xl transition-all shadow-md ${
              agreed
                ? "bg-gradient-to-r from-red-600 via-rose-600 to-teal-600 hover:from-red-700 hover:to-teal-700 text-white shadow-red-600/20 active:scale-98"
                : "bg-stone-200 text-stone-400 dark:bg-stone-800 dark:text-stone-500 cursor-not-allowed"
            }`}
          >
            {agreed ? (
              <>
                <Unlock className="h-4 w-4" />
                <span>Verify & Unlock WhatsApp Link</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Please Agree to the Rules Above</span>
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-3 pt-1 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl text-center dark:from-teal-950/40 dark:to-emerald-950/40 dark:border-teal-800">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-200 flex items-center justify-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                Doğrulama Başarılı! • Identity Verified
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                Click below to open the official Brisbane & Queensland group in WhatsApp.
              </p>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#20ba5a] hover:shadow-xl active:scale-98 transition-all"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              <span>Join WhatsApp Group (Gruba Katıl)</span>
              <ExternalLink className="h-4 w-4 opacity-80" />
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
