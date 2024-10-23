import { Entries } from "@/types";
import { createProject } from "../mappers/mappers";
import { Project } from "../types/types";

export const isValidProject = (data: Partial<Project>): boolean => {
  const habit = createProject(data);

  return (Object.entries(habit) as Entries<Partial<Project>>).every((entry) => {
    if (!entry) return false;

    const [key, value] = entry;

    switch (key) {
      case "title":
        return value && value.length > 3;
      case "description":
        return value && value.length > 3;
      default:
        return true;
    }
  });
};
