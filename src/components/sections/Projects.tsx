"use client";

import React, { useEffect, useRef, useState } from "react";
import { projectsData, Project } from "@/data/projects";
import { fetchProjectsFromBackend } from "@/services/projectService";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ArrowUpRight,
  ExternalLink,
  X,
  Calendar,
  Tag,
  Check,
  Share2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

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
        const cards = gridRef.current.querySelectorAll(".exhibition-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              clearProps: "transform",
            }
          );
        });
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }, containerRef);

    return () => ctx.revert();
  }, [loading, projects]);

  // Modal Open & Close Handlers with Lenis scroll lock
  const openModal = (project: Project) => {
    setActiveProject(project);
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }
  };

  const closeModal = () => {
    setActiveProject(null);
    document.body.style.overflow = "unset";
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.start();
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProject) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  const handleCopyProject = async () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/#projects`;
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link: ", err);
      }
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-16 bg-[#08080A] text-white relative border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Architectural & Minimal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs tracking-[0.3em] text-neutral-400 uppercase mb-4 font-mono">
              <span className="w-6 h-[1px] bg-white/40" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] uppercase text-white">
              {t.title}
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm md:text-base leading-relaxed font-light">
            {t.description}
          </p>
        </div>

        {/* Quiet Luxury Exhibition Cards: 2-Column Minimal Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project: Project, idx: number) => {
            const projectNumber = project.number || String(idx + 1).padStart(2, "0");

            return (
              <article
                key={project.slug || project.number}
                onClick={() => openModal(project)}
                data-cursor="VIEW"
                className="exhibition-card group relative rounded-2xl bg-[#0D0D12] border border-white/10 hover:border-white/30 transition-all duration-500 p-8 sm:p-10 md:p-12 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] cursor-pointer overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute inset-0 bg-radial from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Top Row: Index Number & Category */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono tracking-widest text-neutral-400 uppercase border-b border-white/5 pb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-bold text-sm">
                      {projectNumber}
                    </span>
                    <span className="text-neutral-600">/</span>
                    <span>{project.category}</span>
                  </div>

                  <span className="text-neutral-500 font-medium">
                    {project.year}
                  </span>
                </div>

                {/* Center Core: Monumental Title & Narrative */}
                <div className="relative z-10 my-8 sm:my-10 space-y-4">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight group-hover:text-neutral-200 transition-colors leading-[1.05]">
                    {project.title}.
                  </h3>
                  <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Row: Stack Pills & Arrow Action */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full text-xs font-mono text-neutral-400 bg-white/[0.02] border border-white/10 group-hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono text-neutral-600 border border-white/5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-wider text-white group-hover:text-neutral-300 transition-colors">
                    <span>{t.viewProject || "LIHAT DETAIL"}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal (Pure Editorial) */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={closeModal}
          data-lenis-prevent
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-3xl max-h-[88vh] bg-[#0C0C10] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0F0F14] shrink-0">
              <div className="flex items-center space-x-3 text-xs font-mono tracking-widest text-neutral-400 uppercase">
                <span>PROJECT {activeProject.number}</span>
                <span>·</span>
                <span className="text-white">{activeProject.category}</span>
              </div>

              <button
                onClick={closeModal}
                aria-label="Tutup"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 text-white transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-6 sm:p-10 overflow-y-auto space-y-8 custom-scrollbar overscroll-contain flex-1"
            >
              {/* Headline */}
              <div className="space-y-3">
                <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  {activeProject.year} · COMPLETED
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  {activeProject.title}.
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-xs tracking-widest text-neutral-400 font-mono uppercase">
                  RINGKASAN PROYEK
                </div>
                <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Stack Architecture */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="text-xs tracking-widest text-neutral-400 font-mono uppercase">
                  TEKNOLOGI & ARSITEKTUR
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-200 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Metadata Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#141419] border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block mb-1">KATEGORI</span>
                  <span className="text-white font-bold">{activeProject.category}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">TAHUN</span>
                  <span className="text-white font-bold">{activeProject.year}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">STATUS</span>
                  <span className="text-white font-bold">COMPLETED / LIVE</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-[#0F0F14] flex items-center justify-between gap-4 shrink-0">
              <button
                onClick={handleCopyProject}
                className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span className="text-white">TAUTAN TERSALIN</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>BAGIKAN</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-3">
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors"
                  >
                    <span>KUNJUNGI</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  TUTUP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
