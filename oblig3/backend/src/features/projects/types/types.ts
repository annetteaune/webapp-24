import { z } from "zod";

export type Project = {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  liveLink: string;
  codeLink: string;
  publishedAt: Date;
  privateBox: boolean;
};

export const DbProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  imageLink: z.string().url(),
  liveLink: z.string().url(),
  codeLink: z.string().url(),
  publishedAt: z.string().datetime(),
  privateBox: z.number().min(0).max(1),
});

export type DbProject = z.infer<typeof DbProjectSchema>;

export type CreateProjectDto = Pick<
  Project,
  "title" | "description" | "imageLink" | "liveLink" | "codeLink" | "privateBox"
>;

export type UpdateProjectDto = Partial<
  Pick<
    Project,
    | "title"
    | "description"
    | "imageLink"
    | "liveLink"
    | "codeLink"
    | "privateBox"
    | "publishedAt"
  >
>;
