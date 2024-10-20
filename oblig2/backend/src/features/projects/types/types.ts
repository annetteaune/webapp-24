import { z } from "zod";
import { validateDate } from "@/config/validation";

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

export type DbProject = {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  liveLink: string;
  codeLink: string;
  publishedAt: string;
  privateBox: boolean;
};

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

export const projectFields: (keyof Project)[] = [
  "id",
  "title",
  "description",
  "imageLink",
  "liveLink",
  "codeLink",
  "privateBox",
  "publishedAt",
];

export type ProjectKeys = keyof Project;
