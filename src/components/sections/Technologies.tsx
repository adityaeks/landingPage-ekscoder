"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Globe,
  Layers,
  Bot,
  Check,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  ChevronRight
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppUrl } from "@/data/translations";

interface SolutionItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  features: string[];
  ctaText: string;
  accent: string;
  popular?: boolean;
}

interface GuaranteeItem {
  icon: any;
  title: string;
  desc: string;
}

const solutionsContent: Record<"ID" | "EN", {
  badge: string;
  title1: string;
  title2: string;
  description: string;
  solutions: SolutionItem[];
  guaranteeTitle: string;
  guarantees: GuaranteeItem[];
}> = {
  ID: {
    badge: "SOLUSI DIGITAL // APA YANG KAMI BANGUN",
    title1: "SOLUSI TEPAT GUNA",
    title2: "UNTUK BISNIS ANDA.",
    description: "Kami bantu bisnis Anda berkembang dengan website modern, sistem operasional otomatis, dan bot cerdas berbasis AI yang bekerja 24 jam non-stop.",
    solutions: [
      {
        id: "web-landing",
        number: "01",
        badge: "BRANDING & PENJUALAN",
        title: "Website & Landing Page",
        subtitle: "Meningkatkan Kepercayaan & Penjualan",
        description: "Website profesional yang cepat dibuka, terlihat elegan di HP, dan siap mendatangkan calon pelanggan baru lewat Google.",
        icon: Globe,
        features: [
          "Tampilan Modern & Ramah Layar HP",
          "Optimasi SEO agar Muncul di Google",
          "Loading Kilat Tanpa Bikin Pengunjung Menunggu",
          "Tombol WhatsApp & Formulir Lead Siap Pakai"
        ],
        ctaText: "Konsultasi Website",
        accent: "#B8FF00"
      },
      {
        id: "custom-system",
        number: "02",
        badge: "OTOMATISASI OPERASIONAL",
        title: "Sistem & Aplikasi Bisnis",
        subtitle: "Tinggalkan Cara Manual yang Lambat",
        description: "Aplikasi web khusus untuk kelola stok gudang, kasir penjualan (POS), pembukuan keuangan, dan manajemen tim secara otomatis & akurat.",
        icon: Layers,
        features: [
          "Kelola Stok, Kasir & Transaksi Otomatis",
          "Laporan Keuangan & Omset Real-Time",
          "Hak Akses Karyawan & Multi-Cabang",
          "Koneksi WhatsApp Notif & Pembayaran Otomatis"
        ],
        ctaText: "Diskusi Sistem Bisnis",
        accent: "#06B6D4",
        popular: true
      },
      {
        id: "bot-ai",
        number: "03",
        badge: "BOT OTOMATIS & AI",
        title: "Automated Bot & Integrasi AI",
        subtitle: "Layanan CS 24 Jam & Otomatisasi dengan AI",
        description: "Bangun bot cerdas untuk WhatsApp, Telegram, atau website yang siap balas chat pelanggan 24/7, kirim notifikasi pesanan, dan integrasi kecerdasan buatan (AI) ke sistem bisnis Anda.",
        icon: Bot,
        features: [
          "Bot WhatsApp & Telegram Balas Chat 24/7",
          "Integrasi AI untuk Customer Service",
          "Otomatisasi Broadcast & Notifikasi Order",
          "Hemat Biaya CS & Respon Pelanggan Cepat"
        ],
        ctaText: "Konsultasi Bot & AI",
        accent: "#A855F7"
      }
    ],
    guaranteeTitle: "NILAI LEBIH BEKERJASAMA DENGAN EKSCODER",
    guarantees: [
      {
        icon: Zap,
        title: "Loading Super Cepat",
        desc: "Website terbuka instan tanpa lemot"
      },
      {
        icon: ShieldCheck,
        title: "Keamanan Data Terjamin",
        desc: "Enkripsi & backup berkala otomatis"
      },
      {
        icon: TrendingUp,
        title: "Siap Berkembang",
        desc: "Mudah ditambah fitur kapan saja"
      },
      {
        icon: MessageSquare,
        title: "Bantuan & Support Cepat",
        desc: "Tim engineer siap mendampingi Anda"
      }
    ]
  },
  EN: {
    badge: "DIGITAL SOLUTIONS // WHAT WE BUILD",
    title1: "POWERFUL SOLUTIONS",
    title2: "BUILT FOR BUSINESS GROWTH.",
    description: "We help modern businesses grow with high-converting websites, automated workflow systems, and smart AI-powered automation bots.",
    solutions: [
      {
        id: "web-landing",
        number: "01",
        badge: "BRANDING & SALES",
        title: "High-Converting Websites",
        subtitle: "Build Trust & Generate Leads",
        description: "Modern, ultra-fast websites and landing pages designed to build customer trust and turn visitors into paying clients.",
        icon: Globe,
        features: [
          "Modern, Clean & Mobile-First Design",
          "Built-in SEO to Rank Higher on Google",
          "Instant Page Load Speed (< 1 Second)",
          "WhatsApp Click-to-Chat & Ready Lead Forms"
        ],
        ctaText: "Discuss Website Project",
        accent: "#B8FF00"
      },
      {
        id: "custom-system",
        number: "02",
        badge: "BUSINESS AUTOMATION",
        title: "Custom Web Applications",
        subtitle: "Eliminate Slow Manual Spreadsheets",
        description: "Custom web software to automate inventory tracking, order management, point-of-sale (POS), and financial reports accurately.",
        icon: Layers,
        features: [
          "Automate Inventory, POS & Orders",
          "Real-Time Business & Revenue Reports",
          "Role-Based Access & Multi-Branch Support",
          "WhatsApp Notification & Payment Gateways"
        ],
        ctaText: "Discuss Custom Software",
        accent: "#06B6D4",
        popular: true
      },
      {
        id: "bot-ai",
        number: "03",
        badge: "AUTOMATED BOTS & AI",
        title: "Automated Bots & AI Integration",
        subtitle: "24/7 Smart CS & Workflow Automation",
        description: "Build intelligent bots for WhatsApp, Telegram, or websites to handle customer inquiries 24/7, process incoming orders, and integrate custom AI into your workflow.",
        icon: Bot,
        features: [
          "24/7 WhatsApp & Telegram Auto-Reply Bots",
          "AI Integration for Customer Support",
          "Automated Order Notifications & Broadcasts",
          "Reduce Support Costs & Instant Response Times"
        ],
        ctaText: "Discuss Bot & AI",
        accent: "#A855F7"
      }
    ],
    guaranteeTitle: "WHY PARTNER WITH EKSCODER",
    guarantees: [
      {
        icon: Zap,
        title: "Ultra-Fast Performance",
        desc: "Instant page loads with zero lag"
      },
      {
        icon: ShieldCheck,
        title: "Protected & Secure Data",
        desc: "Encryption & regular auto-backups"
      },
      {
        icon: TrendingUp,
        title: "Ready to Scale",
        desc: "Easily add new features anytime"
      },
      {
        icon: MessageSquare,
        title: "Direct WhatsApp Support",
        desc: "Responsive engineering team on standby"
      }
    ]
  }
};

