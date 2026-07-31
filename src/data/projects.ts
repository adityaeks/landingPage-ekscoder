export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  imageBg: string;
  accentColor: string;
  link?: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "erp-system",
    slug: "erp-system",
    number: "01",
    title: "ERP SYSTEM",
    category: "Enterprise Software",
    year: "2026",
    description: "High-performance enterprise resource planning platform featuring real-time analytics, automated inventory tracking, and seamless financial workflow automation.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    imageBg: "from-emerald-900/40 via-neutral-900 to-black",
    accentColor: "#10B981",
    featured: true
  },
  {
    id: "greenoryyinn",
    slug: "greenoryyinn",
    number: "02",
    title: "GREENORYYINN",
    category: "Hospitality Platform",
    year: "2025",
    description: "Boutique eco-resort booking experience with ultra-smooth motion transitions, interactive 3D room preview, and integrated booking engine.",
    technologies: ["Next.js", "Tailwind CSS", "GSAP", "Stripe API"],
    imageBg: "from-lime-900/40 via-neutral-900 to-black",
    accentColor: "#B8FF00",
    featured: true
  },
  {
    id: "vps-control",
    slug: "vps-control",
    number: "03",
    title: "VPS CONTROL",
    category: "Infrastructure Management",
    year: "2026",
    description: "Cloud infrastructure dashboard providing server metrics monitoring, automated deployments, firewall rule management, and terminal session streaming.",
    technologies: ["React", "Go", "Docker", "Nginx", "WebSockets"],
    imageBg: "from-cyan-900/40 via-neutral-900 to-black",
    accentColor: "#06B6D4",
    featured: true
  },
  {
    id: "hyperflow",
    slug: "hyperflow",
    number: "04",
    title: "HYPERFLOW",
    category: "SaaS & Workflow Engine",
    year: "2025",
    description: "Visual node-based automation platform built for digital agencies to orchestrate APIs, webhooks, and AI pipelines seamlessly.",
    technologies: ["TypeScript", "Next.js", "Redis", "Tailwind CSS"],
    imageBg: "from-purple-900/40 via-neutral-900 to-black",
    accentColor: "#A855F7",
    featured: false
  },
  {
    id: "nova-creative",
    slug: "nova-creative",
    number: "05",
    title: "NOVA CREATIVE",
    category: "Interactive Agency Web",
    year: "2025",
    description: "Award-winning immersive web showcase with WebGL particle shaders, smooth scroll progress, and custom cursor interaction design.",
    technologies: ["Three.js", "GSAP", "ScrollTrigger", "WebGL"],
    imageBg: "from-rose-900/40 via-neutral-900 to-black",
    accentColor: "#F43F5E",
    featured: false
  },
  {
    id: "cybernexus",
    slug: "cybernexus",
    number: "06",
    title: "CYBERNEXUS",
    category: "AI Cloud Monitoring",
    year: "2026",
    description: "Intelligent telemetry aggregator using machine learning models to detect cloud infrastructure anomalies and predict resource demand.",
    technologies: ["Next.js", "Python", "GraphQL", "Tailwind CSS"],
    imageBg: "from-amber-900/40 via-neutral-900 to-black",
    accentColor: "#F59E0B",
    featured: false
  }
];
