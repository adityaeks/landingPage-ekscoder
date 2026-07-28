export interface TechItem {
  name: string;
  level: string;
  featured?: boolean;
}

export interface TechCategory {
  category: string;
  description: string;
  items: TechItem[];
}

export const technologyCategories: TechCategory[] = [
  {
    category: "FRONTEND",
    description: "Modern, reactive, and motion-first web technologies",
    items: [
      { name: "Next.js", level: "Expert", featured: true },
      { name: "React", level: "Expert", featured: true },
      { name: "TypeScript", level: "Expert", featured: true },
      { name: "Tailwind CSS", level: "Expert", featured: true },
      { name: "GSAP", level: "Advanced", featured: true },
      { name: "Three.js", level: "Intermediate" },
      { name: "HTML5 / CSS3", level: "Expert" }
    ]
  },
  {
    category: "BACKEND",
    description: "Robust server-side logic & high-concurrency APIs",
    items: [
      { name: "Node.js", level: "Expert", featured: true },
      { name: "Express", level: "Expert" },
      { name: "Laravel", level: "Advanced", featured: true },
      { name: "PHP", level: "Advanced" },
      { name: "REST API", level: "Expert", featured: true },
      { name: "GraphQL", level: "Intermediate" }
    ]
  },
  {
    category: "DATABASE",
    description: "Relational & NoSQL high-speed data stores",
    items: [
      { name: "PostgreSQL", level: "Advanced", featured: true },
      { name: "MySQL", level: "Expert", featured: true },
      { name: "MongoDB", level: "Advanced" },
      { name: "Redis", level: "Advanced", featured: true },
      { name: "Prisma ORM", level: "Expert" }
    ]
  },
  {
    category: "INFRASTRUCTURE",
    description: "Cloud deployment, containerization & CI/CD",
    items: [
      { name: "Docker", level: "Advanced", featured: true },
      { name: "Linux (Ubuntu/Debian)", level: "Advanced", featured: true },
      { name: "Nginx", level: "Advanced", featured: true },
      { name: "Vercel / AWS", level: "Advanced" },
      { name: "CI/CD Pipelines", level: "Advanced" },
      { name: "Git / GitHub", level: "Expert" }
    ]
  }
];
