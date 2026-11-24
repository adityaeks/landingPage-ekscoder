"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export const Introduction: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].manifesto;

  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          }
        );
      }

      if (pillarsRef.current) {
        const cards = pillarsRef.current.querySelectorAll(".pillar-card");
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: idx * 0.1,
              ease: "power2.out",
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-16 bg-[#08080A] text-white relative border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Pill Badge */}
        <div className="flex items-center space-x-3 text-xs tracking-[0.25em] text-neutral-400 uppercase mb-8 font-medium">
          <span className="w-6 h-[1px] bg-white/40" />
          <span>{t.badge}</span>
        </div>

        {/* Monumental Editorial Headline */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] text-[#F4F4F6] max-w-5xl mb-14 md:mb-20"
        >
          {t.heading}
        </h2>

        {/* Narrative Two-Column Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pb-16 md:pb-24 border-b border-white/10 text-[#8E8E9A] text-base sm:text-lg md:text-xl font-light leading-relaxed">
          <p>{t.paragraph1}</p>
          <p>{t.paragraph2}</p>
        </div>

        {/* Core Principles Grid */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-16 md:pt-20"
        >
          {t.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="pillar-card p-6 sm:p-8 rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="text-2xl sm:text-3xl font-black text-white/30 group-hover:text-white transition-colors duration-300">
                  {pillar.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F4F4F6] tracking-tight uppercase">
                  {pillar.title}
                </h3>
              </div>
              <p className="mt-6 text-sm sm:text-base text-[#8E8E9A] group-hover:text-[#C8C8D4] leading-relaxed transition-colors duration-300">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
