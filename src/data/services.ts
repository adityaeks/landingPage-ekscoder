export interface Service {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  gradient: string;
}

export const servicesData: Service[] = [
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
    title: "Cloud & Infrastructure",
    subtitle: "DevOps, containerization & deployment",
    description: "Managing reliable cloud environments, automated CI/CD deployment pipelines, containerization, and server security.",
    deliverables: ["Docker Containerization", "CI/CD Automation", "VPS & Nginx Tuning", "Server Hardening & Backups"],
    gradient: "from-blue-500/20 via-neutral-900 to-black"
  },
  {
    number: "06",
    title: "UI/UX & Digital Design",
    subtitle: "User-centric design systems",
    description: "Designing dark-themed, futuristic visual systems, high-fidelity prototypes, and component libraries that scale.",
    deliverables: ["Design Systems & Tokens", "High-Fidelity Wireframes", "Interactive Prototypes", "Micro-interaction Specs"],
    gradient: "from-rose-500/20 via-neutral-900 to-black"
  }
];
