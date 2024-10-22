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
  // hente prosjekt basert på ID
  const getById = async (id: string): Promise<Result<Project>> => {
    return projectRepository.getById(id);
  };

  // hente alle prosjekter med tech array
  const list = async (): Promise<
    Result<(Project & { technologies: Technology[] })[]>
  > => {
    try {
      const projects = await projectRepository.list();

      if (!projects.success) {
        return ResultHandler.failure(
          projects.error.message,
          projects.error.code
        );
      }
      // formatere fra number til bool
      const formattedProjects = projects.data.map((project) => ({
        ...project,
        privateBox: Boolean(project.privateBox), // konverter 0/1 til boolean
      }));

      const projectsWithTech = await Promise.all(
        formattedProjects.map(async (project) => {
          const tech = await techService.listByProject(project.id);

          if (!tech.success) {
            return { ...project, technologies: [] }; // fallback til tom array
          }

          return { ...project, technologies: tech.data };
        })
      );

      //TODO error datatype bool/num - appen kjører og klarer jeg ikke finne feilen
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
  ): Promise<Result<Project & { technologies: Technology[] }>> => {
    const project = await projectRepository.getById(id);
    const tech = await techService.listByProject(id);
    if (!tech.success)
      return ResultHandler.failure(tech.error.message, tech.error.code);
    if (!project.success)
      return ResultHandler.failure(project.error.message, project.error.code);

    return ResultHandler.success({ ...project.data, technologies: tech.data });
  };

  // Opprette nytt prosjekt
  const create = async (data: CreateProjectDto): Promise<Result<string>> => {
    const project = createProject({
      ...data,
      publishedAt: new Date(),
    });

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
