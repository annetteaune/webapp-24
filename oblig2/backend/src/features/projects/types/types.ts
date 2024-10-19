import { z } from "zod";
import { validateDate } from "@/config/validation";

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
  publishedAt: z.string().refine((date) => validateDate(date), {
    message: "Ugyldig datoformat",
  }),
  privateBox: z.boolean(),
  technologies: z.array(TechnologySchema),
});

export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: string };

export type DbProject = {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  liveLink: string;
  codeLink: string;
  publishedAt: string;
  privateBox: boolean;
  technologies: string;
};

export type DbTechnologies = {
  id: string;
  name: string;
};

export type UpdateProject = Partial<
  Pick<
    Project,
    | "title"
    | "description"
    | "imageLink"
    | "liveLink"
    | "codeLink"
    | "privateBox"
    | "technologies"
  >
>;