export const Technologies: React.FC = () => {
  const { language } = useLanguage();
  const content = solutionsContent[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".solution-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            clearProps: "transform",
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
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [language]);

  return (
    <section
      id="solutions"
      ref={containerRef}
      className="py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-transparent relative border-b border-neutral-800/60 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#B8FF00]/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#06B6D4]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-[#B8FF00]" />
              <span>{content.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight uppercase text-white leading-tight">
              <span>{content.title1}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B8FF00] to-neutral-400">
                {content.title2}
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm sm:text-base font-light leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* 3 Core Solution Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {content.solutions.map((sol) => {
            const Icon = sol.icon;
            const message = language === "ID"
              ? `Halo Ekscoder, saya ingin konsultasi mengenai ${sol.title}.`
              : `Hi Ekscoder, I would like to consult about ${sol.title}.`;
            const actionUrl = getWhatsAppUrl(message);

            return (
              <div
                key={sol.id}
                className={`solution-card relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-400 group border overflow-hidden ${
                  sol.popular
                    ? "bg-gradient-to-b from-[#16181b] to-[#101114] border-[#06B6D4]/40 shadow-2xl shadow-[#06B6D4]/10"
                    : "bg-[#111214] border-neutral-800 hover:border-neutral-700"
                }`}
                style={{
                  borderColor: sol.popular ? `${sol.accent}60` : undefined,
                }}
              >
                {/* Popular / Recommended Badge */}
                {sol.popular && (
                  <div className="absolute top-0 right-0">
                    <div
                      className="px-4 py-1 rounded-bl-2xl font-mono text-[10px] font-extrabold uppercase tracking-widest text-black flex items-center space-x-1.5 shadow-md"
                      style={{ backgroundColor: sol.accent }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{language === "ID" ? "PALING DICARI" : "MOST POPULAR"}</span>
                    </div>
                  </div>
                )}

                {/* Top Section */}
                <div className="space-y-6">
                  {/* Icon & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${sol.accent}12`,
                        borderColor: `${sol.accent}30`,
                        color: sol.accent,
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="font-mono text-3xl font-black text-neutral-700 group-hover:text-neutral-500 transition-colors">
                      {sol.number}
                    </span>
                  </div>

                  {/* Badge & Title */}
                  <div>
                    <span
                      className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-3"
                      style={{
                        backgroundColor: `${sol.accent}10`,
                        borderColor: `${sol.accent}30`,
                        color: sol.accent,
                      }}
                    >
                      {sol.badge}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight leading-snug mb-1">
                      {sol.title}
                    </h3>

                    <p className="text-xs font-mono text-neutral-400 font-medium">
                      {sol.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-300 font-light text-sm leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="pt-2 space-y-3">
                    {sol.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-3">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${sol.accent}20`,
                            color: sol.accent,
                          }}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-xs font-mono text-neutral-200 leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-8 mt-6 border-t border-neutral-800/80">
                  <a
                    href={actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    suppressHydrationWarning
                    data-cursor="CONSULT"
                    className="w-full py-3.5 px-6 rounded-2xl flex items-center justify-between font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 group/btn"
                    style={{
                      backgroundColor: sol.popular ? sol.accent : "#1a1c20",
                      color: sol.popular ? "#000" : "#fff",
                      border: sol.popular ? "none" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span>{sol.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div
          ref={trustRef}
          className="p-6 sm:p-8 rounded-3xl bg-[#111214] border border-neutral-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#B8FF00] font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>{content.guaranteeTitle}</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              EKSCODER ENGINEERING STANDARD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.guarantees.map((item, gIdx) => {
              const GIcon = item.icon;
              return (
                <div key={gIdx} className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[#B8FF00] shrink-0">
                    <GIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-neutral-400 font-light text-xs leading-relaxed">
                      {item.desc}
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
