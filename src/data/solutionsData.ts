import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Workflow,
  BarChart3,
  Lock,
  RefreshCw,
  Sliders,
  Building2
} from "lucide-react";

export interface BusinessSolution {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  businessFocus: string;
  keyBenefit: string;
  accent: string;
}

export interface BusinessCapability {
  name: string;
  category: "PERFORMANCE" | "SECURITY" | "EFFICIENCY" | "SCALABILITY" | "INTELLIGENCE" | "RELIABILITY";
  role: string;
  implementation: string;
  icon: any;
  status: string;
}

export const businessSolutionsData: Record<"EN" | "ID", BusinessSolution[]> = {
  EN: [
    {
      id: "digital-platform",
      badge: "BRAND & REVENUE GROWTH",
      title: "High-Converting Digital Platform",
      subtitle: "Speed, SEO Dominance & Premium Brand Positioning",
      description: "Engineered specifically to maximize sales conversion rates, elevate brand authority, and deliver lightning-fast user experiences without compromise.",
      highlights: [
        "High-Converting Landing Pages",
        "Top SEO & Organic Visibility",
        "Instant Page Loads & Motion",
        "Interactive Brand Engagement"
      ],
      businessFocus: "User Experience & Conversion Rate Optimization (CRO)",
      keyBenefit: "Up to 3x Increase in Conversion Rate & Revenue",
      accent: "#B8FF00"
    },
    {
      id: "enterprise-system",
      badge: "OPERATIONAL EFFICIENCY",
      title: "Scalable Enterprise Business System",
      subtitle: "Automation, System Integration & Data Accuracy",
      description: "Integrated software solutions built to automate complex business processes, eliminate operational bottlenecks, and accelerate decision-making efficiency.",
      highlights: [
        "Workflow Automation & ERP Systems",
        "Real-Time Business Dashboards",
        "Multi-Branch & Role Management",
        "API Integration & Zero Manual Data Entry"
      ],
      businessFocus: "Business Logic Automation & Operational Efficiency",
      keyBenefit: "Operational Cost Savings & Instant Real-Time Data Processing",
      accent: "#06B6D4"
    },
    {
      id: "high-reliability-infra",
      badge: "SECURITY & CONTINUITY",
      title: "High-Reliability Business Infrastructure",
      subtitle: "99.99% Uptime, Data Protection & Scalability",
      description: "Secure, always-on server infrastructure ensuring your 24/7 business operations run flawlessly without downtime or data loss risk.",
      highlights: [
        "24/7 Zero-Downtime System Availability",
        "Enterprise Data Security & Encryption",
        "Automated Backup & Disaster Recovery",
        "Auto-Scaling Under Peak Load"
      ],
      businessFocus: "Service Reliability, Security & Digital Asset Protection",
      keyBenefit: "Guaranteed 99.99% Uptime & Enterprise Data Protection",
      accent: "#A855F7"
    }
  ],
  ID: [
    {
      id: "digital-platform",
      badge: "BRAND & REVENUE GROWTH",
      title: "High-Converting Digital Platform",
      subtitle: "Speed, SEO Dominance & Premium Brand Positioning",
      description: "Dirancang khusus untuk meningkatkan angka konversi penjualan, memperkuat reputasi brand, dan menghadirkan pengalaman pengguna yang cepat tanpa kompromi.",
      highlights: [
        "High Conversion Landing Pages",
        "Top SEO & Organic Visibility",
        "Instant Page Load & Smooth Motion",
        "Interactive Brand Engagement"
      ],
      businessFocus: "Pengalaman Pengguna & Optimasi Tingkat Konversi (CRO)",
      keyBenefit: "Peningkatan Revenue & Conversion Rate Hingga 3x Lipat",
      accent: "#B8FF00"
    },
    {
      id: "enterprise-system",
      badge: "OPERATIONAL EFFICIENCY",
      title: "Scalable Enterprise Business System",
      subtitle: "Automation, System Integration & Data Accuracy",
      description: "Solusi perangkat lunak terintegrasi untuk mengotomatisasi proses bisnis yang kompleks, menghilangkan bottleneck operasional, dan mempercepat efisiensi pengambilan keputusan.",
      highlights: [
        "Otomatisasi Alur Kerja & Sistem ERP",
        "Dashboard Bisnis & Pelaporan Real-time",
        "Manajemen Multi-Cabang & Multi-Role",
        "Integrasi API & Eliminasi Input Manual"
      ],
      businessFocus: "Otomatisasi Logika Bisnis & Efisiensi Operasional",
      keyBenefit: "Penghematan Biaya Operasional & Pemrosesan Data Instan",
      accent: "#06B6D4"
    },
    {
      id: "high-reliability-infra",
      badge: "SECURITY & CONTINUITY",
      title: "High-Reliability Business Infrastructure",
      subtitle: "99.99% Uptime, Data Protection & Scalability",
      description: "Infrastruktur sistem yang aman dan selalu aktif untuk memastikan operasional bisnis Anda berjalan 24/7 tanpa downtime atau risiko kehilangan data.",
      highlights: [
        "Ketersediaan Sistem 24/7 Tanpa Downtime",
        "Keamanan Data & Enkripsi Tingkat Tinggi",
        "Automated Backup & Disaster Recovery",
        "Skalabilitas Otomatis Saat Trafik Tinggi"
      ],
      businessFocus: "Keandalan Layanan, Keamanan & Proteksi Aset Digital",
      keyBenefit: "Garansi Uptime 99.99% & Proteksi Data Bisnis Terjamin",
      accent: "#A855F7"
    }
  ]
};

