"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instant safe submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mx-auto mb-3">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-100">
          Message Received / Mesajınız Alındı
        </h3>
        <p className="mt-2 text-xs text-emerald-800/80 dark:text-emerald-300/80 max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out. A member of the QLD Turks volunteer committee will get back to your email within 24–48 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
          }}
          className="mt-4 text-xs font-semibold text-emerald-700 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
          Your Name / Adınız Soyadınız <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Canan Demir"
          className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#E30A17] focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
          Email Address / E-posta <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="e.g. canan@example.com"
          className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#E30A17] focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
          Topic / Konu
        </label>
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#E30A17] focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="General Inquiry">General Community Inquiry</option>
          <option value="Business Verification">Business Listing Verification / Update</option>
          <option value="WhatsApp Membership">WhatsApp Hub Access Assistance</option>
          <option value="Noticeboard Report">Report Notice or Inaccurate Information</option>
          <option value="Partnership">Volunteer or University Society Collaboration</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
          Message / Mesajınız <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can our community team assist you?"
          className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#E30A17] focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <Button
        type="submit"
        variant="turkish"
        size="lg"
        disabled={loading}
        className="w-full gap-2 text-xs font-semibold"
      >
        <Send className="h-3.5 w-3.5" />
        <span>{loading ? "Sending..." : "Send Message"}</span>
      </Button>
    </form>
  );
}
