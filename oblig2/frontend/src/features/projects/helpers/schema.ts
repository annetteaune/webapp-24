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
  .extend({ technologies: z.array(techSchema).optional() });

const projectsSchema = z.array(projectSchema);

export function validateProjects(data: unknown) {
  const result = projectsSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
  } else {
    console.log("Validation succeeded:", result.data);
  }

  return result;
}
