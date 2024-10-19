import type { CreateProject, Result, UpdateProject } from "../types/types";
import {
  createProjectRepository,
  type ProjectRepository,
} from "../repository/repository";
import type { Project } from "../types/types";
import { createProject } from "../mappers/mappers";
import db from "@/db/db";
import { validateProjectData } from "../utils/validator";

export const createProjectService = (projectRepository: ProjectRepository) => {
  // hente alle
  const list = async (): Promise<Result<Project[]>> => {
    return projectRepository.list();
  };

  // opprette nytt prosjekt
  const create = async (data: CreateProject): Promise<Result<string>> => {
    const validationResult = validateProjectData(data);
    if (!validationResult.success) {
      return validationResult;
    }

    const project = createProject(data);
    return projectRepository.create(project);
  };

  // oppdatere eksisterende prosjekt
  const update = async (data: UpdateProject) => {
    const project = createProject({ ...data });

    const validationResult = validateProjectData(data);
    if (!validationResult.success) {
      return validationResult;
    }

    return projectRepository.update(project);
  };

  //hente porsjekt basert på ID
  const getById = async (id: string): Promise<Result<Project | undefined>> => {
    return await projectRepository.getById(id);
  };

  const remove = async (id: string): Promise<Result<string>> => {
    return await projectRepository.remove(id);
  };

  return {
    list,
    create,
    update,
    getById,
    remove,
  };
};

export const projectService = createProjectService(createProjectRepository(db));

export type ProjectService = ReturnType<typeof createProjectService>;
