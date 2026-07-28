"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Search, Compass, Code2, Rocket, RefreshCw } from "lucide-react";

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      subtitle: "Strategy & Architectural Blueprint",
      description: "Deep dive into product requirements, domain logic, tech stack selection, and system topology planning to ensure a rock-solid engineering foundation.",
      icon: Search,
    },
    {
      number: "02",
      title: "DESIGN",
      subtitle: "UI/UX & Visual Direction",
      description: "Drafting minimalist, dark-themed UI components, design tokens, interactive prototypes, and motion animation keyframes.",
      icon: Compass,
    },
    {
      number: "03",
      title: "DEVELOP",
      subtitle: "Motion-First Clean Code",
      description: "Implementing frontend reactive components, GSAP scroll triggers, backend REST APIs, and database models adhering to strict TypeScript standards.",
      icon: Code2,
    },
    {
      number: "04",
      title: "DEPLOY",
      subtitle: "DevOps & Infrastructure",
      description: "Automated CI/CD deployment to production servers, SSL setup, Docker containerization, Nginx reverse proxy configuration, and caching optimization.",
      icon: Rocket,
    },
    {
      number: "05",
      title: "EVOLVE",
      subtitle: "Continuous Performance Tuning",
      description: "Monitoring real-world performance metrics, conducting Lighthouse audits, refining animations, and delivering iterative software updates.",
      icon: RefreshCw,
    },
  ];

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
              start: "top 60%",
              end: "bottom 80%",
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
            { opacity: 0, x: -40 },
            {
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              x: 0,
              duration: 0.8,
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
      className="py-24 md:py-36 px-6 md:px-12 bg-[#0E0E0E] relative border-b border-neutral-800/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-[#B8FF00]" />
              <span>WORKFLOW</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase font-mono text-white">
              HOW WE BUILD<span className="text-[#B8FF00]">.</span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm md:text-base font-light">
            A structured, 5-phase engineering methodology guaranteeing transparent execution and flawless digital product delivery.
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
                  data-cursor="PROCESS"
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
