import type { DbProject, Project } from "../types/types";
import { createId } from "@/lib/id";

export const fromDb = (project: DbProject) => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    imageLink: project.imageLink,
    liveLink: project.liveLink,
    codeLink: project.codeLink,
    publishedAt: new Date(project.publishedAt),
    privateBox: Boolean(project.privateBox),
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    id: project.id ?? createId(),
    title: project.title ?? "",
    description: project.description ?? "",
    imageLink: project.imageLink ?? "#",
    liveLink: project.liveLink ?? "#",
    codeLink: project.codeLink ?? "#",
    publishedAt: project.publishedAt ?? new Date(),
    privateBox: Boolean(project.privateBox ?? false),
  };
};

export const toDb = (data: Project): DbProject => {
  const project = createProject(data);
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    imageLink: project.imageLink,
    liveLink: project.liveLink,
    codeLink: project.codeLink,
    publishedAt: project.publishedAt.toISOString(),
    privateBox: project.privateBox ? 1 : 0, // konverterer  boolean til number under skriving til db
  };
};
