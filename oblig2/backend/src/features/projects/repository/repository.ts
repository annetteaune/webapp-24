import { db, type DB } from "@/db/db";

import { ResultHandler } from "@/lib/result";
import { Result } from "@/types";
import { DbProject, Project } from "../types/types";
import { fromDb, toDb } from "../mappers/mappers";

export const createProjectRepository = (db: DB) => {
  // sjekke om et prosjekt eksisterer basert på ID
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  // hente et prosjekt basert på ID
  const getById = async (id: string): Promise<Result<Project>> => {
    try {
      const projectExists = await exist(id);
      if (!projectExists)
        return ResultHandler.failure("Project not found", "NOT_FOUND");

      const query = db.prepare("SELECT * FROM projects WHERE id = ?");
      const data = query.get(id) as DbProject;

      return ResultHandler.success(fromDb(data));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  // liste alle prosjekter
  const list = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects");
      const data = query.all() as DbProject[];

      return ResultHandler.success(data.map((project) => fromDb(project)));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  // opprette nytt prosjekt
  const create = async (data: Project): Promise<Result<string>> => {
    try {
      const project = toDb(data);
      const query = db.prepare(`
        INSERT INTO projects (id, title, description, imageLink, liveLink, codeLink, publishedAt, privateBox)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      query.run(
        project.id,
        project.title,
        project.description,
        project.imageLink,
        project.liveLink,
        project.codeLink,
        project.publishedAt,
        project.privateBox ? 1 : 0
      );

      return ResultHandler.success(project.id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  // oppdaterer eksisterende prosjekt
  const update = async (data: Project): Promise<Result<Partial<Project>>> => {
    try {
      const projectExists = await exist(data.id);
      if (!projectExists)
        return ResultHandler.failure("Project not found", "NOT_FOUND");

      const project = toDb(data);

      const query = db.prepare(`
        UPDATE projects
        SET title = ?, description = ?, imageLink = ?, liveLink = ?, codeLink = ?, publishedAt = ?, privateBox = ?
        WHERE id = ?
      `);

      query.run(
        project.title,
        project.description,
        project.imageLink,
        project.liveLink,
        project.codeLink,
        project.publishedAt,
        project.privateBox ? 1 : 0,
        project.id
      );

      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  // slette prosjekt basert på ID
  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const projectExists = await exist(id);
      if (!projectExists)
        return ResultHandler.failure("Project not found", "NOT_FOUND");

      const query = db.prepare("DELETE FROM projects WHERE id = ?");
      query.run(id);

      return ResultHandler.success(id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  return { create, list, getById, update, remove };
};

export const projectRepository = createProjectRepository(db);
export type ProjectRepository = ReturnType<typeof createProjectRepository>;
