import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Workflow,
  BarChart3,
  Lock,
  RefreshCw,
  Sliders,
  Building2,
  Globe,
  Layout,
  Server
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
  ID: [
    {
      id: "digital-platform",
      badge: "WEBSITE & BRANDING",
      title: "Website & Landing Page Penjualan",
      subtitle: "Desain Modern, Cepat Dibuka & Mudah Ditemukan di Google",
      description: "Kami bangunkan website profesional dan landing page yang menarik untuk meyakinkan calon pelanggan, meningkatkan penjualan, dan membuat bisnis Anda terlihat kredibel di internet.",
      highlights: [
        "Desain Keren & Ramah Tampilan HP",
        "Mudah Ditemukan di Google (SEO Optimal)",
        "Loading Super Cepat Tanpa Lemot",
        "Tombol WhatsApp & Form Order Siap Pakai"
      ],
      businessFocus: "Tampilan Profesional & Peningkatan Penjualan",
      keyBenefit: "Bisnis Lebih Dipercaya & Pelanggan Lebih Cepat Beli",
      accent: "#B8FF00"
    },
    {
      id: "enterprise-system",
      badge: "SISTEM OPERASIONAL",
      title: "Aplikasi & Sistem Bisnis Custom",
      subtitle: "Otomatisasi Pembukuan, Stok, Kasir & Dashboard Operasional",
      description: "Tinggalkan cara manual yang lambat dan rawan salah. Kami buatkan sistem aplikasi web khusus untuk kelola stok, pesanan pelanggan, laporan keuangan, dan operasional tim Anda secara otomatis.",
      highlights: [
        "Kelola Stok, Kasir & Penjualan Otomatis",
        "Laporan Bisnis & Keuangan Real-Time",
        "Akses Multi-Cabang & Hak Akses Karyawan",
        "Konek Otomatis ke WhatsApp & Payment Gateway"
      ],
      businessFocus: "Hemat Waktu, Kurangi Kesalahan & Efisiensi Kerja",
      keyBenefit: "Operasional Rapi, Data Akurat & Waktu Kerja Lebih Hemat",
      accent: "#06B6D4"
    },
    {
      id: "bot-ai",
      badge: "BOT OTOMATIS & AI",
      title: "Automated Bot & Integrasi AI",
      subtitle: "Layanan CS 24 Jam & Otomatisasi dengan AI",
      description: "Bangun bot cerdas untuk WhatsApp, Telegram, atau website yang siap balas chat pelanggan 24/7, kirim notifikasi pesanan, dan integrasi kecerdasan buatan (AI) ke sistem bisnis Anda.",
      highlights: [
        "Bot WhatsApp & Telegram Balas Chat 24/7",
        "Integrasi AI untuk Customer Service",
        "Otomatisasi Broadcast & Notifikasi Order",
        "Hemat Biaya CS & Respon Pelanggan Cepat"
      ],
      businessFocus: "Otomatisasi Respon Pelanggan & Layanan 24/7",
      keyBenefit: "Chat Pelanggan Terbalas Instan Tanpa Perlu Standby 24 Jam",
      accent: "#A855F7"
    }
  ],
  EN: [
    {
      id: "digital-platform",
      badge: "WEBSITE & BRANDING",
      title: "High-Converting Websites & Landing Pages",
      subtitle: "Modern Design, Ultra-Fast Speed & Top Google Ranking",
      description: "We build modern, high-impact websites and landing pages designed to build customer trust, showcase your brand, and turn casual visitors into paying clients.",
      highlights: [
        "Modern & Mobile-First Responsive Design",
        "Rank Higher on Google (Built-in SEO)",
        "Instant Page Load Speed Without Lag",
        "WhatsApp Click-to-Chat & Ready-to-Use Forms"
      ],
      businessFocus: "Brand Credibility & Lead Generation",
      keyBenefit: "Build Instant Trust & Turn Visitors Into Paying Clients",
      accent: "#B8FF00"
    },
    {
      id: "enterprise-system",
      badge: "BUSINESS SYSTEMS",
      title: "Custom Business & Management Software",
      subtitle: "Automate Inventory, Orders, Finance & Daily Operations",
      description: "Replace slow manual spreadsheets. We build tailored web applications and management dashboards to track inventory, process transactions, and automate team workflows.",
      highlights: [
        "Automated Inventory, POS & Order Management",
        "Real-Time Business & Financial Reports",
        "Multi-Branch Access & Employee Role Permissions",
        "Seamless Integration with WhatsApp & Payment Gateways"
      ],
      businessFocus: "Operational Automation & Eliminating Manual Work",
      keyBenefit: "Accurate Data, Zero Manual Errors & Massive Time Savings",
      accent: "#06B6D4"
    },
    {
      id: "bot-ai",
      badge: "AUTOMATED BOTS & AI",
      title: "Automated Bots & AI Integration",
      subtitle: "24/7 Smart CS & Workflow Automation",
      description: "Build intelligent bots for WhatsApp, Telegram, or websites to handle customer inquiries 24/7, process incoming orders, and integrate custom AI into your workflow.",
      highlights: [
        "24/7 WhatsApp & Telegram Auto-Reply Bots",
        "AI Integration for Customer Support",
        "Automated Order Notifications & Broadcasts",
        "Reduce Support Costs & Instant Response Times"
      ],
      businessFocus: "24/7 Automated Support & AI-Powered Workflows",
      keyBenefit: "Instant Customer Responses Without 24/7 Manual Staffing",
      accent: "#A855F7"
    }
  ]
};

