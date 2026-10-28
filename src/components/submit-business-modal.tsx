"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
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
      title="List Your Business in the Directory"
      description="İşletmenizi Queensland Türk Rehberi'ne ekleyin. Verified listings are 100% free."
      maxWidth="lg"
    >
      {result?.success ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
              Listing Submitted
            </h4>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300 max-w-sm mx-auto">
              Your business has been received. Our community admins will review and publish it within 24-48 hours.
            </p>
          </div>
          <Button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold"
          >
            Done & Return to Directory
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {result?.message && !result.success && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{result.message}</span>
            </div>
          )}

          {/* Business Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Business Name * <span className="font-normal text-zinc-400">(İşletme Adı)</span>
            </label>
            <Input
              name="name"
              required
              placeholder="e.g. Bosphorus Meze & Grill, Dr. Ayşe Yılmaz"
              disabled={isPending}
            />
            {result?.errors?.name && (
              <p className="text-red-500 text-[11px] mt-1">{result.errors.name[0]}</p>
            )}
          </div>

          {/* Category & Suburb row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Category * <span className="font-normal text-zinc-400">(Kategori)</span>
              </label>
              <select
                name="category"
                required
                disabled={isPending}
                defaultValue="Food & Groceries"
                className="flex h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {result?.errors?.category && (
                <p className="text-red-500 text-[11px] mt-1">{result.errors.category[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Queensland Suburb / City * <span className="font-normal text-zinc-400">(Semt/Şehir)</span>
              </label>
              <Input
                name="suburb"
                required
                placeholder="e.g. South Bank, Chermside, Gold Coast"
                disabled={isPending}
              />
              {result?.errors?.suburb && (
                <p className="text-red-500 text-[11px] mt-1">{result.errors.suburb[0]}</p>
              )}
            </div>
          </div>

          {/* Phone & Website row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Phone Number * <span className="font-normal text-zinc-400">(Telefon)</span>
              </label>
              <Input
                name="phone"
                required
                type="tel"
                placeholder="e.g. +61 400 123 456"
                disabled={isPending}
              />
              {result?.errors?.phone && (
                <p className="text-red-500 text-[11px] mt-1">{result.errors.phone[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Website or Social URL <span className="font-normal text-zinc-400">(Opsiyonel)</span>
              </label>
              <Input
                name="website"
                type="url"
                placeholder="https://..."
                disabled={isPending}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Description & Services * <span className="font-normal text-zinc-400">(Tanıtım)</span>
            </label>
            <Textarea
              name="description"
              required
              rows={3}
              placeholder="Describe your specialties, opening hours, bilingual staff, or special offerings..."
              disabled={isPending}
            />
            {result?.errors?.description && (
              <p className="text-red-500 text-[11px] mt-1">{result.errors.description[0]}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              variant="turkish"
              className="min-w-[120px]"
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
