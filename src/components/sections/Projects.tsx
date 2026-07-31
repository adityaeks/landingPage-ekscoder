"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projectsData, Project } from "@/data/projects";
import { fetchProjectsFromBackend } from "@/services/projectService";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      const data = await fetchProjectsFromBackend();
      if (isMounted) {
        setProjects(data);
        setLoading(false);
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 70, opacity: 0 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loading, projects]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 bg-transparent relative border-b border-neutral-800/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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

        {/* Projects Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: Project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              suppressHydrationWarning
              className="project-card group relative rounded-3xl bg-[#111111] border border-neutral-800 hover:border-[#B8FF00]/40 overflow-hidden transition-all duration-500 flex flex-col justify-between"
              data-cursor="VIEW"
            >
              {/* Project Card Image / Gradient Preview Frame */}
              <div
                className={`shrink-0 h-64 sm:h-72 lg:h-80 w-full bg-gradient-to-br ${project.imageBg} relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 ease-out`}
              >
                {/* Tech Grid Background Texture */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />

                {/* Top Bar: Number & Year */}
                <div className="relative z-10 flex justify-between items-center font-mono text-xs text-neutral-400">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-bold">
                    {project.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
                    {project.year}
                  </span>
                </div>

                {/* Large Background Code/Number Watermark */}
                <div className="absolute bottom-2 right-4 font-mono text-7xl sm:text-8xl font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">
                  {project.number}
                </div>

                {/* Center Title Watermark / Visual Focus */}
                <div className="relative z-10 my-auto">
                  <div className="text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-1">
                    {project.category}
                  </div>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-black text-white tracking-tight uppercase group-hover:text-[#B8FF00] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Details Bottom Container */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 space-y-6 bg-[#111111] border-t border-neutral-800">
                <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed line-clamp-3 min-h-[4.5rem]">
                  {project.description}
                </p>

                {/* Tech Stack Pills & View Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800/60">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-white group-hover:text-[#B8FF00] transition-colors">
                    <span>EXPLORE PROJECT</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
