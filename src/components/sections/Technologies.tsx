"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  Layers,
  Cpu,
  Code2,
  Database,
  Cloud,
  Terminal,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Server,
  Workflow,
  Boxes,
  Sliders,
  Check
} from "lucide-react";

export interface StackSolution {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  architectureFocus: string;
  keyBenefit: string;
  accent: string;
}

export const stackSolutions: StackSolution[] = [
  {
    id: "motion-web",
    badge: "FRONTEND & MOTION",
    title: "High-Performance Motion Web",
    subtitle: "Next.js 15 + TypeScript + GSAP + Tailwind CSS",
    description: "Architected for high-converting landing pages and brand showcases demanding 60-120fps motion, instant page loads, and top Lighthouse SEO scores.",
    technologies: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Lenis"],
    architectureFocus: "Server Components, App Router & ScrollTrigger Motion Engine",
    keyBenefit: "100 Lighthouse Performance & Unforgettable Visual Impact",
    accent: "#B8FF00"
  },
  {
    id: "enterprise-erp",
    badge: "ENTERPRISE BACKEND & DATA",
    title: "Scalable Enterprise Software Engine",
    subtitle: "Node.js / Laravel + PostgreSQL + Redis + REST APIs",
    description: "Built for complex business logic, real-time inventory tracking, high-throughput microservices, and ACID-compliant data persistence.",
    technologies: ["Node.js", "Express", "PostgreSQL", "Redis", "REST APIs"],
    architectureFocus: "Asynchronous Event Loop, Database Indexing & Caching Layer",
    keyBenefit: "50,000+ Requests/Sec Throughput with Sub-millisecond Redis Caching",
    accent: "#06B6D4"
  },
  {
    id: "cloud-devops",
    badge: "CLOUD & INFRASTRUCTURE",
    title: "High-Availability Cloud Architecture",
    subtitle: "Docker + Linux + Nginx + CI/CD Pipelines",
    description: "Containerized deployment clusters with reverse proxy load balancing, automated SSL renewal, rate limiting, and zero-downtime release pipelines.",
    technologies: ["Docker", "Linux (Debian/Ubuntu)", "Nginx", "GitHub Actions"],
    architectureFocus: "Container Replication, Reverse Proxying & Automated CI/CD",
    keyBenefit: "99.99% Guaranteed Server Uptime & Instant Automated Rollouts",
    accent: "#A855F7"
  }
];

export interface TechCapability {
  name: string;
  category: "FRONTEND" | "BACKEND" | "DATABASE" | "INFRASTRUCTURE";
  role: string;
  implementation: string;
  icon: any;
  status: "BATTLE TESTED" | "IN PRODUCTION";
}

export const techCapabilities: TechCapability[] = [
  {
    name: "Next.js 15",
    category: "FRONTEND",
    role: "Core Web Framework & SSR Engine",
    implementation: "App Router, Server Components & Hydration Optimization",
    icon: Globe,
    status: "BATTLE TESTED"
  },
  {
    name: "TypeScript",
    category: "FRONTEND",
    role: "Type System & Contract Safety",
    implementation: "Strict Typing, Compile-Time Inspection & Zero Runtime Errors",
    icon: Terminal,
    status: "BATTLE TESTED"
  },
  {
    name: "GSAP & ScrollTrigger",
    category: "FRONTEND",
    role: "Motion & Parallax Choreography",
    implementation: "Hardware Accelerated Timelines & Scroll-driven Triggers",
    icon: Sparkles,
    status: "BATTLE TESTED"
  },
  {
    name: "Tailwind CSS v4",
    category: "FRONTEND",
    role: "Design System & Tokens",
    implementation: "Zero-runtime Utility Styling & Custom Dark Theme Variables",
    icon: Layers,
    status: "BATTLE TESTED"
  },
  {
    name: "Node.js / Express",
    category: "BACKEND",
    role: "Asynchronous API & Stream Gateway",
    implementation: "Event Loop Non-blocking I/O & Microservice Routing",
    icon: Cpu,
    status: "BATTLE TESTED"
  },
  {
    name: "Laravel & PHP 8.4",
    category: "BACKEND",
    role: "Enterprise Business Logic Engine",
    implementation: "Eloquent ORM, Queued Job Workers & Robust Auth System",
    icon: Code2,
    status: "IN PRODUCTION"
  },
  {
    name: "PostgreSQL",
    category: "DATABASE",
    role: "Relational & JSONB Storage",
    implementation: "ACID Transactions, Complex Queries & Automated Indexing",
    icon: Database,
    status: "BATTLE TESTED"
  },
  {
    name: "Redis",
    category: "DATABASE",
    role: "In-Memory Speed Cache & Queue",
    implementation: "Sub-millisecond Key-Value Store & Rate Limiting Broker",
    icon: Zap,
    status: "BATTLE TESTED"
  },
  {
    name: "Docker",
    category: "INFRASTRUCTURE",
    role: "Containerization & Parity",
    implementation: "Multi-stage Container Builds & Uniform Deployment",
    icon: Boxes,
    status: "BATTLE TESTED"
  },
  {
    name: "Linux (Debian/Ubuntu)",
    category: "INFRASTRUCTURE",
    role: "Server Operating System",
    implementation: "Kernel Tuning, Shell Automation & Security Hardening",
    icon: Server,
    status: "BATTLE TESTED"
  },
  {
    name: "Nginx",
    category: "INFRASTRUCTURE",
    role: "Reverse Proxy & Load Balancer",
    implementation: "SSL Termination, Brotli Compression & Request Rate Limits",
    icon: Workflow,
    status: "BATTLE TESTED"
  },
  {
    name: "CI/CD Pipelines",
    category: "INFRASTRUCTURE",
    role: "Automated Deployment Pipeline",
    implementation: "GitHub Actions Testing, Static Auditing & Auto Deploy",
    icon: ShieldCheck,
    status: "BATTLE TESTED"
  }
];

