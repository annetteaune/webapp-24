import { createId } from "@/lib/id";
import { DbTechnologies, Technology } from "../types/types";
import { Entries } from "@/types";

export const fromDb = (tech: DbTechnologies) => {
  return {
    id: tech.id,
    name: tech.name,
  };
};

export const createTech = (
  tech: Partial<Technology>,
  projectID: string
): Technology => {
  return {
    id: tech.id ?? createId(),
    name: tech.name ?? "",
  };
};

export const toDb = (data: Partial<Technology>, projectID: string) => {
  const tech = createTech(data, projectID);
  const entries = Object.entries(tech) as Entries<Technology>;

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
