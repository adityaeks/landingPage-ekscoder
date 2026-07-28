"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070707] text-white pt-20 pb-12 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/80">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#hero" className="text-3xl font-extrabold font-mono tracking-tighter text-white">
              EKSCODER<span className="text-[#B8FF00]">.</span>
            </a>
            <p className="text-neutral-400 font-light text-sm max-w-sm leading-relaxed">
              Building digital experiences through code, creativity, and technology. Focused on modern web apps, scalable software, and motion design.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-sm">
            <div className="text-xs text-[#B8FF00] tracking-widest uppercase mb-2 font-bold">
              // NAVIGATION
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  01 // WORK
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  02 // SERVICES
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  03 // ABOUT
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  04 // PROCESS
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-3 font-mono text-sm">
            <div className="text-xs text-[#B8FF00] tracking-widest uppercase mb-2 font-bold">
              // SOCIAL CHANNELS
            </div>
            <div className="grid grid-cols-2 gap-3 text-neutral-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#B8FF00] transition-colors"
                data-cursor="LINK"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#B8FF00] transition-colors"
                data-cursor="LINK"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#B8FF00] transition-colors"
                data-cursor="LINK"
              >
                Instagram ↗
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#B8FF00] transition-colors"
                data-cursor="LINK"
              >
                X (Twitter) ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-500 gap-4">
          <div>© 2026 EKSCODER. ALL RIGHTS RESERVED.</div>

          <div className="flex items-center space-x-6">
            <span>DARK CREATIVE TECHNOLOGY</span>
            <MagneticButton strength={0.3} onClick={scrollToTop}>
              <button
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-[#B8FF00] hover:text-black hover:border-[#B8FF00] text-neutral-400 flex items-center justify-center transition-all duration-300"
                aria-label="Back to Top"
                data-cursor="TOP"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
};