export const businessCapabilitiesData: Record<"EN" | "ID", BusinessCapability[]> = {
  EN: [
    {
      name: "Market-Leading Speed",
      category: "PERFORMANCE",
      role: "Access Speed & Optimal Performance",
      implementation: "Ultra-fast application response times boost customer satisfaction and retention rates.",
      icon: Zap,
      status: "GUARANTEED"
    },
    {
      name: "Enterprise Data Security",
      category: "SECURITY",
      role: "Security & Digital Asset Protection",
      implementation: "End-to-end encryption and hardened architecture protecting sensitive business and client transaction data.",
      icon: ShieldCheck,
      status: "ENTERPRISE GRADE"
    },
    {
      name: "Process Automation",
      category: "EFFICIENCY",
      role: "Business Workflow Automation",
      implementation: "Reduces routine manual tasks, minimizes human error, and saves valuable team hours.",
      icon: Workflow,
      status: "PROVEN IMPACT"
    },
    {
      name: "Scalable Growth Architecture",
      category: "SCALABILITY",
      role: "Unconstrained Scaling Capacity",
      implementation: "Flexible architecture ready to scale seamlessly as user traffic and transaction volume grow.",
      icon: TrendingUp,
      status: "FUTURE PROOF"
    },
    {
      name: "Real-Time Business Intelligence",
      category: "INTELLIGENCE",
      role: "Data-Driven Visibility & Decision Making",
      implementation: "Interactive analytics dashboards to monitor business KPIs and performance metrics in real time.",
      icon: BarChart3,
      status: "REAL TIME"
    },
    {
      name: "High Availability 99.99%",
      category: "RELIABILITY",
      role: "24/7 Continuous Service Reliability",
      implementation: "Guarantees system accessibility at all times for clients and internal operations.",
      icon: Lock,
      status: "GUARANTEED"
    },
    {
      name: "Tailored Business Logic",
      category: "EFFICIENCY",
      role: "Customized to Specific Business Needs",
      implementation: "Custom-built software adhering to your organization's exact workflows and business rules.",
      icon: Sliders,
      status: "TAILORED"
    },
    {
      name: "Seamless Ecosystem Integration",
      category: "INTELLIGENCE",
      role: "Digital Ecosystem Interoperability",
      implementation: "Connects seamlessly with Payment Gateways, WA APIs, CRM, ERP, and third-party tools.",
      icon: RefreshCw,
      status: "SEAMLESS"
    },
    {
      name: "Active Support & Continuity",
      category: "RELIABILITY",
      role: "Ongoing Dedicated Maintenance & Support",
      implementation: "Professional engineering team ready to monitor, maintain, and ensure smooth long-term system health.",
      icon: Building2,
      status: "ACTIVE SUPPORT"
    }
  ],
  ID: [
    {
      name: "Market-Leading Speed",
      category: "PERFORMANCE",
      role: "Kecepatan Akses & Performa Optimal",
      implementation: "Respon aplikasi yang sangat cepat meningkatkan kepuasan pengguna dan angka retensi pelanggan.",
      icon: Zap,
      status: "GUARANTEED"
    },
    {
      name: "Enterprise Data Security",
      category: "SECURITY",
      role: "Keamanan & Perlindungan Data Aset",
      implementation: "Enkripsi end-to-end dan arsitektur aman untuk melindungi data sensitif bisnis dan transaksi pelanggan.",
      icon: ShieldCheck,
      status: "ENTERPRISE GRADE"
    },
    {
      name: "Process Automation",
      category: "EFFICIENCY",
      role: "Otomatisasi Alur Kerja Bisnis",
      implementation: "Mengurangi tugas manual rutin, meminimalisir human error, dan menghemat waktu kerja tim Anda.",
      icon: Workflow,
      status: "PROVEN IMPACT"
    },
    {
      name: "Scalable Growth Architecture",
      category: "SCALABILITY",
      role: "Kapasitas Pertumbuhan Tanpa Batas",
      implementation: "Arsitektur fleksibel yang siap berkembang seiring bertambahnya trafik pengguna dan volume transaksi.",
      icon: TrendingUp,
      status: "FUTURE PROOF"
    },
    {
      name: "Real-Time Business Intelligence",
      category: "INTELLIGENCE",
      role: "Visibilitas & Keputusan Berbasis Data",
      implementation: "Dashboard analitik interaktif untuk memantau KPI bisnis dan metriks kinerja secara real-time.",
      icon: BarChart3,
      status: "REAL TIME"
    },
    {
      name: "High Availability 99.99%",
      category: "RELIABILITY",
      role: "Keandalan Layanan 24/7",
      implementation: "Menjamin sistem selalu dapat diakses kapan saja oleh pelanggan dan tim internal Anda.",
      icon: Lock,
      status: "GUARANTEED"
    },
    {
      name: "Tailored Business Logic",
      category: "EFFICIENCY",
      role: "Fleksibilitas Sesuai Kebutuhan Bisnis",
      implementation: "Sistem dibangun khusus menyesuaikan alur kerja dan aturan bisnis spesifik perusahaan Anda.",
      icon: Sliders,
      status: "TAILORED"
    },
    {
      name: "Seamless Ecosystem Integration",
      category: "INTELLIGENCE",
      role: "Integrasi Ekosistem Digital",
      implementation: "Terhubung lancar dengan Payment Gateway, WA API, CRM, ERP, dan sistem pihak ketiga.",
      icon: RefreshCw,
      status: "SEAMLESS"
    },
    {
      name: "Active Support & Continuity",
      category: "RELIABILITY",
      role: "Dukungan & Pemeliharaan Berkelanjutan",
      implementation: "Tim profesional siap mendampingi, memantau, dan memastikan kelancaran sistem bisnis secara berkala.",
      icon: Building2,
      status: "ACTIVE SUPPORT"
    }
  ]
};
