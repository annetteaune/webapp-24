import { z } from "zod";
import { Result } from "@/types";

export const technologySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Technology = z.infer<typeof technologySchema>;
export type DbTechnologies = {
  id: string;
  name: string;
};

export type TechService = {
  listByProject: (id: string) => Promise<Result<Technology[]>>;
  addTechToProject: (id: string, name: string) => Promise<Result<string>>;
  linkTechToProject: (
    projectId: string,
    techId: string
  ) => Promise<Result<void>>;
};

export type TechRepository = {
  listByProject: (id: string) => Promise<Result<Technology[]>>;
  addTechToProject: (id: string, name: string) => Promise<Result<string>>;
  linkTechToProject: (
    projectId: string,
    techId: string
  ) => Promise<Result<void>>;
};
