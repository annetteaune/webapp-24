import { createId } from "@/lib/id";
import { DbTechnologies, Technology } from "../types/types";
import { Entries } from "@/types";

export const fromDb = (technologies: DbTechnologies) => {
  return {
    id: technologies.id,
    name: technologies.name,
  };
};

export const createTech = (
  technologies: Partial<Technology>,
  projectID: string
): Technology => {
  return {
    id: technologies.id ?? createId(),
    name: technologies.name ?? "",
  };
};

export const toDb = (data: Partial<Technology>, projectID: string) => {
  const technologies = createTech(data, projectID);
  const entries = Object.entries(technologies) as Entries<Technology>;

  const dbTech = {} as DbTechnologies;

  for (const entry of entries) {
    if (!entry) continue;
    const [key, value] = entry;
    switch (key) {
      case "id":
        dbTech.id = value;
        break;
      case "name":
        dbTech.name = value;
    }
  }

  return dbTech;
};
