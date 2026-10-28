"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Coffee,
  Briefcase,
  Bell,
  Sparkles,
} from "lucide-react";
import { submitNoticeAction, SubmitNoticeState } from "@/actions/notices";

interface SubmitNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitNoticeModal({ isOpen, onClose }: SubmitNoticeModalProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [result, setResult] = React.useState<SubmitNoticeState | null>(null);
  const [selectedType, setSelectedType] = React.useState("bulk_order");

  React.useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setIsPending(false);
      setSelectedType("bulk_order");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    formData.set("type", selectedType);

    try {
      const res = await submitNoticeAction(null, formData);
      setResult(res);
    } catch {
      setResult({
        success: false,
        message: "An unexpected network error occurred.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Post a Notice or Bulk Order"
      description="Topluluk panosuna yeni bir duyuru, iş/ev ilanı veya toplu sipariş ekleyin."
      maxWidth="md"
    >
      {result?.success ? (
        <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 shadow-md shadow-teal-500/20">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-stone-900 dark:text-white">
              Duyurunuz Yayında! • Notice Published
            </h4>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
              Your notice is now live on the Brisbane & Queensland Turkish community board.
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="turquoise"
              onClick={onClose}
              className="font-bold px-6 shadow-md"
            >
              Done & View Noticeboard
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {result?.message && !result.success && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{result.message}</span>
            </div>
          )}

          {/* Type Selector (Interactive Cards) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Notice Category * <span className="font-normal text-stone-400">(İlan Türü)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedType("bulk_order")}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedType === "bulk_order"
                    ? "border-teal-500 bg-teal-50 text-teal-900 dark:bg-teal-950/40 dark:border-teal-500 dark:text-teal-200 shadow-xs"
                    : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400"
                }`}
              >
                <Coffee className="h-4 w-4 mx-auto mb-1 text-teal-600 dark:text-teal-400" />
                <span className="text-[11px] font-bold block leading-tight">Bulk Order</span>
                <span className="text-[9px] text-stone-400 block">Toplu Sipariş</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType("job")}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedType === "job"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-200 shadow-xs"
                    : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400"
                }`}
              >
                <Briefcase className="h-4 w-4 mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-bold block leading-tight">Job / Housing</span>
                <span className="text-[9px] text-stone-400 block">İş & Ev İlanı</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType("general")}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedType === "general"
                    ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/40 dark:border-red-500 dark:text-red-200 shadow-xs"
                    : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400"
                }`}
              >
                <Bell className="h-4 w-4 mx-auto mb-1 text-red-600 dark:text-red-400" />
                <span className="text-[11px] font-bold block leading-tight">Community</span>
                <span className="text-[9px] text-stone-400 block">Duyuru & Etkinlik</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Title * <span className="font-normal text-stone-400">(Başlık)</span>
            </label>
            <Input
              name="title"
              required
              placeholder="e.g. Kurukahveci Mehmet Efendi 500g Group Buy, Room in Toowong"
              disabled={isPending}
              className="focus-visible:ring-teal-500 focus-visible:border-teal-500"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Contact Info * <span className="font-normal text-stone-400">(İletişim Bilgisi)</span>
            </label>
            <Input
              name="contactInfo"
              required
              placeholder="WhatsApp: +61 400 123 456 or contact@example.com"
              disabled={isPending}
              className="focus-visible:ring-teal-500 focus-visible:border-teal-500"
            />
          </div>

          {/* Details / Content */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Details & Instructions * <span className="font-normal text-stone-400">(Detaylar ve Koşullar)</span>
            </label>
            <Textarea
              name="content"
              required
              rows={4}
              placeholder="Provide exact pricing, pickup suburb (e.g. Sunnybank, Kangaroo Point), estimated delivery date, or vacancy requirements..."
              disabled={isPending}
              className="focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-xl"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              variant="turquoise"
              className="min-w-[140px] font-bold shadow-md shadow-teal-500/20 active:scale-95"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Notice Now"
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
