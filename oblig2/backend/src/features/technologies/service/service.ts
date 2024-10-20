import type { Result } from "@/types";
import { Technology, TechRepository, TechService } from "../types/types";
import { techRepository } from "../repository/repository";

export const createTechnologyService = (
  techRepository: TechRepository
): TechService => {
  const listByProject = async (
    projectID: string
  ): Promise<Result<Technology[]>> => {
    return techRepository.listByProject(projectID);
  };

  const addTechToProject = async (
    projectID: string,
    name: string
  ): Promise<Result<string>> => {
    return techRepository.addTechToProject(projectID, name);
  };

  return {
    listByProject,
    addTechToProject,
  };
};

export const techService = createTechnologyService(techRepository);
