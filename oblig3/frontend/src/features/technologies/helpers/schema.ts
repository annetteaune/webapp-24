import { z } from "zod";

export { techSchema, technologySchema };

const techSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const technologySchema = z.array(techSchema);

export function validateTech(data: unknown) {
  return techSchema.safeParse(data);
}

export type Technology = z.infer<typeof techSchema>;

export const TechnologyArraySchema = z.array(techSchema);
