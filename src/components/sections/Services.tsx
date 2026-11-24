"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations, WA_LINK } from "@/data/translations";

export const Services: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].services;

  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (listRef.current) {
        const rows = listRef.current.querySelectorAll(".discipline-row");
        rows.forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 30 },
            {
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.7,
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
      id="services"
      ref={containerRef}
      className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-16 bg-[#08080A] text-white relative border-b border-white/10"
    >
      <span id="solutions" className="sr-only" />
      <span id="technologies" className="sr-only" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs tracking-[0.25em] text-neutral-400 uppercase mb-4 font-medium">
              <span className="w-6 h-[1px] bg-white/40" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F4F6] uppercase">
              {t.title}
            </h2>
          </div>
          <p className="text-[#8E8E9A] max-w-md text-sm md:text-base leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Unified Disciplines Stack */}
        <div ref={listRef} className="space-y-6">
          {t.items.map((item, idx) => {
            const isHovered = activeItem === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveItem(idx)}
                className={`discipline-row group relative p-8 sm:p-10 md:p-12 rounded-3xl border transition-all duration-500 cursor-default ${
                  isHovered
                    ? "bg-[#0F0F14] border-white/25"
                    : "bg-[#0A0A0D] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number & Category */}
                  <div className="lg:col-span-3 flex lg:flex-col justify-between items-start">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white/30 group-hover:text-white transition-colors duration-300">
                      {item.number}
                    </span>
                    <span className="mt-2 text-xs tracking-widest text-neutral-300 uppercase font-semibold">
                      {item.category}
                    </span>
                  </div>

                  {/* Middle Column: Title & Description */}
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F4F4F6] tracking-tight uppercase group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#8E8E9A] group-hover:text-[#C8C8D4] text-sm sm:text-base leading-relaxed transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column: Key Deliverables */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-8 space-y-4">
                    <span className="text-xs tracking-wider uppercase text-[#8E8E9A] font-medium">
                      DELIVERABLES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3 py-1.5 rounded-lg bg-[#14141A] border border-white/5 text-xs text-[#C8C8D4] font-medium"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#8E8E9A] group-hover:text-white transition-colors cursor-pointer"
                      >
                        <span>KONSULTASI KEBUTUHAN INI</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
