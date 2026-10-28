"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  MapPin,
  Phone,
  Globe,
  Tag,
} from "lucide-react";
import { submitBusinessAction, SubmitBusinessState } from "@/actions/businesses";

interface SubmitBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "Food & Groceries",
  "Medical",
  "Legal",
  "Tech Support & IT",
  "Trades",
  "Education",
];

export function SubmitBusinessModal({
  isOpen,
  onClose,
}: SubmitBusinessModalProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [result, setResult] = React.useState<SubmitBusinessState | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setIsPending(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await submitBusinessAction(null, formData);
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
      title="List Your Business in QLD Turks"
      description="İşletmenizi Queensland Türk Rehberi'ne ekleyin. Verified listings are 100% free."
      maxWidth="lg"
    >
      {result?.success ? (
        <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 shadow-md shadow-teal-500/20">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-stone-900 dark:text-white">
              Teşekkürler! Listing Received
            </h4>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
              Your business has been saved with a <strong className="text-teal-600 dark:text-teal-400">pending moderation</strong> status. Our volunteer community admins will review and publish it within 24-48 hours.
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="turquoise"
              onClick={onClose}
              className="font-bold px-6 shadow-md"
            >
              Done & Return to Directory
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Top highlight bar */}
          <div className="flex items-center gap-2 rounded-xl bg-teal-50/80 p-3 text-xs text-teal-900 border border-teal-200/80 dark:bg-teal-950/30 dark:border-teal-800 dark:text-teal-200">
            <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>
              All submissions are completely free for Australian-Turkish and bilingual service providers across Queensland.
            </span>
          </div>

          {result?.message && !result.success && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{result.message}</span>
            </div>
          )}

          {/* Business Name */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Business Name * <span className="font-normal text-stone-400">(İşletme Adı)</span>
            </label>
            <Input
              name="name"
              required
              placeholder="e.g. Anatolia Kebabs & Bakery, Dr. Ayşe Yılmaz"
              disabled={isPending}
              className="focus-visible:ring-teal-500 focus-visible:border-teal-500"
            />
            {result?.errors?.name && (
              <p className="text-red-500 text-[11px] mt-1">{result.errors.name[0]}</p>
            )}
          </div>

          {/* Category & Suburb row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Category * <span className="font-normal text-stone-400">(Kategori)</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  required
                  disabled={isPending}
                  defaultValue="Food & Groceries"
                  className="flex h-10 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {result?.errors?.category && (
                <p className="text-red-500 text-[11px] mt-1">{result.errors.category[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Brisbane Suburb / City * <span className="font-normal text-stone-400">(Semt/Şehir)</span>
              </label>
              <Input
                name="suburb"
                required
                placeholder="e.g. South Bank, Chermside, Gold Coast"
                disabled={isPending}
                className="focus-visible:ring-teal-500 focus-visible:border-teal-500"
              />
              {result?.errors?.suburb && (
                <p className="text-red-500 text-[11px] mt-1">{result.errors.suburb[0]}</p>
              )}
            </div>
          </div>

          {/* Phone & Website row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Phone Number * <span className="font-normal text-stone-400">(Telefon Numarası)</span>
              </label>
              <Input
                name="phone"
                required
                type="tel"
                placeholder="e.g. +61 7 3000 0000 or 0400 123 456"
                disabled={isPending}
                className="focus-visible:ring-teal-500 focus-visible:border-teal-500"
              />
              {result?.errors?.phone && (
                <p className="text-red-500 text-[11px] mt-1">{result.errors.phone[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Website or Instagram <span className="font-normal text-stone-400">(İsteğe Bağlı)</span>
              </label>
              <Input
                name="website"
                type="url"
                placeholder="https://..."
                disabled={isPending}
                className="focus-visible:ring-teal-500 focus-visible:border-teal-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Description & Services * <span className="font-normal text-stone-400">(Tanıtım ve Detaylar)</span>
            </label>
            <Textarea
              name="description"
              required
              rows={3}
              placeholder="Tell our community about your specialties, Turkish/English speaking team, menu items, or discounts for students..."
              disabled={isPending}
              className="focus-visible:ring-teal-500 focus-visible:border-teal-500 rounded-xl"
            />
            {result?.errors?.description && (
              <p className="text-red-500 text-[11px] mt-1">{result.errors.description[0]}</p>
            )}
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
              variant="turkish"
              className="min-w-[140px] font-bold shadow-md shadow-red-600/20 active:scale-95"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Submit Business"
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
