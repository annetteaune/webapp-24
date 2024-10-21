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
  // Hente prosjekt basert på ID
  const getById = async (id: string): Promise<Result<Project>> => {
    return projectRepository.getById(id);
  };

  // Hente alle prosjekter med tech array
  const list = async (): Promise<
    Result<(Project & { tech: Technology[] })[]>
  > => {
    try {
      const projects = await projectRepository.list();

      if (!projects.success) {
        return ResultHandler.failure(
          projects.error.message,
          projects.error.code
        );
      }

      // tech for hvert prosjekt
      const projectsWithTech = await Promise.all(
        projects.data.map(async (project) => {
          const tech = await techService.listByProject(project.id);

          if (!tech.success) {
            return { ...project, tech: [] }; // tom array som fallback
          }

          return { ...project, tech: tech.data };
        })
      );

      return ResultHandler.success(projectsWithTech);
    } catch (error) {
      return ResultHandler.failure(
        "Error fetching projects",
        "INTERNAL_SERVER_ERROR"
      );
    }
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

  // Opprette nytt prosjekt
  const create = async (data: CreateProjectDto): Promise<Result<string>> => {
    const project = createProject(data);

    if (!isValidProject(project)) {
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");
    }
    return projectRepository.create(project);
  };

  // Oppdatere eksisterende prosjekt
  const update = async (data: UpdateProjectDto) => {
    const project = createProject({ ...data });

    if (!isValidProject(project))
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");

    return projectRepository.update(project);
  };

  // Fjerne prosjekt
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
