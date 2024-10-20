import { Result } from "@/types";

export type Technology = {
  id: string;
  name: string;
};

export type DbTechnologies = {
  id: string;
  name: string;
};

export type TechService = {
  listByProject: (id: string) => Promise<Result<Technology[]>>;
  addTechToProject: (id: string, name: string) => Promise<Result<string>>;
};

export type TechRepository = {
  listByProject: (id: string) => Promise<Result<Technology[]>>;
  addTechToProject: (id: string, name: string) => Promise<Result<string>>;
};

export type CreateTechDto = Pick<Technology, "id" | "name">;

export type UpdateTechDto = Partial<Pick<Technology, "name">>;

export const TechFields: (keyof Technology)[] = ["id", "name"];

export type TechKeys = keyof Technology;

export type TechMap = Map<string, Technology>;
