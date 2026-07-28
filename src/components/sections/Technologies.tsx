"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Check, Sparkles, ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { businessSolutionsData, businessCapabilitiesData } from "@/data/solutionsData";

export const Technologies: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].solutions;
  const [activeSolution, setActiveSolution] = useState<string>("digital-platform");
  const containerRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  const solutionsList = businessSolutionsData[language];
  const capabilitiesList = businessCapabilitiesData[language];

  const selectedSolution = solutionsList.find((s) => s.id === activeSolution) || solutionsList[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (solutionsRef.current) {
        gsap.fromTo(
          solutionsRef.current.children,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technologies"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 bg-transparent relative border-b border-neutral-800/60 overflow-hidden bg-noise select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#B8FF00]/5 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-[#B8FF00]" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase font-mono text-white flex items-center gap-3">
              <span>{t.title}</span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm font-light leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* 1. Solution Switcher Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          {solutionsList.map((sol) => {
            const isActive = activeSolution === sol.id;
            return (
              <div
                key={sol.id}
                onClick={() => setActiveSolution(sol.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? "bg-[#141414] border-[#B8FF00] shadow-xl shadow-[#B8FF00]/10 scale-[1.01]"
                    : "bg-[#111111]/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-[#141414]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 font-bold" style={{ color: sol.accent }}>
                      // {sol.badge}
                    </span>
                    {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF00] animate-ping" />}
                  </div>

                  <h3 className={`text-xl font-mono font-extrabold tracking-tight mb-2 ${isActive ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                    {sol.title}
                  </h3>

                  <p className="text-xs font-mono text-neutral-400 font-medium mb-4">
                    {sol.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono">
                  <span className={`${isActive ? "text-[#B8FF00]" : "text-neutral-500"} font-bold`}>
                    {isActive ? t.tabActive : t.tabSelect}
                  </span>
                  <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-[#B8FF00]" : "text-neutral-500"}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Solution Detail Showcase Window */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#111111] border border-neutral-800 shadow-2xl mb-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono" style={{ color: selectedSolution.accent }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.impactOverview}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                {selectedSolution.title}
              </h3>

              <p className="text-neutral-300 font-light text-base leading-relaxed">
                {selectedSolution.description}
              </p>

              {/* Business Focus & Key Benefit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                    {t.focusLabel}
                  </div>
                  <div className="text-xs font-mono font-bold text-white leading-snug">
                    {selectedSolution.businessFocus}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                    {t.benefitLabel}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#B8FF00] leading-snug">
                    {selectedSolution.keyBenefit}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Business Solution Highlights */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold border-b border-neutral-800 pb-3">
                {t.highlightsTitle}
              </div>

              <div className="space-y-3">
                {selectedSolution.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-between font-mono text-xs"
                  >
                    <div className="flex items-center space-x-3 text-white font-bold">
                      <Check className="w-4 h-4 text-[#B8FF00]" />
                      <span>{highlight}</span>
                    </div>
                    <span className="text-[10px] text-[#B8FF00] font-bold">VERIFIED</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Core Business Capabilities Grid Matrix */}
        <div>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-8">
            <h3 className="text-2xl font-mono font-extrabold text-white tracking-tight uppercase">
              {t.matrixTitle}
            </h3>
            <span className="text-xs font-mono text-neutral-500">{t.matrixCount}</span>
          </div>

          <div ref={solutionsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilitiesList.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#111111] border border-neutral-800/80 hover:border-[#B8FF00]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:bg-[#B8FF00] group-hover:text-black transition-colors duration-300">
                        <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[#B8FF00] font-bold">
                        {cap.status}
                      </span>
                    </div>

                    <h4 className="text-lg font-mono font-extrabold text-white group-hover:text-[#B8FF00] transition-colors mb-1">
                      {cap.name}
                    </h4>

                    <div className="text-xs font-mono text-neutral-400 font-semibold mb-3">
                      // {cap.role}
                    </div>

                    <p className="text-neutral-400 font-light text-xs leading-relaxed">
                      {cap.implementation}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/60 mt-4 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>{cap.category}</span>
                    <span className="text-neutral-400">READY</span>
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
