"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "ID";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("ID");

  useEffect(() => {
    // Purge legacy storage keys to eliminate stale "EN" cache
    try {
      localStorage.removeItem("ekscoder_lang");
      localStorage.removeItem("ekscoder_lang_v2");

      const userSelected = localStorage.getItem("ekscoder_user_lang") as Language;
      if (userSelected === "EN") {
        setLanguageState("EN");
      } else {
        // Default strictly to Indonesian (ID)
        setLanguageState("ID");
        localStorage.setItem("ekscoder_user_lang", "ID");
      }
    } catch {
      setLanguageState("ID");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("ekscoder_user_lang", lang);
    } catch {}
  };

  const toggleLanguage = () => {
    const nextLang = language === "EN" ? "ID" : "EN";
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
