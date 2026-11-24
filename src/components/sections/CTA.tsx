"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations, WA_LINK } from "@/data/translations";

export const CTA: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].cta;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const waUrl = WA_LINK;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { scale: 0.98, opacity: 0, y: 24 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={containerRef}
      className="py-20 md:py-36 px-5 sm:px-8 md:px-16 bg-[#08080A] relative overflow-hidden border-b border-white/10"
    >
      <span id="contact" className="sr-only" />
      <div className="max-w-7xl mx-auto">
        <div
          ref={contentRef}
          className="relative p-8 sm:p-14 md:p-24 rounded-3xl bg-[#0F0F12] border border-white/10 text-center flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Section Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-neutral-400 text-xs tracking-widest uppercase mb-6 sm:mb-8 z-10 font-medium">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>

          {/* Monumental Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase text-[#F4F4F6] leading-[0.95] mb-6 sm:mb-8 z-10">
            {t.line1}<br />
            <span className="text-white">
              {t.line2}
            </span>
          </h2>

          <p className="text-[#8E8E9A] text-sm sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-12 z-10">
            {t.description}
          </p>

          {/* Magnetic CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 z-10">
            <MagneticButton strength={0.3}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
                className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-bold text-sm sm:text-base tracking-wider uppercase hover:bg-neutral-200 transition-all duration-300 flex items-center space-x-3 cursor-pointer shadow-lg"
                data-cursor="TALK"
              >
                <span>{t.startProject}</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href="mailto:contact@ekscoder.com"
                suppressHydrationWarning
                className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#181820] border border-white/10 text-white font-bold text-sm sm:text-base tracking-wider uppercase hover:bg-white/10 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
                data-cursor="MAIL"
              >
                <Mail className="w-5 h-5 text-white" />
                <span>contact@ekscoder.com</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
