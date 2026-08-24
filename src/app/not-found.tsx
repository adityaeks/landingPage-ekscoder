import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Layers, BookOpen, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found | EKSCODER",
  description: "The page or project you are looking for does not exist or has been relocated.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] flex flex-col justify-between relative overflow-hidden px-4 sm:px-6 md:px-12 py-8 sm:py-12">
      {/* Background Tech Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#B8FF00]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Bar / Brand */}
      <header className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center space-x-2 font-mono text-xl sm:text-2xl font-black tracking-tighter text-white"
        >
          <span>EKSCODER</span>
          <span className="text-[#B8FF00] group-hover:animate-ping">.</span>
        </Link>

        <div className="inline-flex items-center space-x-2 font-mono text-xs text-neutral-400 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-800 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>STATUS: 404_NOT_FOUND</span>
        </div>
      </header>

      {/* Main 404 Content Card */}
      <div className="relative z-10 max-w-2xl w-full mx-auto my-auto py-12 text-center">
        {/* Terminal Header Tag */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-[#B8FF00] font-mono text-xs tracking-widest uppercase mb-6 shadow-lg shadow-black/50">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SYSTEM_EXCEPTION // ROUTE_UNAVAILABLE</span>
        </div>

        {/* Large 404 Headline */}
        <h1 className="text-7xl sm:text-9xl font-mono font-black tracking-tighter text-white uppercase select-none mb-4">
          4<span className="text-[#B8FF00]">0</span>4
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl font-mono font-bold text-neutral-200 tracking-tight mb-4">
          PAGE OR PROJECT NOT FOUND
        </h2>

        {/* Description */}
        {/* <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10">
          Halaman atau URL proyek yang Anda tuju telah dipindahkan atau diganti ke dalam format modal interaktif di beranda utama kami.
        </p> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm font-bold">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#B8FF00] text-black hover:bg-[#a3e600] transition-all duration-300 uppercase shadow-lg shadow-[#B8FF00]/10 group"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Back To Home</span>
          </Link>

          {/* <Link
            href="/#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition-all duration-300 uppercase"
          >
            <Layers className="w-4 h-4 text-[#B8FF00]" />
            <span>Lihat Showcase Proyek</span>
          </Link>

          <Link
            href="/#blog"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition-all duration-300 uppercase"
          >
            <BookOpen className="w-4 h-4 text-[#B8FF00]" />
            <span>Baca Blog</span>
          </Link> */}
        </div>
      </div>

      {/* Footer info bar */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-600 gap-2 border-t border-neutral-900 pt-6">
        <div>&copy; {new Date().getFullYear()} EKSCODER. ALL SYSTEMS OPERATIONAL.</div>
        <div className="text-neutral-500">
          NEED ASSISTANCE?{" "}
          <Link href="/#contact" className="text-[#B8FF00] hover:underline">
            CONTACT SUPPORT
          </Link>
        </div>
      </footer>
    </main>
  );
}
