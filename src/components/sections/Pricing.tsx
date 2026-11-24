"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, Check, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations, WA_PHONE } from "@/data/translations";

export const Pricing: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].pricing;

  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const addonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".pricing-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            }
          );
        });
      }

      if (addonsRef.current) {
        gsap.fromTo(
          addonsRef.current,
          { opacity: 0, y: 25 },
          {
            scrollTrigger: {
              trigger: addonsRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getPackageWhatsAppUrl = (planName: string, planPrice: string) => {
    const message = `Halo Ekscoder, saya tertarik konsultasi dan memesan Paket ${planName} (${planPrice}).`;
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-16 bg-[#08080A] text-white relative border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
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

        {/* Payment Terms & Guarantee Ribbon */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#0F0F14] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2 text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span className="font-medium tracking-wide">{t.terms}</span>
          </div>
          <span className="text-[11px] text-neutral-500 uppercase tracking-widest">
            KONTRAK RESMI & SPESIFIKASI JELAS
          </span>
        </div>

        {/* ── 1. MAIN SERVICE PACKAGES (FOKUS UTAMA) ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {t.plans.map((plan) => {
            const isFeatured = plan.featured;
            const waUrl = getPackageWhatsAppUrl(plan.name, plan.price);

            return (
              <div
                key={plan.id}
                className={`pricing-card relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? "bg-[#121218] border-2 border-white shadow-[0_10px_40px_rgba(255,255,255,0.06)]"
                    : "bg-[#0D0D12] border border-white/10 hover:border-white/25"
                }`}
              >
                {/* Popular Pill Badge */}
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest shadow-md">
                      {plan.badge || t.popularBadge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="pb-6 border-b border-white/10">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
                      {plan.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight uppercase">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#F4F4F6] tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs text-neutral-500">
                        / {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Plan Description */}
                  <p className="py-5 text-xs text-neutral-400 leading-relaxed min-h-[4rem]">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-2 pb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2.5 text-xs">
                        <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span className="text-neutral-300 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-white/5">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center space-x-2 w-full py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isFeatured
                        ? "bg-white text-black hover:bg-neutral-200 shadow-md"
                        : "bg-[#181820] border border-white/10 text-white hover:bg-white hover:text-black hover:border-white"
                    }`}
                  >
                    <span>{plan.id === "custom" ? t.customCta : t.bookCta}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 2. ADD-ONS & MAINTENANCE SUPPORTING SECTION ── */}
        <div ref={addonsRef} className="mt-20 pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Add-ons Table */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                  {t.addons.title}
                </span>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {t.addons.subtitle}
                </p>
              </div>

              <div className="space-y-2.5">
                {t.addons.items.map((addon, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-4 rounded-xl bg-[#0D0D12] border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="text-white font-medium block">{addon.name}</span>
                      <span className="text-[11px] text-neutral-500">{addon.note}</span>
                    </div>
                    <span className="text-white font-bold tracking-wide">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Renewal & Maintenance Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                  {t.maintenance.title}
                </span>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Kejelasan biaya operasional jangka panjang untuk ketenangan bisnis Anda.
                </p>
              </div>

              {/* Annual Renewal Box */}
              <div className="p-5 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                    {t.maintenance.renewalTitle}
                  </span>
                  <span className="text-xs text-white font-bold">
                    {t.maintenance.renewalPrice}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {t.maintenance.renewalDesc}
                </p>
              </div>

              {/* Maintenance Plans */}
              <div className="space-y-2.5">
                {t.maintenance.plans.map((mPlan, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-xl bg-[#0D0D12] border border-white/5 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{mPlan.name}</span>
                      <span className="text-white font-bold">{mPlan.price}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {mPlan.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
