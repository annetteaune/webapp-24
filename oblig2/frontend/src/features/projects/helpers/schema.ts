import { z } from "zod";
import { techSchema } from "../../technologies/helpers/schema";

export { projectSchema, projectsSchema };

const projectSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    imageLink: z.string(),
    liveLink: z.string(),
    codeLink: z.string(),
    privateBox: z.boolean(),
  })
  .extend({ tech: z.array(techSchema).optional() });

const projectsSchema = z.array(projectSchema);

export function validateProjects(data: unknown) {
  return projectsSchema.safeParse(data);
}
