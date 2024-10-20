import {
  projectRepository,
  type ProjectRepository,
} from "../repository/repository";
import type {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
} from "../types/types";
import { createProject } from "../mappers/mappers";
import { isValidProject } from "../utils/validator";
import { Result } from "@/types";
import { TechService, Technology } from "@/features/technologies/types/types";
import { ResultHandler } from "@/lib/result";
import { techRepository } from "@/features/technologies/repository/repository";

export const createProjectService = (
  projectRepository: ProjectRepository,
  techService: TechService
) => {
  //hente porsjekt basert på ID
  const getById = async (id: string): Promise<Result<Project>> => {
    return projectRepository.getById(id);
  };

  // hente alle
  const list = async (): Promise<Result<Project[]>> => {
    return projectRepository.list();
  };

  const listProjectTech = async (
    id: string
  ): Promise<Result<Project & { tech: Technology[] }>> => {
    const project = await projectRepository.getById(id);
    const tech = await techService.listByProject(id);
    if (!tech.success)
      return ResultHandler.failure(tech.error.message, tech.error.code);
    if (!project.success)
      return ResultHandler.failure(project.error.message, project.error.code);

    return ResultHandler.success({ ...project.data, tech: tech.data });
  };

  // opprette nytt prosjekt
  const create = async (data: CreateProjectDto): Promise<Result<string>> => {
    const project = createProject(data);

    if (!isValidProject(project)) {
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");
    }
    return projectRepository.create(project);
  };

  // oppdatere eksisterende prosjekt
  const update = async (data: UpdateProjectDto) => {
    const project = createProject({ ...data });

    if (!isValidProject(project))
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");

    return projectRepository.update(project);
  };
  // fjerne prosjekt
  const remove = async (id: string) => {
    return projectRepository.remove(id);
  };

  return {
    list,
    create,
    update,
    getById,
    remove,
    listProjectTech,
  };
};

export const projectService = createProjectService(
  projectRepository,
  techRepository
);

export type ProjectService = ReturnType<typeof createProjectService>;
