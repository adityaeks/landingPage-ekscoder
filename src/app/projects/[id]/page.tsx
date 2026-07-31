import { fetchProjectsFromBackend } from "@/services/projectService";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { projectsData } from "@/data/projects";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: slug } = await params;
  const projects = await fetchProjectsFromBackend();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found — EKSCODER",
    };
  }

  return {
    title: `${project.title} — EKSCODER`,
    description: project.description,
    openGraph: {
      title: `${project.title} — EKSCODER`,
      description: project.description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id: slug } = await params;
  const projects = await fetchProjectsFromBackend();
  const project = projects.find((p) => p.slug === slug) ?? null;

  return <ProjectDetailClient project={project} allProjects={projects} />;
}