export const businessCapabilitiesData: Record<"EN" | "ID", BusinessCapability[]> = {
  ID: [
    {
      name: "Website Cepat & Ringan",
      category: "PERFORMANCE",
      role: "Kecepatan Akses & Performa",
      implementation: "Loading instan dalam hitungan detik agar pengunjung tidak kabur dan langsung nyaman membaca penawaran Anda.",
      icon: Zap,
      status: "TERJAMIN"
    },
    {
      name: "Keamanan Data Bisnis",
      category: "SECURITY",
      role: "Perlindungan Data & Transaksi",
      implementation: "Sistem enkripsi dan perlindungan ketat untuk menjaga kerahasiaan data pelanggan dan informasi penting perusahaan.",
      icon: ShieldCheck,
      status: "AMAN"
    },
    {
      name: "Otomatisasi Kerja Harian",
      category: "EFFICIENCY",
      role: "Hemat Waktu & Kurangi Manual",
      implementation: "Mengotomatiskan tugas rutin yang memakan waktu, sehingga tim Anda bisa fokus pada pengembangan omset.",
      icon: Workflow,
      status: "EFISIEN"
    },
    {
      name: "Siap Berkembang Kapan Saja",
      category: "SCALABILITY",
      role: "Fleksibel untuk Skala Besar",
      implementation: "Sistem dirancang modular sehingga mudah ditambah fitur baru kapan saja saat bisnis Anda semakin bertumbuh.",
      icon: TrendingUp,
      status: "FLEKSIBEL"
    },
    {
      name: "Laporan Bisnis Real-Time",
      category: "INTELLIGENCE",
      role: "Dashboard Angka & Statistik",
      implementation: "Lihat ringkasan omset harian, jumlah transaksi, dan performa bisnis secara langsung di layar HP atau laptop.",
      icon: BarChart3,
      status: "REAL-TIME"
    },
    {
      name: "Online 24 Jam Non-Stop",
      category: "RELIABILITY",
      role: "Sistem Selalu Siap Diakses",
      implementation: "Bisnis Anda tetap melayani pesanan dan pertanyaan pelanggan kapan saja, bahkan saat Anda sedang istirahat.",
      icon: Lock,
      status: "24/7 AKTIF"
    },
    {
      name: "Dibuat Sesuai Kebutuhan",
      category: "EFFICIENCY",
      role: "Solusi Spesifik Bisnis Anda",
      implementation: "Tidak perlu mengubah alur kerja Anda; sistem kami buatkan mengikuti kebiasaan dan SOP unik perusahaan Anda.",
      icon: Sliders,
      status: "KUSTOM"
    },
    {
      name: "Konek WhatsApp & Pembayaran",
      category: "INTELLIGENCE",
      role: "Integrasi Mudah",
      implementation: "Bisa langsung terhubung ke WhatsApp notifikasi, QRIS, Transfer Bank, hingga jasa kurir pengiriman.",
      icon: RefreshCw,
      status: "TERKONEKSI"
    },
    {
      name: "Pendampingan & Bantuan Teknis",
      category: "RELIABILITY",
      role: "Support Berkelanjutan",
      implementation: "Tim engineer kami siap membantu jika ada kendala, update sistem, maupun konsultasi pengembangan selanjutnya.",
      icon: Building2,
      status: "SUPPORT AKTIF"
    }
  ],
  EN: [
    {
      name: "Ultra-Fast Load Speed",
      category: "PERFORMANCE",
      role: "Speed & Smooth Performance",
      implementation: "Instant page load times that keep visitors engaged and reduce bounce rates effectively.",
      icon: Zap,
      status: "GUARANTEED"
    },
    {
      name: "Business Data Security",
      category: "SECURITY",
      role: "Data & Asset Protection",
      implementation: "Strong encryption and security measures that keep customer data and transactions strictly confidential.",
      icon: ShieldCheck,
      status: "SECURE"
    },
    {
      name: "Daily Task Automation",
      category: "EFFICIENCY",
      role: "Save Time & Eliminate Manual Steps",
      implementation: "Automate repetitive daily tasks so your team can focus on sales and business growth.",
      icon: Workflow,
      status: "EFFICIENT"
    },
    {
      name: "Ready to Scale Anytime",
      category: "SCALABILITY",
      role: "Flexible for Future Growth",
      implementation: "Modular architecture allowing you to easily add new features as your company expands.",
      icon: TrendingUp,
      status: "SCALABLE"
    },
    {
      name: "Real-Time Reports & Dashboard",
      category: "INTELLIGENCE",
      role: "Live Business Metrics",
      implementation: "Track sales numbers, orders, and key business metrics clearly from your phone or laptop.",
      icon: BarChart3,
      status: "REAL-TIME"
    },
    {
      name: "24/7 Continuous Availability",
      category: "RELIABILITY",
      role: "Always Online & Accessible",
      implementation: "Your business stays open to collect leads and serve customers 24/7 without interruption.",
      icon: Lock,
      status: "24/7 ACTIVE"
    },
    {
      name: "Tailored to Your Workflow",
      category: "EFFICIENCY",
      role: "Built for Your Exact Needs",
      implementation: "We customize the software to match your exact company SOPs, not the other way around.",
      icon: Sliders,
      status: "CUSTOM"
    },
    {
      name: "WhatsApp & Payment Integration",
      category: "INTELLIGENCE",
      role: "Easy Third-Party Connectivity",
      implementation: "Direct connectivity to WhatsApp notifications, Payment Gateways (QRIS/Bank), and shipping APIs.",
      icon: RefreshCw,
      status: "CONNECTED"
    },
    {
      name: "Dedicated Ongoing Support",
      category: "RELIABILITY",
      role: "Long-Term Technical Care",
      implementation: "Our dedicated engineering team is always on standby to help with updates, monitoring, and guidance.",
      icon: Building2,
      status: "ACTIVE SUPPORT"
    }
  ]
};
