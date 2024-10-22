import { z } from "zod";
import { techSchema } from "../../technologies/helpers/schema";

export { projectSchema, projectsSchema };

const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  imageLink: z.string(),
  liveLink: z.string(),
  codeLink: z.string(),
  privateBox: z.boolean(),
  publishedAt: z.coerce.date(),
  technologies: z.array(techSchema).optional(),
});
export type Project = z.infer<typeof projectSchema>;
const projectsSchema = z.array(projectSchema);

export function validateProject(data: unknown) {
  const result = projectSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
  }

  return result;
}

export function validateProjects(data: unknown) {
  const result = projectsSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
  }

  return result;
}
