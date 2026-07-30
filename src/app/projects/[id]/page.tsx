import { fetchProjectsFromBackend } from "@/services/projectService";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { projectsData } from "@/data/projects";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const projects = await fetchProjectsFromBackend();
  const project = projects.find((p) => p.id === id);

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
  return projectsData.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const projects = await fetchProjectsFromBackend();
  const project = projects.find((p) => p.id === id) ?? null;

  return <ProjectDetailClient project={project} allProjects={projects} />;
}
