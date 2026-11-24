export const WA_PHONE = "6281230508019";
export const WA_LINK = "https://wa.me/6281230508019?text=Halo%20Ekscoder%2C%20saya%20ingin%20konsultasi%20project.";
export const TIKTOK_LINK = "https://www.tiktok.com/@ekscoder?_r=1&_t=ZS-998g68gOAhW";
export const INSTAGRAM_LINK = "https://www.instagram.com/ekscoder";

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
      talk: "LET'S TALK"
    },
    hero: {
      badge: "CREATIVE TECHNOLOGY STUDIO",
      line1: "START YOUR",
      line2: "DIGITAL JOURNEY",
      line3: "WITH US.",
      description: "We engineer high-performance web platforms, enterprise software, and digital products that drive real business growth.",
      viewWork: "VIEW OUR WORK",
      talk: "LET'S TALK",
      bottomBar: "DIGITAL PLATFORMS · ENTERPRISE ERP · UI/UX DESIGN · BUSINESS AUTOMATION"
    },
    manifesto: {
      badge: "ABOUT THE STUDIO",
      heading: "WE BUILD FAST, PURPOSEFUL SOFTWARE FOR BUSINESSES READY TO GROW.",
      paragraph1: "Ekscoder is an independent software engineering studio based in Surabaya. We design and build high-speed web platforms, bespoke internal management tools, dependable backend APIs, and provide custom AI integration alongside dedicated AI training tailored to your business operations.",
      paragraph2: "We avoid generic templates and unnecessary bloat. Every system and artificial intelligence solution we deliver is tailored directly to how your business runs, built with clean code, and tested for reliability.",
      pillars: [
        {
          number: "01",
          title: "Speed & Performance",
          description: "Sub-second loading times, optimized database queries, and lightweight frontend architecture that keeps visitors engaged."
        },
        {
          number: "02",
          title: "Engineered For Scale",
          description: "Modular codebases, well-documented APIs, and clean data structures ready to handle growth without needing rewrites."
        },
        {
          number: "03",
          title: "Clear Communication",
          description: "Direct collaboration with senior engineers, weekly progress milestones, and zero technical jargon."
        }
      ]
    },
    services: {
      badge: "CORE DISCIPLINES",
      title: "WHAT WE BUILD.",
      description: "Focused digital engineering for companies that value speed, craft, and business results.",
      items: [
        {
          number: "01",
          category: "WEB & ENTERPRISE PLATFORMS",
          title: "Custom Web & Enterprise Engineering",
          description: "High-speed modern web applications and bespoke internal management platforms (ERP/POS). Built precisely around your unique business workflows to automate operations and establish brand authority.",
          deliverables: ["Interactive Web Apps", "Custom ERP & POS Systems", "Real-Time Management Dashboards", "Modern Corporate Portals"]
        },
        {
          number: "02",
          category: "CYBERSECURITY & CLOUD INFRA",
          title: "Cybersecurity & Cloud Infrastructure",
          description: "Robust backend server foundations, resilient API architectures, and comprehensive Penetration Testing audits to uncover vulnerabilities and secure your critical business data against cyber threats.",
          deliverables: ["Penetration Testing & Security Audits", "Backend & Cloud API Architecture", "Linux VPS Setup & Hardening", "Database Vulnerability Protection"]
        },
        {
          number: "03",
          category: "AI & WORKFLOW AUTOMATION",
          title: "Workflow Automation & Custom AI",
          description: "Direct artificial intelligence integration into your operational workflows. Covering repetitive task automation, internal document knowledge assistants (RAG), and tailored AI model training (AI Trainer) built for your exact needs.",
          deliverables: ["LLM Integration & AI Solutions", "Custom AI Model Training", "Knowledge Base Assistants (RAG)", "Operational Workflow Automation"]
        }
      ]
    },
    pricing: {
      badge: "OUR PACKAGES",
      title: "PACKAGES & PRICING.",
      description: "Direct, transparent software investment. Tailored packages designed to help your business establish authority and generate real leads.",
      terms: "50% upfront deposit · 50% upon go-live · 30-day technical warranty",
      bookCta: "SELECT PACKAGE",
      customCta: "CONSULT SCOPE",
      popularBadge: "MOST POPULAR",
      plans: [
        {
          id: "mulai",
          name: "Mulai",
          subtitle: "Landing Page",
          price: "Rp499rb",
          period: "one-time",
          featured: false,
          description: "Ideal for new product validation, promotional campaigns, or concise brand introductions.",
          copywritingIncluded: true,
          features: [
            "1 Responsive Modern Page",
            "Copywriting",
            "Mobile-first fast responsive design",
            "Direct WhatsApp order button",
            "Basic domain & server setup"
          ]
        },
        {
          id: "bisnis",
          name: "Bisnis",
          subtitle: "Company Profile",
          price: "Rp999rb",
          period: "one-time",
          featured: true,
          badge: "MOST POPULAR",
          description: "Our most popular package for companies and modern brands seeking high credibility.",
          copywritingIncluded: true,
          features: [
            "Full Multi-Section Company Profile",
            "Copywriting",
            "Portfolio & company credential showcase",
            "Contact form & direct WhatsApp routing",
            "Speed & basic SEO optimization"
          ]
        },
        {
          id: "toko",
          name: "Toko",
          subtitle: "Online Catalog",
          price: "Rp1.999rb",
          period: "one-time",
          featured: false,
          description: "Interactive digital product catalog built to streamline buyer inquiries and orders.",
          copywritingIncluded: true,
          features: [
            "Structured Product Catalog",
            "Copywriting",
            "Category & product detail views",
            "Automated order routing to WhatsApp",
            "Fast, friction-free customer UX"
          ]
        },
        {
          id: "custom",
          name: "Custom",
          subtitle: "Tailor-made Systems",
          price: "From Rp3.000rb",
          period: "custom scope",
          featured: false,
          description: "Bespoke digital architecture for specific business and operational workflows.",
          copywritingIncluded: false,
          features: [
            "Detailed written scope agreed before start",
            "Custom database & system architecture",
            "Operational management / admin dashboard",
            "Role-based access & robust security",
            "30-day technical warranty & handover"
          ]
        }
      ],
      addons: {
        title: "OPTIONAL ADD-ONS",
        subtitle: "Available on top of any package (without copywriting):",
        items: [
          { name: "Extra Page", price: "Rp150rb", note: "per additional page" },
          { name: "Brand Logo", price: "Rp350rb", note: "vector & identity mark" },
          { name: "Payment Gateway", price: "Rp450rb", note: "automated checkout setup" },
          { name: "English Version", price: "Rp300rb", note: "bilingual + language switcher" },
          { name: "Express Delivery", price: "+50%", note: "accelerated sprint schedule" }
        ]
      },
      maintenance: {
        title: "RENEWAL & MAINTENANCE",
        renewalTitle: "Annual Renewal",
        renewalPrice: "Rp399rb / year",
        renewalDesc: "Transparent from day one. Covers server hosting maintenance and annual domain renewal.",
        plans: [
          {
            name: "Basic Maintenance",
            price: "Rp99rb / month",
            desc: "Uptime monitoring, periodic backups, and security patch updates."
          },
          {
            name: "Pro Maintenance",
            price: "Rp199rb / month",
            desc: "24/7 priority monitoring, regular backups, and minor content updates."
          }
        ]
      }
    },
    projects: {
      badge: "FEATURED WORK",
      title: "SELECTED PROJECTS.",
      description: "Recent digital platforms and software systems delivered for our clients.",
      filterAll: "ALL WORK",
      viewProject: "VIEW PROJECT",
      livePreview: "LIVE PREVIEW"
    },
    process: {
      badge: "HOW WE WORK",
      title: "METHODOLOGY.",
      description: "A transparent, milestone-driven approach from initial brief to production launch.",
      steps: [
        {
          number: "01",
          title: "Discovery & Scope",
          subtitle: "Strategy",
          description: "We review your operational requirements, define feature priorities, and design system topology before writing a single line of code."
        },
        {
          number: "02",
          title: "Interface Architecture",
          subtitle: "Design",
          description: "Creating purposeful interfaces and interactive user journeys. Every view is built for clarity and fast navigation."
        },
        {
          number: "03",
          title: "Production Engineering",
          subtitle: "Development",
          description: "Building frontend and backend logic adhering to clean code standards, strict security practices, and responsive performance."
        },
        {
          number: "04",
          title: "Deployment & Delivery",
          subtitle: "Launch",
          description: "Production launch on your cloud servers, automated backups, SSL encryption, staff walkthroughs, and complete source code handover."
        }
      ]
    },
    blog: {
      badge: "ENGINEERING JOURNAL",
      title: "LATEST WRITINGS.",
      description: "Practical engineering notes, architecture guides, and development practices from our team.",
      allFilter: "ALL ARTICLES",
      readArticle: "READ ARTICLE",
      featuredBadge: "FEATURED",
      views: "views",
      by: "By",
      publishedOn: "Published",
      closeModal: "CLOSE ARTICLE",
      share: "SHARE ARTICLE",
      emptyTitle: "NO ARTICLES YET",
      emptyDesc: "Technical insights and architecture notes will appear here soon."
    },
    cta: {
      badge: "LET'S DISCUSS YOUR PROJECT",
      line1: "HAVE A PROJECT IN MIND?",
      line2: "LET'S BUILD IT RIGHT.",
      description: "Whether you need a new web application, an operational management system, or custom backend APIs, we are ready to help. Book a direct consultation to discuss your requirements.",
      startProject: "WHATSAPP CONSULTATION",
      whatsapp: "WHATSAPP: 0812-3050-8019",
      email: "contact@ekscoder.com"
    },
    footer: {
      description: "Ekscoder builds high-performance web applications and custom software systems for forward-thinking businesses.",
      navigationTitle: "INDEX",
      socialTitle: "CHANNELS",
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
      process: "METODE",
      blog: "ARTIKEL",
      talk: "KONSULTASI"
    },
    hero: {
      badge: "STUDIO TEKNOLOGI KREATIF",
      line1: "MULAI PERJALANAN",
      line2: "DIGITALMU",
      line3: "BERSAMA KAMI.",
      description: "Kami membangun platform web berkinerja tinggi, software enterprise, dan produk digital yang mendorong pertumbuhan bisnis nyata.",
      viewWork: "LIHAT KARYA KAMI",
      talk: "HUBUNGI KAMI",
      bottomBar: "PLATFORM DIGITAL · ERP ENTERPRISE · DESAIN UI/UX · OTOMATISASI BISNIS"
    },
    manifesto: {
      badge: "TENTANG STUDIO",
      heading: "KAMI MEMBANGUN SOFTWARE CEPAT DAN TEPAT GUNA UNTUK BISNIS YANG SIAP TUMBUH.",
      paragraph1: "Ekscoder adalah studio rekayasa perangkat lunak independen berbasis di Surabaya. Kami merancang dan membangun platform web berkinerja tinggi, sistem manajemen internal kustom, arsitektur API yang tangguh, serta menyediakan pemasangan automasi AI dan pelatihan (trainer AI) khusus untuk kebutuhan operasional bisnis Anda.",
      paragraph2: "Kami menghindari template instan dan fitur yang berbelit-belit. Setiap perangkat lunak dan sistem kecerdasan buatan yang kami kembangkan disesuaikan langsung dengan alur kerja bisnis Anda, ditulis dengan kode bersih, dan teruji keandalannya.",
      pillars: [
        {
          number: "01",
          title: "Kecepatan & Performa",
          description: "Waktu muat di bawah satu detik, optimasi kueri database, dan arsitektur frontend ringan yang menjaga retensi pengguna."
        },
        {
          number: "02",
          title: "Fondasi Siap Berkembang",
          description: "Struktur kode modular, dokumentasi API lengkap, dan skema data rapi yang siap menampung lonjakan traffic tanpa perlu ditulis ulang."
        },
        {
          number: "03",
          title: "Komunikasi Langsung & Transparan",
          description: "Diskusi langsung bersama engineer teknis, laporan milestone berkala setiap minggu, dan tanpa istilah teknis yang membingungkan."
        }
      ]
    },
    services: {
      badge: "DISIPLIN UTAMA",
      title: "YANG KAMI BANGUN.",
      description: "Layanan rekayasa digital terfokus untuk bisnis yang mengutamakan kecepatan, ketelitian, dan hasil nyata.",
      items: [
        {
          number: "01",
          category: "PLATFORM WEB & ENTERPRISE",
          title: "Rekayasa Web & Software Kustom",
          description: "Aplikasi web modern berkecepatan tinggi serta sistem manajemen internal kustom (ERP/POS). Dirancang tepat mengikuti alur kerja unik bisnis Anda untuk mengotomasi operasional dan meningkatkan daya tarik brand.",
          deliverables: ["Aplikasi Web Interaktif", "Sistem ERP & Kasir POS", "Dashboard Manajemen Real-time", "Portal Bisnis Modern"]
        },
        {
          number: "02",
          category: "KEAMANAN SIBER & CLOUD",
          title: "Keamanan Siber & Infrastruktur Cloud",
          description: "Fondasi server backend yang kokoh, arsitektur API stabil, serta layanan Penetration Testing (uji penetrasi keamanan) untuk mengaudit kerentanan dan menutup celah keamanan data bisnis Anda dari potensi serangan siber.",
          deliverables: ["Penetration Testing & Audit Keamanan", "Arsitektur Backend & Cloud API", "Setup & Hardening VPS Linux", "Proteksi Kerentanan Database"]
        },
        {
          number: "03",
          category: "INTEGRASI AI & AUTOMASI",
          title: "Automasi Alur Kerja & Solusi AI Kustom",
          description: "Integrasi kecerdasan buatan langsung ke dalam alur kerja bisnis Anda. Mulai dari automasi tugas operasional berulang, asisten cerdas berbasis dokumen perusahaan (RAG), hingga pelatihan dan fine-tuning model AI (Trainer AI) sesuai kebutuhan spesifik Anda.",
          deliverables: ["Integrasi LLM & Solusi AI", "Pelatihan Model AI (Trainer AI)", "AI Assistant Berbasis Dokumen (RAG)", "Automasi Alur Kerja Internal"]
        }
      ]
    },
    pricing: {
      badge: "PAKET JASA KAMI",
      title: "PILIHAN PAKET & BIAYA.",
      description: "Investasi transparan dan terukur untuk transformasi digital bisnis Anda. Tanpa biaya tersembunyi.",
      terms: "DP 50% · Pelunasan saat go-live · Garansi teknis 30 hari",
      bookCta: "PILIH PAKET",
      customCta: "KONSULTASI SCOPE",
      popularBadge: "PALING LARIS",
      plans: [
        {
          id: "mulai",
          name: "Mulai",
          subtitle: "Landing Page",
          price: "Rp499rb",
          period: "sekali bayar",
          featured: false,
          description: "Tepat untuk validasi produk baru, promo kampanye khusus, atau pengenalan brand yang fokus.",
          copywritingIncluded: true,
          features: [
            "1 Halaman Responsif Modern",
            "Copywriting",
            "Desain mobile-first berkecepatan tinggi",
            "Integrasi tombol WhatsApp langsung",
            "Setup domain & server dasar"
          ]
        },
        {
          id: "bisnis",
          name: "Bisnis",
          subtitle: "Company Profile",
          price: "Rp999rb",
          period: "sekali bayar",
          featured: true,
          badge: "PALING LARIS",
          description: "Paling laris. Pilihan utama bisnis dan UMKM untuk membangun kredibilitas profesional di mata klien.",
          copywritingIncluded: true,
          features: [
            "Company Profile Multi-Bagian Lengkap",
            "Copywriting",
            "Showcase portofolio & profil perusahaan",
            "Formulir kontak & rute WhatsApp",
            "Optimasi kecepatan & SEO dasar"
          ]
        },
        {
          id: "toko",
          name: "Toko",
          subtitle: "Toko Online / Katalog",
          price: "Rp1.999rb",
          period: "sekali bayar",
          featured: false,
          description: "Platform katalog produk interaktif siap pakai untuk mempermudah calon pembeli memesan produk.",
          copywritingIncluded: true,
          features: [
            "Katalog Produk Rapi & Dinamis",
            "Copywriting",
            "Kategori & halaman detail produk",
            "Tombol order otomatis ke WhatsApp",
            "Pengalaman belanja cepat & praktis"
          ]
        },
        {
          id: "custom",
          name: "Custom",
          subtitle: "Sistem Kustom",
          price: "Mulai Rp3.000rb",
          period: "sesuai kebutuhan",
          featured: false,
          description: "Solusi sistem perangkat lunak yang dirancang khusus mengikuti alur kerja dan operasional bisnis Anda.",
          copywritingIncluded: false,
          features: [
            "Scope tertulis disepakati sebelum mulai",
            "Arsitektur database & logika kustom",
            "Dashboard manajemen / panel admin",
            "Hak akses bertingkat & keamanan teruji",
            "Garansi teknis 30 hari & serah terima penuh"
          ]
        }
      ],
      addons: {
        title: "ADD-ON TAMBAHAN",
        subtitle: "Layanan tambahan opsional untuk melengkapi paket Anda (tanpa copywriting):",
        items: [
          { name: "Halaman Tambahan", price: "Rp150rb", note: "per halaman tambahan" },
          { name: "Desain Logo Brand", price: "Rp350rb", note: "aset vektor & logo mark" },
          { name: "Payment Gateway", price: "Rp450rb", note: "integrasi pembayaran otomatis" },
          { name: "Bahasa Inggris (Bilingual)", price: "Rp300rb", note: "dua bahasa + tombol ganti bahasa" },
          { name: "Kejar Tayang (Express)", price: "+50%", note: "prioritas pengerjaan kilat" }
        ]
      },
      maintenance: {
        title: "RENEWAL & MAINTENANCE",
        renewalTitle: "Renewal Tahunan",
        renewalPrice: "Rp399rb / tahun",
        renewalDesc: "Transparan sejak hari pertama. Menjamin kelangsungan domain, server hosting, dan SSL website Anda tetap aktif.",
        plans: [
          {
            name: "Maintenance Basic",
            price: "Rp99rb / bulan",
            desc: "Pemantauan server, backup data berkala, dan pembaruan patch keamanan minor."
          },
          {
            name: "Maintenance Pro",
            price: "Rp199rb / bulan",
            desc: "Pemantauan prioritas 24/7, backup rutin, dan pembaruan konten minor berkala."
          }
        ]
      }
    },
    projects: {
      badge: "PROYEK PILIHAN",
      title: "KARYA TERBARU.",
      description: "Platform digital dan sistem software yang telah kami selesaikan dan aktif digunakan klien.",
      filterAll: "SEMUA KARYA",
      viewProject: "LIHAT DETAIL",
      livePreview: "KUNJUNGI SITUS"
    },
    process: {
      badge: "CARA KERJA",
      title: "METODOLOGI KAMI.",
      description: "Pendekatan kerja transparan dan bertahap, dari perumusan kebutuhan awal hingga peluncuran server.",
      steps: [
        {
          number: "01",
          title: "Diskusi & Pemetaan Kebutuhan",
          subtitle: "Strategi",
          description: "Membedah kebutuhan sistem, menentukan skala prioritas fitur, dan merancang skema arsitektur sebelum mulai menulis kode."
        },
        {
          number: "02",
          title: "Perancangan Antarmuka",
          subtitle: "Desain UI/UX",
          description: "Menyusun tampilan antarmuka yang fungsional dan alur navigasi yang intuitif. Memastikan setiap layar mudah digunakan oleh tim maupun pelanggan."
        },
        {
          number: "03",
          title: "Rekayasa Kode & Pengembangan",
          subtitle: "Pengembangan",
          description: "Menulis kode frontend dan logika backend sesuai standar kode bersih, pengujian keamanan ketat, dan optimasi kecepatan muat."
        },
        {
          number: "04",
          title: "Peluncuran & Serah Terima",
          subtitle: "Peluncuran",
          description: "Deployment ke server cloud Anda, backup otomatis, konfigurasi SSL, panduan penggunaan untuk tim, dan penyerahan penuh kode sumber."
        }
      ]
    },
    blog: {
      badge: "JURNAL TEKNIS",
      title: "CATATAN REKAYASA.",
      description: "Tulisan praktis, panduan arsitektur software, dan praktik pengembangan langsung dari tim engineer kami.",
      allFilter: "SEMUA ARTIKEL",
      readArticle: "BACA ARTIKEL",
      featuredBadge: "UNGGULAN",
      views: "dilihat",
      by: "Oleh",
      publishedOn: "Diterbitkan",
      closeModal: "TUTUP ARTIKEL",
      share: "BAGIKAN ARTIKEL",
      emptyTitle: "BELUM ADA ARTIKEL",
      emptyDesc: "Catatan rekayasa dan panduan teknis akan segera dipublikasikan di sini."
    },
    cta: {
      badge: "KONSULTASIKAN KEBUTUHAN ANDA",
      line1: "PUNYA IDE PROYEK?",
      line2: "MARI BANGUN DENGAN TEPAT.",
      description: "Baik untuk pembuatan aplikasi web baru, sistem manajemen operasional, maupun integrasi API kustom, tim kami siap berdiskusi. Jadwalkan konsultasi langsung tanpa komitmen.",
      startProject: "KONSULTASI VIA WHATSAPP",
      whatsapp: "WHATSAPP: 0812-3050-8019",
      email: "contact@ekscoder.com"
    },
    footer: {
      description: "Ekscoder merancang dan membangun aplikasi web berkinerja tinggi serta sistem software kustom untuk bisnis modern.",
      navigationTitle: "INDEKS",
      socialTitle: "SALURAN",
      rights: "© 2026 EKSCODER. HAK CIPTA DILINDUNGI.",
      tagline: "CREATIVE TECHNOLOGY STUDIO",
      top: "Kembali ke Atas"
    }
  }
};
