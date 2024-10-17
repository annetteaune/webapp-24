import { z } from "zod";
import { validateDate } from "./services/validation";

//Følger her det som er vist i spa-ts-repoet.

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
});

export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;
