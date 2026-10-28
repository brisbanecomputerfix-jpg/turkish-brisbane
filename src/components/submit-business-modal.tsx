"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
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
      if (res.success) {
        // keep open briefly for confirmation
      }
    } catch (err) {
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
      description="İşletmenizi Brisbane Türk Topluluğu rehberine ekleyin. All listings are reviewed before publication."
      maxWidth="lg"
    >
      {result?.success ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-stone-900 dark:text-white">
              Teşekkürler! Listing Submitted
            </h4>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
              Your business has been saved with a <strong>pending</strong> status. Our Brisbane community admins will review and publish it shortly.
            </p>
          </div>
          <Button
            type="button"
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            Done & Return to Directory
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {result?.message && !result.success && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{result.message}</span>
            </div>
          )}

          {/* Business Name */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Business Name * (İşletme Adı)
            </label>
            <Input
              name="name"
              required
              placeholder="e.g. Bosphorus Meze & Grill"
              disabled={isPending}
            />
            {result?.errors?.name && (
              <p className="text-red-500 text-[11px] mt-1">{result.errors.name[0]}</p>
            )}
          </div>

          {/* Category & Suburb row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Category * (Kategori)
              </label>
              <select
                name="category"
                required
                disabled={isPending}
                defaultValue="Food & Groceries"
                className="flex h-10 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
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
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Brisbane Suburb * (Semt)
              </label>
              <Input
                name="suburb"
                required
                placeholder="e.g. South Bank, Indooroopilly"
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
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Phone Number * (Telefon)
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
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Website / Social URL (Web Sitesi)
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
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Description & Services * (Tanıtım ve Hizmetler)
            </label>
            <Textarea
              name="description"
              required
              rows={3}
              placeholder="Describe your specialties, bilingual staff, opening hours, or special offerings for community members..."
              disabled={isPending}
            />
            {result?.errors?.description && (
              <p className="text-red-500 text-[11px] mt-1">{result.errors.description[0]}</p>
            )}
          </div>

          {/* Notice info */}
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Note: All new listings undergo community moderation before appearing publicly to prevent spam and verify authenticity.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
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
              className="bg-red-700 hover:bg-red-800 text-white min-w-[120px]"
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
