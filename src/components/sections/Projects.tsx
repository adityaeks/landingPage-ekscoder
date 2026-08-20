"use client";

import React, { useEffect, useRef, useState } from "react";
import { projectsData, Project } from "@/data/projects";
import { fetchProjectsFromBackend } from "@/services/projectService";
import { gsap } from "@/lib/gsap";
import {
  ArrowUpRight,
  ExternalLink,
  X,
  Sparkles,
  Calendar,
  Code2,
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

  // Modal Open & Close Handlers
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

  const handleCopyProject = () => {
    if (typeof window !== "undefined" && activeProject) {
      const url = activeProject.link || window.location.href;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            <div
              key={project.slug || project.number}
              onClick={() => openModal(project)}
              suppressHydrationWarning
              className="project-card group relative rounded-3xl bg-[#111111] border border-neutral-800 hover:border-[#B8FF00]/40 overflow-hidden transition-all duration-500 flex flex-col justify-between cursor-pointer shadow-xl"
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
                    <span>{t.viewProject || "EXPLORE PROJECT"}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROJECT DETAIL POP-UP MODAL ── */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={closeModal}
          data-lenis-prevent
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] border border-neutral-800 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Control Bar */}
            <div className="p-5 sm:p-6 border-b border-neutral-800/80 flex items-center justify-between bg-[#141414] shrink-0">
              <div className="flex items-center space-x-3">
                <span className="px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase bg-[#B8FF00]/15 text-[#B8FF00] border border-[#B8FF00]/30">
                  {activeProject.category}
                </span>

                <span className="text-neutral-400 font-mono text-xs hidden sm:inline">
                  PROJECT {activeProject.number} • {activeProject.year}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={closeModal}
                  suppressHydrationWarning
                  aria-label="Close Project Modal"
                  className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-[#B8FF00] hover:text-black border border-neutral-800 text-neutral-300 font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-2"
                >
                  <span>TUTUP</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-6 sm:p-10 overflow-y-auto space-y-8 custom-scrollbar overscroll-contain flex-1"
            >
              {/* Project Hero Visual Frame */}
              <div
                className={`relative min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br ${activeProject.imageBg} border border-neutral-800 p-6 sm:p-10 flex flex-col justify-end`}
              >
                {/* Tech Grid Texture */}
                <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

                {/* Accent Radial Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 70% 40%, ${activeProject.accentColor}25, transparent 70%)`,
                  }}
                />

                {/* Watermark Number */}
                <div className="absolute -bottom-2 -right-4 font-mono text-8xl sm:text-9xl font-black text-white/5 select-none pointer-events-none">
                  {activeProject.number}
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#B8FF00] uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activeProject.category}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black font-mono text-white tracking-tight uppercase leading-tight">
                    {activeProject.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300 pt-2">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B8FF00]" />
                      <span>{activeProject.year}</span>
                    </span>
                    {/* <span>•</span> */}
                    {/* <span className="flex items-center space-x-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#B8FF00]" />
                      <span>{activeProject.technologies.length} TECHNOLOGIES</span>
                    </span> */}
                    <span>•</span>
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#B8FF00]/10 border border-[#B8FF00]/20 text-[#B8FF00]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                      <span>ACTIVE PROJECT</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Description / Overview */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#B8FF00] tracking-widest uppercase">
                  <span className="w-6 h-[1px] bg-[#B8FF00]" />
                  <span>// DESKRIPSI & SPESIFIKASI PROYEK</span>
                </div>
                <p className="text-neutral-200 font-light text-base sm:text-lg leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Technologies Used Section */}
              <div className="space-y-4 pt-4 border-t border-neutral-800/80">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#B8FF00] tracking-widest uppercase">
                  <span className="w-6 h-[1px] bg-[#B8FF00]" />
                  <span>// SOLUTION TYPE</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {activeProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm font-mono text-neutral-300 flex items-center space-x-2 hover:border-[#B8FF00]/40 hover:text-[#B8FF00] transition-colors"
                    >
                      <Tag className="w-3.5 h-3.5 text-[#B8FF00]" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata Info Summary Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 font-mono text-xs">
                {/* <div>
                  <span className="text-neutral-500 block mb-1">ID PROYEK</span>
                  <span className="text-white font-bold">{activeProject.number}</span>
                </div> */}
                <div>
                  <span className="text-neutral-500 block mb-1">KATEGORI</span>
                  <span className="text-[#B8FF00] font-bold">{activeProject.category}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">TAHUN</span>
                  <span className="text-white font-bold">{activeProject.year}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">STATUS</span>
                  <span className="text-[#B8FF00] font-bold">COMPLETED / LIVE</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Footer */}
            <div className="p-6 border-t border-neutral-800/80 bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <button
                onClick={handleCopyProject}
                className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-[#B8FF00] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#B8FF00]" />
                    <span className="text-[#B8FF00]">LINK TERSALIN</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>SALIN TAUTAN</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                {activeProject.link ? (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    suppressHydrationWarning
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-colors flex-1 sm:flex-initial shadow-[0_0_20px_rgba(184,255,0,0.2)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>KUNJUNGI SITUS</span>
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-600 font-mono font-bold text-xs tracking-wider uppercase cursor-not-allowed select-none opacity-50 flex-1 sm:flex-initial"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>KUNJUNGI SITUS</span>
                  </span>
                )}

                <button
                  onClick={closeModal}
                  suppressHydrationWarning
                  className="px-6 py-3 rounded-full border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-300 font-mono font-bold text-xs uppercase tracking-wider transition-colors flex-1 sm:flex-initial"
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
