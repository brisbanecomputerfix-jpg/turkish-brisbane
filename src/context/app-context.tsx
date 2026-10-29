"use client";

import * as React from "react";
import { translations, Language, getTranslation } from "@/lib/i18n";

export type TextSize = "normal" | "md" | "lg";

export interface A11ySettings {
  textSize: TextSize;
  highContrast: boolean;
  reducedMotion: boolean;
  dyslexicFont: boolean;
}

const defaultA11ySettings: A11ySettings = {
  textSize: "normal",
  highContrast: false,
  reducedMotion: false,
  dyslexicFont: false,
};

interface AppContextType {
  // Navigation & Drawers
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Modals
  isWhatsAppOpen: boolean;
  setWhatsAppOpen: (open: boolean) => void;
  isSubmitBusinessOpen: boolean;
  setSubmitBusinessOpen: (open: boolean) => void;
  isSubmitNoticeOpen: boolean;
  setSubmitNoticeOpen: (open: boolean) => void;

  // Accessibility
  isA11yOpen: boolean;
  setA11yOpen: (open: boolean) => void;
  a11ySettings: A11ySettings;
  updateA11y: <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => void;
  resetA11y: () => void;

  // Localization (Language)
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations) => string;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isWhatsAppOpen, setWhatsAppOpen] = React.useState(false);
  const [isSubmitBusinessOpen, setSubmitBusinessOpen] = React.useState(false);
  const [isSubmitNoticeOpen, setSubmitNoticeOpen] = React.useState(false);
  const [isA11yOpen, setA11yOpen] = React.useState(false);

  const [a11ySettings, setA11ySettings] = React.useState<A11ySettings>(defaultA11ySettings);
  const [language, setLanguageState] = React.useState<Language>("en");

  // Load language and accessibility settings from localStorage on client mount
  React.useEffect(() => {
    try {
      const savedLang = localStorage.getItem("qldturks_lang") as Language;
      if (savedLang === "tr" || savedLang === "en") {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      }
      const saved = localStorage.getItem("qldturks_a11y");
      if (saved) {
        const parsed = JSON.parse(saved);
        setA11ySettings({ ...defaultA11ySettings, ...parsed });
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    try {
      localStorage.setItem("qldturks_lang", lang);
    } catch {
      // ignore
    }
  }, []);

  const toggleLanguage = React.useCallback(() => {
    setLanguageState((prev: Language) => {
      const next: Language = prev === "en" ? "tr" : "en";
      if (typeof document !== "undefined") {
        document.documentElement.lang = next;
      }
      try {
        localStorage.setItem("qldturks_lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const t = React.useCallback(
    (key: keyof typeof translations) => {
      return getTranslation(key, language);
    },
    [language]
  );

  // Apply classes to documentElement when a11ySettings change
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Text size
    root.classList.remove("a11y-text-md", "a11y-text-lg");
    if (a11ySettings.textSize === "md") root.classList.add("a11y-text-md");
    if (a11ySettings.textSize === "lg") root.classList.add("a11y-text-lg");

    // High contrast
    if (a11ySettings.highContrast) {
      root.classList.add("a11y-high-contrast");
    } else {
      root.classList.remove("a11y-high-contrast");
    }

    // Reduced motion
    if (a11ySettings.reducedMotion) {
      root.classList.add("a11y-reduced-motion");
    } else {
      root.classList.remove("a11y-reduced-motion");
    }

    // Dyslexic font
    if (a11ySettings.dyslexicFont) {
      root.classList.add("a11y-dyslexic");
    } else {
      root.classList.remove("a11y-dyslexic");
    }

    try {
      localStorage.setItem("qldturks_a11y", JSON.stringify(a11ySettings));
    } catch {
      // Ignore
    }
  }, [a11ySettings]);

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const updateA11y = React.useCallback(
    <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
      setA11ySettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetA11y = React.useCallback(() => {
    setA11ySettings(defaultA11ySettings);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        isWhatsAppOpen,
        setWhatsAppOpen,
        isSubmitBusinessOpen,
        setSubmitBusinessOpen,
        isSubmitNoticeOpen,
        setSubmitNoticeOpen,
        isA11yOpen,
        setA11yOpen,
        a11ySettings,
        updateA11y,
        resetA11y,
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

