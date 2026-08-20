export const WA_PHONE = "6281230508019";
export const WA_LINK = "https://wa.me/6281230508019?text=Halo%20Ekscoder%2C%20saya%20ingin%20konsultasi%20project.";

export function getWhatsAppUrl(message: string = "Halo Ekscoder, saya ingin konsultasi project."): string {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message.trim())}`;
}

export const translations = {
  EN: {
    nav: {
      navigation: "NAVIGATION",
      about: "ABOUT",
      capabilities: "CAPABILITIES",
      services: "SERVICES",
      solutions: "SOLUTIONS",
      work: "WORK",
      project: "PROJECTS",
      process: "PROCESS",
      blog: "ARTICLES",
      talk: "LET'S TALK NOW"
    },
    hero: {
      badge: "CREATIVE TECHNOLOGY STUDIO",
      line1: "START YOUR",
      line2: "DIGITAL JOURNEY",
      line3: "WITH US.",
      description: "We engineer high-performance web platforms, enterprise software, and digital products that drive real business growth.",
      viewWork: "VIEW OUR WORK",
      talk: "LET'S TALK",
      bottomBar: "DIGITAL PLATFORMS // ENTERPRISE ERP // UI/UX DESIGN // BUSINESS AUTOMATION"
    },
    intro: {
      badge: "ABOUT US // DIGITAL TRANSFORMATION",
      line1: "WE TRANSFORM",
      line2: "YOUR BUSINESS",
      line3: "INTO DIGITAL.",
      description: "EKSCODER helps businesses, startups, and enterprises transition into the digital era. We build high-performance web platforms, custom software architectures, and scalable digital engines designed to drive modern business growth.",
      stat1Label: "CUSTOM CODE",
      stat2Label: "CORE SERVICES",
      stat3Label: "UPTIME ARCHITECTURE",
      stat4Label: "AVG RESPONSE"
    },
    capabilities: {
      badge: "CAPABILITIES // BUSINESS & ENTERPRISE SHOWCASE",
      title: "CORE DOMAINS.",
      scrollInstruction: "[ SCROLL DOWN TO EXPLORE → ]",
      domains: [
        {
          title: "WEB & DIGITAL PLATFORMS",
          subtitle: "HIGH-CONVERSION USER EXPERIENCE",
          description: "High-performance web applications, corporate platforms, and interactive portals designed to strengthen brand authority and drive business conversions."
        },
        {
          title: "ENTERPRISE SOFTWARE & ERP",
          subtitle: "BUSINESS AUTOMATION & WORKFLOWS",
          description: "Custom management systems, ERP software, automated business logic engines, and scalable APIs engineered for operational efficiency."
        },
        {
          title: "PRODUCT UI/UX & BRANDING",
          subtitle: "PREMIUM DESIGN & RETENTION",
          description: "World-class UI/UX design, custom design tokens, and fluid micro-interactions crafted to maximize user satisfaction and customer retention."
        }
      ]
    },
    services: {
      badge: "WHAT WE DO",
      title: "SERVICES.",
      description: "Tailored digital engineering and creative technology offerings designed for businesses demanding excellence."
    },
    solutions: {
      badge: "BUSINESS SOLUTIONS // WHAT WE OFFER",
      title: "HOW WE HELP YOUR BUSINESS.",
      description: "Simple, practical, and powerful digital solutions to get more clients, automate daily work, and keep your business running smoothly.",
      tabActive: "[ ACTIVE SOLUTION ]",
      tabSelect: "LEARN MORE →",
      impactOverview: "WHY THIS MATTERS FOR YOUR BUSINESS",
      focusLabel: "MAIN FOCUS",
      benefitLabel: "REAL BENEFIT",
      highlightsTitle: "// KEY ADVANTAGES",
      matrixTitle: "WHY PARTNER WITH EKSCODER",
      matrixCount: "9 ESSENTIAL VALUES"
    },
    projects: {
      badge: "FEATURED WORK // RECENT DELIVERIES",
      title: "SELECTED PROJECTS.",
      description: "A collection of digital products, enterprise applications, and brand experiences built for impact.",
      filterAll: "ALL WORK",
      viewProject: "VIEW PROJECT",
      livePreview: "LIVE PREVIEW"
    },
    process: {
      badge: "OUR METHODOLOGY // HOW WE WORK",
      title: "THE PROCESS.",
      description: "A structured, agile workflow designed to deliver world-class software on time and without compromise."
    },
    blog: {
      badge: "INSIGHTS // TECHNICAL ARTICLES",
      title: "LATEST ARTICLES.",
      description: "Technical insights, DevOps guides, and engineering practices directly from our core development team.",
      allFilter: "ALL ARTICLES",
      readArticle: "READ ARTICLE",
      featuredBadge: "FEATURED",
      views: "views",
      by: "By",
      publishedOn: "Published",
      closeModal: "CLOSE ARTICLE",
      share: "SHARE ARTICLE",
      emptyTitle: "NO ARTICLES YET",
      emptyDesc: "Technical insights, DevOps guides, and engineering updates will be published here soon."
    },
    cta: {
      badge: "LET'S COLLABORATE",
      line1: "HAVE AN IDEA?",
      line2: "LET'S BUILD IT.",
      description: "Have a new web project, custom software requirement, or digital product in mind? Get a free consultation — let's discuss your vision, plan the architecture, and turn it into reality.",
      startProject: "FREE CONSULTATION (WA)",
      whatsapp: "WHATSAPP: 0812-3050-8019",
      email: "contact@ekscoder.com"
    },
    footer: {
      description: "Building digital experiences through code, creativity, and technology. Focused on modern web apps, scalable software, and motion design.",
      navigationTitle: "// NAVIGATION",
      socialTitle: "// SOCIAL CHANNELS",
      rights: "© 2026 EKSCODER. ALL RIGHTS RESERVED.",
      tagline: "CREATIVE TECHNOLOGY STUDIO",
      top: "Back to Top"
    }
  },
  ID: {
    nav: {
      navigation: "NAVIGASI",
      about: "TENTANG",
      capabilities: "KAPABILITAS",
      services: "LAYANAN",
      solutions: "SOLUSI",
      work: "PORTOFOLIO",
      project: "PROYEK",
      process: "ALUR KERJA",
      blog: "ARTIKEL",
      talk: "KONSULTASI SEKARANG"
    },
    hero: {
      badge: "STUDIO TEKNOLOGI KREATIF",
      line1: "MULAI PERJALANAN",
      line2: "DIGITALMU",
      line3: "BERSAMA KAMI.",
      description: "Kami membangun platform web berkinerja tinggi, software enterprise, dan produk digital yang mendorong pertumbuhan bisnis nyata.",
      viewWork: "LIHAT KARYA KAMI",
      talk: "HUBUNGI KAMI",
      bottomBar: "PLATFORM DIGITAL // ERP ENTERPRISE // DESAIN UI/UX // OTOMATISASI BISNIS"
    },
    intro: {
      badge: "TENTANG KAMI // TRANSFORMASI DIGITAL",
      line1: "MENGUBAH",
      line2: "BISNIS ANDA",
      line3: "MENJADI DIGITAL.",
      description: "EKSCODER membantu bisnis, startup, dan enterprise bertransformasi ke ekosistem digital secara modern. Kami membangun platform web berkinerja tinggi, sistem software kustom, dan infrastruktur digital terukur yang siap mengakselerasi pertumbuhan bisnis Anda.",
      stat1Label: "CUSTOM CODE",
      stat2Label: "LAYANAN INTI",
      stat3Label: "UPTIME ARCHITECTURE",
      stat4Label: "AVG RESPONSE"
    },
    capabilities: {
      badge: "KAPABILITAS // ENTERPRISE & SOLUSI BISNIS",
      title: "BIDANG UTAMA.",
      scrollInstruction: "[ GULIR KE BAWAH UNTUK EXPLORE → ]",
      domains: [
        {
          title: "PLATFORM WEB & DIGITAL",
          subtitle: "PENGALAMAN DIGITAL HIGH-CONVERSION",
          description: "Aplikasi web berkinerja tinggi, portal korporat, dan platform interaktif yang dirancang untuk memperkuat kredibilitas brand serta meningkatkan konversi bisnis."
        },
        {
          title: "SOFTWARE ENTERPRISE & ERP",
          subtitle: "AUTOMASI OPERASIONAL & SISTEM UTAMA",
          description: "Sistem manajemen kustom, software ERP, mesin otomatisasi alur kerja bisnis, dan API terukur yang dirancang khusus untuk efisiensi operasional perusahaan."
        },
        {
          title: "DESAIN UI/UX & BRAND EXPERIENCE",
          subtitle: "UI/UX STRATEGIS & RETENSI PENGGUNA",
          description: "Desain UI/UX kelas dunia, sistem desain kustom, dan interaksi halus yang disusun untuk memaksimalkan kepuasan pengguna dan retensi pelanggan."
        }
      ]
    },
    services: {
      badge: "APA YANG KAMI KERJAKAN",
      title: "LAYANAN.",
      description: "Penawaran rekayasa digital dan teknologi kreatif yang dirancang khusus untuk bisnis yang menginginkan keunggulan."
    },
    solutions: {
      badge: "SOLUSI DIGITAL // APA YANG KAMI TAWARKAN",
      title: "SOLUSI TEPAT UNTUK BISNIS ANDA.",
      description: "Solusi digital praktis dan tepat guna untuk membantu bisnis Anda mendapatkan lebih banyak pelanggan, menghemat waktu kerja, dan selalu aktif 24 jam.",
      tabActive: "[ SOLUSI DIPILIH ]",
      tabSelect: "LIHAT DETAIL →",
      impactOverview: "MANFAAT LANGSUNG UNTUK BISNIS ANDA",
      focusLabel: "FOKUS UTAMA",
      benefitLabel: "KEUNTUNGAN NYATA",
      highlightsTitle: "// KEUNGGULAN UTAMA",
      matrixTitle: "NILAI LEBIH BEKERJASAMA DENGAN KAMI",
      matrixCount: "9 NILAI UTAMA"
    },
    projects: {
      badge: "KARYA UNGGULAN // PROYEK TERBARU",
      title: "PROYEK PILIHAN.",
      description: "Koleksi produk digital, aplikasi enterprise, dan pengalaman brand yang dibangun untuk dampak nyata.",
      filterAll: "SEMUA KARYA",
      viewProject: "LIHAT PROYEK",
      livePreview: "PRATINJAU LANGSUNG"
    },
    process: {
      badge: "METODOLOGI KAMI // CARA KERJA",
      title: "PROSES KERJA.",
      description: "Alur kerja terstruktur dan agile yang dirancang untuk menyampaikan perangkat lunak kelas dunia tepat waktu."
    },
    blog: {
      badge: "ARTIKEL & WAWASAN TEKNIS",
      title: "ARTIKEL TERBARU.",
      description: "Wawasan teknis, panduan DevOps, dan praktik rekayasa software dari tim pengembang utama Ekscoder.",
      allFilter: "SEMUA ARTIKEL",
      readArticle: "BACA ARTIKEL",
      featuredBadge: "UNGGULAN",
      views: "dilihat",
      by: "Oleh",
      publishedOn: "Diterbitkan",
      closeModal: "TUTUP ARTIKEL",
      share: "BAGIKAN ARTIKEL",
      emptyTitle: "BELUM ADA ARTIKEL",
      emptyDesc: "Wawasan teknis, panduan DevOps, dan artikel terbaru akan segera dipublikasikan di sini."
    },
    cta: {
      badge: "MARI BEKERJASAMA",
      line1: "PUNYA IDE?",
      line2: "MARI WUJUDKAN.",
      description: "Punya proyek web baru, kebutuhan perangkat lunak kustom, atau produk digital? Dapatkan konsultasi gratis — mari diskusikan visi Anda, rencanakan arsitektur, dan wujudkan bersama.",
      startProject: "KONSULTASI GRATIS (WA)",
      whatsapp: "WHATSAPP: 0812-3050-8019",
      email: "contact@ekscoder.com"
    },
    footer: {
      description: "Membangun pengalaman digital melalui kode, kreativitas, dan teknologi. Berfokus pada aplikasi web modern, software scalable, dan desain motion.",
      navigationTitle: "// NAVIGASI",
      socialTitle: "// SALURAN SOSIAL",
      rights: "© 2026 EKSCODER. HAK CIPTA DILINDUNGI.",
      tagline: "CREATIVE TECHNOLOGY STUDIO",
      top: "Kembali ke Atas"
    }
  }
};
