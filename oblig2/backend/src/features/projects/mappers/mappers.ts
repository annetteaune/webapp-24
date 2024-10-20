import { Entries } from "@/types";
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
    privateBox: project.privateBox,
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
    privateBox: project.privateBox ?? false,
  };
};

export const toDb = (data: Project) => {
  const project = createProject(data);
  const entries = Object.entries(project) as Entries<Project>;
  const dbProject = {} as DbProject;

  for (const entry of entries) {
    if (!entry) continue;
    const [key, value] = entry;
    switch (key) {
      case "id":
        dbProject.id = value;
        break;
      case "title":
        dbProject.title = value;
        break;
      case "description":
        dbProject.description = value;
        break;
      case "imageLink":
        dbProject.imageLink = value;
        break;
      case "liveLink":
        dbProject.liveLink = value;
        break;
      case "codeLink":
        dbProject.codeLink = value;
        break;
      case "publishedAt":
        dbProject.publishedAt = value?.toISOString() ?? null;
        break;
      case "privateBox":
        dbProject.privateBox = value;
        break;
    }
  }
  return dbProject;
};
