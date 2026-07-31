import { Project, projectsData } from "@/data/projects";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// Debug: log the baked-in API URL (visible in browser console)
console.log("[ProjectService] API_BASE_URL =", API_BASE_URL);

/**
 * Laravel API response item shape (as returned by ekscoder-backend)
 */
interface LaravelProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string | number;
  description: string;
  technologies: string[] | string;
  image_bg?: string;
  imageBg?: string;
  accent_color?: string;
  accentColor?: string;
  link?: string | null;
  url?: string | null;
  featured: boolean | number;
  is_active?: boolean | number;
  order?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Map a single Laravel API response item to the frontend Project model.
 */
function mapToProject(item: LaravelProjectItem, index: number): Project {
  return {
    id: item.id?.toString() || `project-${index + 1}`,
    number: item.number || String(index + 1).padStart(2, "0"),
    title: item.title || "UNTITLED PROJECT",
    category: item.category || "Development",
    year: item.year?.toString() || new Date().getFullYear().toString(),
    description: item.description || "",
    technologies: Array.isArray(item.technologies)
      ? item.technologies
      : typeof item.technologies === "string"
      ? item.technologies.split(",").map((t: string) => t.trim())
      : [],
    imageBg: item.image_bg || item.imageBg || "from-emerald-900/40 via-neutral-900 to-black",
    accentColor: item.accent_color || item.accentColor || "#B8FF00",
    link: item.link || item.url || undefined,
    featured: Boolean(item.featured),
  };
}

/**
 * Fetch projects from Laravel REST API backend.
 * - Endpoint: GET /api/projects
 * - Supports direct array response or Laravel paginated ({ data: [...] }) response.
 * - Automatically falls back to local static `projectsData` if backend is unreachable.
 */
export async function fetchProjectsFromBackend(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      console.warn(
        `[ProjectService] Laravel API returned ${response.status} ${response.statusText}. Serving fallback data.`
      );
      return projectsData;
    }

    const data = await response.json();

    // Support: direct array | Laravel paginated { data: [...] } | { projects: [...] }
    const projectsArray: LaravelProjectItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.projects)
      ? data.projects
      : null;

    if (!projectsArray || projectsArray.length === 0) {
      console.warn("[ProjectService] Empty or invalid projects from API. Serving fallback data.");
      return projectsData;
    }

    // Filter only active projects (is_active field from Laravel)
    const activeProjects = projectsArray.filter((item) => item.is_active !== false && item.is_active !== 0);

    return activeProjects.map(mapToProject);
  } catch (error) {
    console.warn("[ProjectService] Could not reach Laravel backend. Serving fallback projects.", error);
    return projectsData;
  }
}
