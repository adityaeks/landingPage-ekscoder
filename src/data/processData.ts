import { Search, Compass, Code2, Rocket, RefreshCw } from "lucide-react";

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
}

export const processStepsData: Record<"EN" | "ID", ProcessStep[]> = {
  EN: [
    {
      number: "01",
      title: "DISCOVER",
      subtitle: "Strategy & Architectural Blueprint",
      description: "Deep dive into product requirements, business goals, technology selection, and system topology planning to ensure a rock-solid engineering foundation.",
      icon: Search,
    },
    {
      number: "02",
      title: "DESIGN",
      subtitle: "UI/UX & Visual Direction",
      description: "Crafting minimalist, dark-themed UI components, design tokens, interactive prototypes, and motion animation keyframes.",
      icon: Compass,
    },
    {
      number: "03",
      title: "DEVELOP",
      subtitle: "Clean Code & Motion Choreography",
      description: "Building reactive frontend components, GSAP scroll triggers, scalable backend APIs, and database models adhering to strict standards.",
      icon: Code2,
    },
    {
      number: "04",
      title: "DEPLOY",
      subtitle: "DevOps & Cloud Infrastructure",
      description: "Automated CI/CD deployment to production servers, SSL encryption, Docker containerization, Nginx proxy, and performance tuning.",
      icon: Rocket,
    },
    {
      number: "05",
      title: "EVOLVE",
      subtitle: "Continuous Monitoring & Optimization",
      description: "Monitoring real-world system performance, conducting speed & security audits, refining UX interactions, and delivering iterative updates.",
      icon: RefreshCw,
    },
  ],
  ID: [
    {
      number: "01",
      title: "ANALISIS & STRATEGI",
      subtitle: "Strategi & Cetak Biru Arsitektur",
      description: "Mendalami kebutuhan produk, tujuan bisnis, pemilihan arsitektur sistem, dan perencanaan peta jalan teknologi untuk memastikan fondasi yang kokoh.",
      icon: Search,
    },
    {
      number: "02",
      title: "DESAIN INTERAKSI",
      subtitle: "Antarmuka UI/UX & Arah Visual",
      description: "Merancang komponen UI modern bertema gelap, sistem desain, prototipe interaktif, dan animasi motion yang memukau.",
      icon: Compass,
    },
    {
      number: "03",
      title: "PENGEMBANGAN",
      subtitle: "Rekayasa Kode Bersih & Motion",
      description: "Membangun komponen frontend reaktif, animasi scroll GSAP, API backend yang scalable, dan struktur database teroptimasi.",
      icon: Code2,
    },
    {
      number: "04",
      title: "PELUNCURAN",
      subtitle: "DevOps & Infrastruktur Cloud",
      description: "Deployment otomatis CI/CD ke server produksi, konfigurasi SSL, kontainerisasi Docker, proxy Nginx, dan optimasi kecepatan.",
      icon: Rocket,
    },
    {
      number: "05",
      title: "EVALUASI & EVOLUSI",
      subtitle: "Pemantauan & Optimasi Berkelanjutan",
      description: "Memantau kinerja sistem real-time, audit performa & keamanan, penyempurnaan animasi, serta rilis pembaruan perangkat lunak secara berkala.",
      icon: RefreshCw,
    },
  ]
};
