"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { processStepsData } from "@/data/processData";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export const Process: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].process;
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = processStepsData[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line fill animation
      if (lineRef.current && containerRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              end: "bottom 75%",
              scrub: true,
            },
            scaleY: 1,
            ease: "none",
          }
        );
      }

      // Step cards entrance stagger
      if (stepsRef.current) {
        const items = stepsRef.current.querySelectorAll(".process-item");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              scrollTrigger: {
                trigger: item,
                start: "top 75%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 bg-transparent relative border-b border-neutral-800/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-[#B8FF00]" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase font-mono text-white">
              {t.title}
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm md:text-base font-light">
            {t.description}
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="relative pl-6 md:pl-12">
          {/* Vertical Progress Line Track */}
          <div className="absolute left-2 md:left-4 top-4 bottom-4 w-[2px] bg-neutral-800">
            <div
              ref={lineRef}
              className="w-full bg-[#B8FF00] origin-top h-full shadow-[0_0_12px_#B8FF00]"
            />
          </div>

          <div ref={stepsRef} className="space-y-12 md:space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="process-item relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-8 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-[#B8FF00]/40 transition-all duration-300 group"
                  data-cursor={step.title}
                >
                  {/* Timeline Dot Badge */}
                  <div className="absolute -left-[31px] md:-left-[55px] top-10 w-4 h-4 rounded-full border-2 border-neutral-700 bg-[#0E0E0E] group-hover:border-[#B8FF00] group-hover:bg-[#B8FF00] transition-colors" />

                  {/* Left Column: Step Number & Title */}
                  <div className="lg:col-span-5 flex items-center space-x-6">
                    <span className="font-mono text-3xl sm:text-5xl font-black text-neutral-600 group-hover:text-[#B8FF00] transition-colors">
                      {step.number}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-[#B8FF00]" />
                        <span className="text-xs font-mono text-[#B8FF00] uppercase tracking-widest">
                          {step.subtitle}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-tight uppercase group-hover:translate-x-1 transition-transform">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Description */}
                  <div className="lg:col-span-7">
                    <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
