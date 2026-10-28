"use client";

import * as React from "react";
import { Modal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitNoticeAction, SubmitNoticeState } from "@/actions/notices";

interface SubmitNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitNoticeModal({ isOpen, onClose }: SubmitNoticeModalProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [result, setResult] = React.useState<SubmitNoticeState | null>(null);

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
      title="Post a Community Notice or Order"
      description="Topluluk panosuna duyuru veya toplu sipariş ekleyin."
      maxWidth="md"
    >
      {result?.success ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
              Notice Published
            </h4>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
              Your announcement is now live on the Queensland noticeboard.
            </p>
          </div>
          <Button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold"
          >
            Done
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

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Title * <span className="font-normal text-zinc-400">(Başlık)</span>
            </label>
            <Input
              name="title"
              required
              placeholder="e.g. Kurukahveci Mehmet Efendi 500g Group Buy, Room in Toowong"
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Notice Type * <span className="font-normal text-zinc-400">(Tür)</span>
              </label>
              <select
                name="type"
                required
                defaultValue="bulk_order"
                disabled={isPending}
                className="flex h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              >
                <option value="bulk_order">Bulk Order / Toplu Sipariş</option>
                <option value="job">Job or Room Rental / İlan</option>
                <option value="general">General / Genel Duyuru</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Contact Info * <span className="font-normal text-zinc-400">(İletişim)</span>
              </label>
              <Input
                name="contactInfo"
                required
                placeholder="WhatsApp, Phone, or Email"
                disabled={isPending}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Details * <span className="font-normal text-zinc-400">(Açıklama)</span>
            </label>
            <Textarea
              name="content"
              required
              rows={4}
              placeholder="Provide exact pricing, pickup location, delivery timeline, or conditions..."
              disabled={isPending}
            />
          </div>

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
                  Posting...
                </>
              ) : (
                "Post Notice"
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
