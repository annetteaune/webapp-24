import { z } from "zod";
import { validateDate } from "./config/validation";

// schema for teknologier
export const TechnologySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Technology = z.infer<typeof TechnologySchema>;

export const TechnologyArraySchema = z.array(TechnologySchema);

// schema for prosjekt
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageLink: z.string(),
  liveLink: z.string(),
  codeLink: z.string(),
  publishedAt: z.date(),
  privateBox: z.boolean(),
  technologies: z.array(TechnologySchema).optional(),
});

export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;

import type { ErrorCode } from "@/lib/error";

export type ID = ReturnType<typeof crypto.randomUUID>;

export type Paginated = {
  offset: number;
  page: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type Data<T> = {
  success: true;
  data: T;
  pagination?: Paginated;
};

type Err = {
  code: ErrorCode;
  message: string;
};

export type Error = {
  success: false;
  error: Err;
};

export type Result<T> = Data<T> | Error;

export type ResultFn = {
  success: <T>(data: T, pagination?: Paginated) => Data<T>;
  failure: (error: unknown, code: ErrorCode) => Error;
};

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
