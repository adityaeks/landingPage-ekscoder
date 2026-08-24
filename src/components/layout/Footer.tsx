"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

import { useLanguage } from "@/context/LanguageContext";
import { translations, INSTAGRAM_LINK, TIKTOK_LINK } from "@/data/translations";

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;
  const navT = translations[language].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] relative z-10 text-white pt-20 pb-12 px-6 md:px-12 select-none border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/80">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#hero" suppressHydrationWarning className="text-3xl font-extrabold font-mono tracking-tighter text-white">
              EKSCODER<span className="text-[#B8FF00]">.</span>
            </a>
            <p className="text-neutral-400 font-light text-sm max-w-sm leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-sm">
            <div className="text-xs text-[#B8FF00] tracking-widest uppercase mb-2 font-bold">
              {t.navigationTitle}
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#about" suppressHydrationWarning className="hover:text-white transition-colors">
                  01 // {navT.about}
                </a>
              </li>
              {/* <li>
                <a href="#capabilities" suppressHydrationWarning className="hover:text-white transition-colors">
                  02 // {navT.capabilities}
                </a>
              </li> */}
              <li>
                <a href="#services" suppressHydrationWarning className="hover:text-white transition-colors">
                  03 // {navT.services}
                </a>
              </li>
              <li>
                <a href="#technologies" suppressHydrationWarning className="hover:text-white transition-colors">
                  04 // {navT.solutions}
                </a>
              </li>
              <li>
                <a href="#projects" suppressHydrationWarning className="hover:text-white transition-colors">
                  05 // {navT.project}
                </a>
              </li>
              <li>
                <a href="#process" suppressHydrationWarning className="hover:text-white transition-colors">
                  06 // {navT.process}
                </a>
              </li>
              <li>
                <a href="#blog" suppressHydrationWarning className="hover:text-white transition-colors">
                  07 // {navT.blog}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-3 font-mono text-sm">
            <div className="text-xs text-[#B8FF00] tracking-widest uppercase mb-2 font-bold">
              {t.socialTitle}
            </div>
            <div className="flex flex-col gap-2.5 text-neutral-400">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                suppressHydrationWarning
                className="group flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#B8FF00]/40 hover:text-white transition-all duration-300"
                data-cursor="LINK"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm font-medium">Instagram</span>
                  <span className="text-xs text-neutral-500 group-hover:text-neutral-400">@ekscoder</span>
                </div>
                <span className="text-[#B8FF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
              <a
                href={TIKTOK_LINK}
                target="_blank"
                rel="noreferrer"
                suppressHydrationWarning
                className="group flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#B8FF00]/40 hover:text-white transition-all duration-300"
                data-cursor="LINK"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm font-medium">TikTok</span>
                  <span className="text-xs text-neutral-500 group-hover:text-neutral-400">@ekscoder</span>
                </div>
                <span className="text-[#B8FF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-500 gap-4">
          <div>{t.rights}</div>

          <div className="flex items-center space-x-6">
            <span>{t.tagline}</span>
            {/* <MagneticButton strength={0.3} onClick={scrollToTop}>
              <button
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-[#B8FF00] hover:text-black hover:border-[#B8FF00] text-neutral-400 flex items-center justify-center transition-all duration-300"
                aria-label="Back to Top"
                data-cursor="TOP"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </MagneticButton> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
