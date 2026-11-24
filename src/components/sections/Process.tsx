"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Compass, Code2, Rocket, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

const stepIcons = [Search, Compass, Code2, Rocket];

export const Process: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].process;
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (stepsRef.current) {
        const items = stepsRef.current.querySelectorAll(".process-card");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 25 },
            {
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform",
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-16 bg-[#08080A] text-white relative border-b border-white/10"
    >
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

        {/* Editorial Process Rows */}
        <div ref={stepsRef} className="space-y-4">
          {t.steps.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            return (
              <div
                key={idx}
                className="process-card group relative p-6 sm:p-8 md:p-10 rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-white/25 transition-all duration-300"
                data-cursor="PHASE"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Index & Phase Title */}
                  <div className="lg:col-span-5 flex items-start sm:items-center space-x-5">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white/30 group-hover:text-white transition-colors duration-300">
                      {step.number}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon className="w-4 h-4 text-white" />
                        <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">
                          {step.subtitle}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F4F6] tracking-tight uppercase group-hover:translate-x-1 transition-transform">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Narrative Description */}
                  <div className="lg:col-span-7">
                    <p className="text-[#8E8E9A] group-hover:text-[#C8C8D4] text-sm sm:text-base leading-relaxed transition-colors duration-300">
                      {step.description}
                    </p>
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
