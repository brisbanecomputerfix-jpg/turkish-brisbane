"use client";

import * as React from "react";
import { useApp } from "@/context/app-context";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Type, Sparkles, RotateCcw, Check, ZapOff } from "lucide-react";

export function AccessibilityPanel() {
  const { isA11yOpen, setA11yOpen, a11ySettings, updateA11y, resetA11y } = useApp();

  return (
    <Modal
      isOpen={isA11yOpen}
      onClose={() => setA11yOpen(false)}
      title="Accessibility Preferences / Erişilebilirlik"
      description="Customize text size, contrast, and motion for a comfortable browsing experience."
      maxWidth="md"
    >
      <div className="space-y-6 pt-2">
        {/* Text Size */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Type className="h-4 w-4 text-[#E30A17]" />
            <span>Text Sizing / Yazı Boyutu</span>
          </label>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {(
              [
                { id: "normal", label: "Default (100%)", example: "Aa" },
                { id: "md", label: "Medium (112%)", example: "Aa+" },
                { id: "lg", label: "Large (125%)", example: "Aa++" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateA11y("textSize", opt.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  a11ySettings.textSize === opt.id
                    ? "border-[#E30A17] bg-red-50/50 text-[#E30A17] ring-1 ring-[#E30A17]"
                    : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                }`}
              >
                <span className="text-base font-bold">{opt.example}</span>
                <span className="text-[11px] mt-1 font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <Eye className="h-4 w-4 text-[#E30A17]" />
              <span>High Contrast Mode / Yüksek Karşıtlık</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Enhances text contrast and underlines all interactive hyperlinks.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={a11ySettings.highContrast}
            onClick={() => updateA11y("highContrast", !a11ySettings.highContrast)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              a11ySettings.highContrast ? "bg-[#E30A17]" : "bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                a11ySettings.highContrast ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <ZapOff className="h-4 w-4 text-[#E30A17]" />
              <span>Reduced Motion / Hareketi Azalt</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Disables animations and transitions for sensitive eyes.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={a11ySettings.reducedMotion}
            onClick={() => updateA11y("reducedMotion", !a11ySettings.reducedMotion)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              a11ySettings.reducedMotion ? "bg-[#E30A17]" : "bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                a11ySettings.reducedMotion ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Dyslexia-Friendly Reading Spacing */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <Sparkles className="h-4 w-4 text-[#E30A17]" />
              <span>Enhanced Readability & Spacing</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Increases letter spacing and line height for effortless readability.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={a11ySettings.dyslexicFont}
            onClick={() => updateA11y("dyslexicFont", !a11ySettings.dyslexicFont)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              a11ySettings.dyslexicFont ? "bg-[#E30A17]" : "bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                a11ySettings.dyslexicFont ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Reset and Close */}
        <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={resetA11y}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => setA11yOpen(false)}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}

