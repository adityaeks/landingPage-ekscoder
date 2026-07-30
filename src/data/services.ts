export interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  gradient: string;
}

export const servicesData: Record<"EN" | "ID", ServiceItem[]> = {
  EN: [
    {
      number: "01",
      title: "Website Development",
      subtitle: "High-impact brand experiences",
      description: "Crafting bespoke, motion-first websites engineered for high performance, SEO dominance, and unforgettable visual engagement.",
      deliverables: ["Modern Landing Pages", "Corporate Portfolios", "Interactive Motion Design", "SEO & Speed Optimization"],
      gradient: "from-lime-500/20 via-neutral-900 to-black"
    },
    {
      number: "02",
      title: "Web Application",
      subtitle: "Scalable digital products & SaaS",
      description: "Building fast, reactive web applications with robust frontend architectures, seamless state management, and intuitive user interfaces.",
      deliverables: ["SaaS Platforms", "Client Dashboards", "Progressive Web Apps", "Real-time Portals"],
      gradient: "from-emerald-500/20 via-neutral-900 to-black"
    },
    {
      number: "03",
      title: "Custom Software",
      subtitle: "Enterprise-grade digital solutions",
      description: "Architecting tailored business software, ERP systems, and internal toolings engineered to streamline operational bottlenecks.",
      deliverables: ["Enterprise ERP Systems", "Internal Management Tools", "Automated Workflows", "Custom Integrations"],
      gradient: "from-cyan-500/20 via-neutral-900 to-black"
    },
    {
      number: "04",
      title: "API & Backend Development",
      subtitle: "Resilient & high-throughput systems",
      description: "Designing RESTful and GraphQL APIs with microservice readiness, secure authentication, and optimized database queries.",
      deliverables: ["REST & GraphQL APIs", "Microservices Architecture", "Database Optimization", "Authentication Systems"],
      gradient: "from-purple-500/20 via-neutral-900 to-black"
    },
    {
      number: "05",
      title: "UI/UX & Digital Design",
      subtitle: "User-centric design systems",
      description: "Designing dark-themed, futuristic visual systems, high-fidelity prototypes, and component libraries that scale.",
      deliverables: ["Design Systems & Tokens", "High-Fidelity Wireframes", "Interactive Prototypes", "Micro-interaction Specs"],
      gradient: "from-rose-500/20 via-neutral-900 to-black"
    }
  ],
  ID: [
    {
      number: "01",
      title: "Pengembangan Website",
      subtitle: "Pengalaman brand berdampak tinggi",
      description: "Merancang website kustom berbasis motion yang dioptimalkan untuk performa tinggi, dominasi SEO, dan visual yang memukau.",
      deliverables: ["Landing Page Modern", "Portofolio Korporat", "Desain Motion Interaktif", "Optimasi SEO & Kecepatan"],
      gradient: "from-lime-500/20 via-neutral-900 to-black"
    },
    {
      number: "02",
      title: "Aplikasi Web",
      subtitle: "Produk digital & SaaS scalable",
      description: "Membangun aplikasi web reaktif yang cepat dengan arsitektur frontend tangguh, manajemen state andal, dan antarmuka intuitif.",
      deliverables: ["Platform SaaS", "Dashboard Klien", "Progressive Web Apps (PWA)", "Portal Real-time"],
      gradient: "from-emerald-500/20 via-neutral-900 to-black"
    },
    {
      number: "03",
      title: "Software Kustom",
      subtitle: "Solusi digital kelas enterprise",
      description: "Merancang perangkat lunak bisnis khusus, sistem ERP, dan alat internal yang dirancang untuk mengatasi hambatan operasional.",
      deliverables: ["Sistem ERP Enterprise", "Alat Manajemen Internal", "Otomatisasi Alur Kerja", "Integrasi Kustom"],
      gradient: "from-cyan-500/20 via-neutral-900 to-black"
    },
    {
      number: "04",
      title: "Pengembangan Backend & API",
      subtitle: "Sistem berdaya tahan & throughput tinggi",
      description: "Merancang RESTful dan GraphQL API siap microservice, autentikasi aman, dan kueri database yang teroptimasi.",
      deliverables: ["REST & GraphQL API", "Arsitektur Microservices", "Optimasi Database", "Sistem Autentikasi Aman"],
      gradient: "from-purple-500/20 via-neutral-900 to-black"
    },
    {
      number: "05",
      title: "UI/UX & Desain Digital",
      subtitle: "Sistem desain berpusat pada pengguna",
      description: "Merancang sistem visual modern bertema gelap, prototipe fungsional tinggi, dan pustaka komponen yang mudah dikembangkan.",
      deliverables: ["Design System & Tokens", "Wireframe High-Fidelity", "Prototipe Interaktif", "Spesifikasi Mikro-Interaksi"],
      gradient: "from-rose-500/20 via-neutral-900 to-black"
    }
  ]
};