export const Technologies: React.FC = () => {
  const [activeSolution, setActiveSolution] = useState<string>("motion-web");
  const containerRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  const selectedSolution = stackSolutions.find((s) => s.id === activeSolution) || stackSolutions[0];

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
      className="py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] relative border-b border-neutral-800/60 overflow-hidden bg-noise select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#B8FF00]/5 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-[#B8FF00]" />
              <span>STACK ARCHITECTURE // BATTLE-TESTED ENGINE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase font-mono text-white flex items-center gap-3">
              <span>HOW WE COMBINE TECH</span>
              <span className="text-[#B8FF00]">.</span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm font-light leading-relaxed">
            Daripada hanya sekadar klaim persentase, kami menyusun kombinasi teknologi menjadi **kombinasi arsitektur nyata** sesuai kebutuhan sistem Anda.
          </p>
        </div>

        {/* 1. Solution Architecture Switcher Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          {stackSolutions.map((sol) => {
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
                data-cursor="SOLUTIONS"
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
                    {isActive ? "[ ACTIVE ARCHITECTURE ]" : "SELECT ARCHITECTURE →"}
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
                <span>ARCHITECTURAL SYNERGY OVERVIEW</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                {selectedSolution.title}
              </h3>

              <p className="text-neutral-300 font-light text-base leading-relaxed">
                {selectedSolution.description}
              </p>

              {/* Architecture Focus & Key Benefit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                    FOCUS ARSITEKTUR
                  </div>
                  <div className="text-xs font-mono font-bold text-white leading-snug">
                    {selectedSolution.architectureFocus}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                    MANFAAT KUNCI
                  </div>
                  <div className="text-xs font-mono font-bold text-[#B8FF00] leading-snug">
                    {selectedSolution.keyBenefit}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Integrated Stack Badges */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold border-b border-neutral-800 pb-3">
                // COMPONENT STACK INTEGRATION
              </div>

              <div className="space-y-3">
                {selectedSolution.technologies.map((techName, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-between font-mono text-xs"
                  >
                    <div className="flex items-center space-x-3 text-white font-bold">
                      <Check className="w-4 h-4 text-[#B8FF00]" />
                      <span>{techName}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500">INTEGRATED</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Complete Capabilities Grid Matrix (Replacing plain percentage bars) */}
        <div>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-8">
            <h3 className="text-2xl font-mono font-extrabold text-white tracking-tight uppercase">
              FULL TECHNOLOGY INVENTORY & IMPLEMENTATIONS
            </h3>
            <span className="text-xs font-mono text-neutral-500">12 CORE MODULES</span>
          </div>

          <div ref={solutionsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techCapabilities.map((cap, idx) => {
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
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold">
                        {cap.status}
                      </span>
                    </div>

                    <h4 className="text-lg font-mono font-extrabold text-white group-hover:text-[#B8FF00] transition-colors mb-1">
                      {cap.name}
                    </h4>

                    <div className="text-xs font-mono text-[#B8FF00] font-semibold mb-3">
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
