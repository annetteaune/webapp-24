import { Project } from "@/types";
import type { DbProject, DbTechnologies } from "../types/types";
import { randomUUID } from "crypto";

export const fromDb = (project: DbProject) => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    imageLink: project.imageLink,
    liveLink: project.liveLink,
    codeLink: project.codeLink,
    publishedAt: new Date(project.publishedAt).toISOString(),
    privateBox: project.privateBox,
    technologies: project.technologies.split(","),
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    id: project.id ?? randomUUID(),
    title: project.title ?? "",
    description: project.description ?? "",
    imageLink: project.imageLink ?? "#",
    liveLink: project.liveLink ?? "#",
    codeLink: project.codeLink ?? "#",
    publishedAt:
      typeof project.publishedAt === "string"
        ? project.publishedAt
        : (project.publishedAt ?? new Date()).toISOString(),
    privateBox: project.privateBox ?? false,
    technologies: project.technologies ?? [],
  };
};
export const toDb = (data: Partial<Project>): DbProject => {
  const project = createProject(data);

  const dbProject: DbProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    imageLink: project.imageLink,
    liveLink: project.liveLink,
    codeLink: project.codeLink,
    publishedAt: project.publishedAt,
    privateBox: project.privateBox,
    technologies: project.technologies.join(","),
  };

  return dbProject;
};
