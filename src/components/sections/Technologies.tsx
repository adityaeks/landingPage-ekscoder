"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Globe, Layers, Bot, ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppUrl } from "@/data/translations";

export const Technologies: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".solution-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }

      if (trustRef.current) {
        gsap.fromTo(
          trustRef.current,
          { opacity: 0, y: 20 },
          {
            scrollTrigger: {
              trigger: trustRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [language]);

  const solutions = [
    {
      id: "web-landing",
      number: "01",
      domain: language === "ID" ? "Platform Web & Branding" : "Web Platforms & Branding",
      title: language === "ID" ? "Website Berkinerja Tinggi" : "High-Performance Web Platforms",
      description:
        language === "ID"
          ? "Website modern yang cepat, elegan di semua perangkat, dan dioptimalkan untuk kredibilitas serta konversi bisnis."
          : "Modern, ultra-fast websites and digital portals engineered to build brand authority and convert visitors into clients.",
      icon: Globe,
      features:
        language === "ID"
          ? [
              "Desain eksklusif ramah mobile",
              "Arsitektur SEO teknis",
              "Performa loading instan",
              "Integrasi lead WhatsApp langsung",
            ]
          : [
              "Bespoke mobile-first interface",
              "Technical SEO architecture",
              "Instant sub-second loading",
              "Direct WhatsApp lead routing",
            ],
    },
    {
      id: "custom-system",
      number: "02",
      domain: language === "ID" ? "Software Bisnis Kustom" : "Custom Business Software",
      title: language === "ID" ? "Sistem & Aplikasi ERP" : "Custom ERP & Web Applications",
      description:
        language === "ID"
          ? "Aplikasi web internal untuk mengotomasi inventaris, kasir penjualan (POS), keuangan, dan alur kerja operasional bisnis."
          : "Tailored web software to automate inventory management, point-of-sale, internal workflows, and financial analytics.",
      icon: Layers,
      features:
        language === "ID"
          ? [
              "Otomasi stok, kasir, dan transaksi",
              "Laporan analitik bisnis real-time",
              "Manajemen peran dan multi-cabang",
              "Notifikasi webhook dan integrasi API",
            ]
          : [
              "Automated inventory, POS, and sales",
              "Real-time operational analytics",
              "Role-based access & branch controls",
              "Webhook notifications & API pipelines",
            ],
    },
    {
      id: "bot-ai",
      number: "03",
      domain: language === "ID" ? "Otomasi & Kecerdasan Buatan" : "Automation & AI Engineering",
      title: language === "ID" ? "Bot Otomatis & Integrasi AI" : "Automated Bots & AI Integrations",
      description:
        language === "ID"
          ? "Bot cerdas untuk WhatsApp, Telegram, atau web guna menangani layanan pelanggan 24/7 dan integrasi alur kerja AI."
          : "Intelligent messaging bots and custom AI workflows to handle customer inquiries 24/7 and streamline repetitive operations.",
      icon: Bot,
      features:
        language === "ID"
          ? [
              "Bot respons WhatsApp & Telegram 24/7",
              "Integrasi AI Customer Service cerdas",
              "Otomasi broadcast dan status pesanan",
              "Efisiensi biaya operasional tim",
            ]
          : [
              "24/7 WhatsApp & Telegram response engines",
              "Custom AI customer support pipelines",
              "Automated transactional dispatch",
              "Reduced operational overhead",
            ],
    },
  ];

  const guarantees = [
    {
      title: language === "ID" ? "Performa Teruji" : "Validated Performance",
      desc: language === "ID" ? "Waktu muat cepat dengan rendering teroptimasi." : "Fast page loads with hardware-accelerated rendering.",
    },
    {
      title: language === "ID" ? "Keamanan Arsitektur" : "Security Architecture",
      desc: language === "ID" ? "Praktik enkripsi modern dan integritas data terjamin." : "Modern encryption standards and automated backups.",
    },
    {
      title: language === "ID" ? "Skalabilitas Terukur" : "Engineered for Scale",
      desc: language === "ID" ? "Struktur modular yang siap bertumbuh bersama bisnis." : "Modular architecture built to expand with business growth.",
    },
    {
      title: language === "ID" ? "Dukungan Langsung" : "Direct Partnership",
      desc: language === "ID" ? "Komunikasi langsung dengan lead engineer tanpa perantara." : "Direct communication with senior engineers without bureaucracy.",
    },
  ];

  return (
    <section
      id="solutions"
      ref={containerRef}
      aria-label="Engineered Solutions"
      className="py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-16 bg-[#08080A] text-white relative border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium block mb-3">
              Solutions · Strategic Engineering
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-white leading-none">
              {language === "ID" ? "Solusi Bisnis" : "Client Solutions"}
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-base sm:text-lg font-light leading-relaxed">
            {language === "ID"
              ? "Solusi rekayasa digital yang terarah untuk mempercepat pertumbuhan dan efisiensi operasional bisnis Anda."
              : "Practical, high-impact digital solutions engineered to scale operations and accelerate business growth."}
          </p>
        </div>

        {/* 3 Solutions Architectural Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {solutions.map((sol) => {
            const message =
              language === "ID"
                ? `Halo Ekscoder, saya ingin konsultasi mengenai ${sol.title}.`
                : `Hi Ekscoder, I would like to consult about ${sol.title}.`;
            const actionUrl = getWhatsAppUrl(message);

            return (
              <div
                key={sol.id}
                className="solution-card rounded-2xl p-8 sm:p-10 bg-[#0E0E12] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-500">{sol.number}</span>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      {sol.domain}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {sol.title}
                  </h3>

                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                    {sol.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <a
                    href={actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>{language === "ID" ? "Konsultasikan Solusi" : "Consult Solution"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantees / Studio Principles Bar */}
        <div
          ref={trustRef}
          className="pt-10 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-8 text-xs"
        >
          {guarantees.map((item, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <span className="text-neutral-500 font-mono text-[11px]">0{gIdx + 1}</span>
              <h4 className="text-sm font-bold text-white tracking-wide">{item.title}</h4>
              <p className="text-neutral-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
