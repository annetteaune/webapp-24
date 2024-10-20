import { z } from "zod";
import { validateDate } from "./services/validation";

// schema for teknologier
export const TechnologySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Technology = z.infer<typeof TechnologySchema>;

export const TechnologyArraySchema = z.array(TechnologySchema);

// Schema for prosjekt
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
