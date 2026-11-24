"use client";

import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
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
    <footer suppressHydrationWarning className="bg-[#050507] relative z-10 text-white pt-20 pb-12 px-5 sm:px-8 md:px-16 select-none border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#hero"
              suppressHydrationWarning
              className="text-3xl font-extrabold tracking-tight text-[#F4F4F6] inline-block"
            >
              EKSCODER<span className="text-white">.</span>
            </a>
            <p suppressHydrationWarning className="text-[#8E8E9A] text-sm max-w-sm leading-relaxed">
              {t.description}
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#8E8E9A] pt-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="tracking-wider uppercase">AVAILABLE FOR Q1/Q2 PROJECTS</span>
            </div>
          </div>

          {/* Quick Navigation Links: Clean numbered index without // */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <div suppressHydrationWarning className="text-xs text-neutral-400 tracking-widest uppercase mb-3 font-semibold">
              {t.navigationTitle}
            </div>
            <ul className="space-y-2.5 text-[#8E8E9A]">
              <li>
                <a href="#about" suppressHydrationWarning className="hover:text-white transition-colors">
                  01. {navT.about}
                </a>
              </li>
              <li>
                <a href="#services" suppressHydrationWarning className="hover:text-white transition-colors">
                  02. {navT.services}
                </a>
              </li>
              <li>
                <a href="#projects" suppressHydrationWarning className="hover:text-white transition-colors">
                  03. {navT.project}
                </a>
              </li>
              <li>
                <a href="#process" suppressHydrationWarning className="hover:text-white transition-colors">
                  04. {navT.process}
                </a>
              </li>
              <li>
                <a href="#blog" suppressHydrationWarning className="hover:text-white transition-colors">
                  05. {navT.blog}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels & Contact */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <div suppressHydrationWarning className="text-xs text-neutral-400 tracking-widest uppercase mb-3 font-semibold">
              {t.socialTitle}
            </div>
            <div className="flex flex-col gap-2.5 text-[#8E8E9A]">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                suppressHydrationWarning
                className="group flex items-center justify-between p-3.5 rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300"
                data-cursor="LINK"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm font-medium">Instagram</span>
                  <span className="text-xs text-[#6E6E7C] group-hover:text-[#8E8E9A]">@ekscoder</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={TIKTOK_LINK}
                target="_blank"
                rel="noreferrer"
                suppressHydrationWarning
                className="group flex items-center justify-between p-3.5 rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300"
                data-cursor="LINK"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm font-medium">TikTok</span>
                  <span className="text-xs text-[#6E6E7C] group-hover:text-[#8E8E9A]">@ekscoder</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E9A]">
          <div>
            <span>{t.rights}</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hidden sm:inline text-[#6E6E7C] tracking-wider uppercase">
              SURABAYA, INDONESIA
            </span>

            <MagneticButton strength={0.2}>
              <button
                onClick={scrollToTop}
                suppressHydrationWarning
                className="flex items-center space-x-2 text-[#8E8E9A] hover:text-white transition-colors py-1 px-3 rounded-full border border-white/10 hover:border-white/40 cursor-pointer"
                aria-label="Back to top"
              >
                <span>{t.top}</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
};
