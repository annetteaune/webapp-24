import { ResultHandler } from "@/lib/result";
import { Result } from "../types/types";
import { CreateProject, UpdateProject } from "../types/types";

export const validateProjectData = (
  data: CreateProject | UpdateProject
): Result<null> => {
  if (data.title && data.title.trim().length < 3) {
    return ResultHandler.failure(
      "Tittel må ha minst 3 bokstaver",
      "INVALID_TITLE"
    );
  }

  if (data.description && data.description.trim().length < 3) {
    return ResultHandler.failure(
      "Beskrivelse må ha minst 3 bokstaver",
      "INVALID_DESCRIPTION"
    );
  }

  return ResultHandler.success(null);
};
