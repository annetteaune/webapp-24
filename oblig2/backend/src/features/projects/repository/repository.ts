import type { DB } from "@/db/db";
import type { Project, Technology } from "../types/types";
import { ResultHandler } from "@/lib/result";
import type { Result } from "../types/types";

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
// prosjekter
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
  const getById = async (id: string): Promise<Result<Project | undefined>> => {
    try {
      const projectExists = await exist(id);
      if (!projectExists)
        return ResultHandler.failure("Project not found", "NOT_FOUND");

      const query = db.prepare("SELECT * FROM projects WHERE id = ?");
      const data = query.get(id) as Project;

      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  // liste alle prosjekter
  const list = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects");
      const data = query.all() as Project[];

      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  // opprette nytt prosjekt
  const create = async (data: Project): Promise<Result<string>> => {
    try {
      const query = db.prepare(`
        INSERT INTO projects (id, title, description, image_link, live_link, code_link, published_at, private_box)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      query.run(
        data.id,
        data.title,
        data.description,
        data.imageLink,
        data.liveLink,
        data.codeLink,
        data.publishedAt,
        data.privateBox ? 1 : 0
      );

      return ResultHandler.success(data.id);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  // oppdaterer eksisterende prosjekt
  const update = async (data: Project): Promise<Result<Partial<Project>>> => {
    try {
      const projectExists = await exist(data.id);
      if (!projectExists)
        return ResultHandler.failure("Project not found", "NOT_FOUND");

      const query = db.prepare(`
        UPDATE projects
        SET title = ?, description = ?, image_link = ?, live_link = ?, code_link = ?, published_at = ?, private_box = ?
        WHERE id = ?
      `);

      query.run(
        data.id,
        data.title,
        data.description,
        data.imageLink,
        data.liveLink,
        data.codeLink,
        data.publishedAt,
        data.privateBox ? 1 : 0
      );

      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
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
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  return { create, list, getById, update, remove };
};
export type TechnologyRepository = ReturnType<
  typeof createTechnologyRepository
>;
// teknologier
export const createTechnologyRepository = (db: DB) => {
  // sjekke om eksisterer basert på ID
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM technologies WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  // hente basert på ID
  const getById = async (
    id: string
  ): Promise<Result<Technology | undefined>> => {
    try {
      const technologyExists = await exist(id);
      if (!technologyExists)
        return ResultHandler.failure("Technology not found", "NOT_FOUND");

      const query = db.prepare("SELECT * FROM technologies WHERE id = ?");
      const data = query.get(id) as Technology;

      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  // liste alle teknologier
  const list = async (): Promise<Result<Technology[]>> => {
    try {
      const query = db.prepare("SELECT * FROM technologies");
      const data = query.all() as Technology[];

      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  // opprette en ny teknologi
  const create = async (data: Technology): Promise<Result<string>> => {
    try {
      const query = db.prepare(`
          INSERT INTO technologies (id, name)
          VALUES (?, ?)
        `);

      query.run(data.id, data.name);

      return ResultHandler.success(data.id);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  // oppdatere en eksisterende teknologi
  const update = async (
    data: Technology
  ): Promise<Result<Partial<Technology>>> => {
    try {
      const technologyExists = await exist(data.id);
      if (!technologyExists)
        return ResultHandler.failure("Technology not found", "NOT_FOUND");

      const query = db.prepare(`
          UPDATE technologies
          SET name = ?
          WHERE id = ?
        `);

      query.run(data.name, data.id);

      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  // slette en teknologi basert på ID
  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const technologyExists = await exist(id);
      if (!technologyExists)
        return ResultHandler.failure("Technology not found", "NOT_FOUND");

      const query = db.prepare("DELETE FROM technologies WHERE id = ?");
      query.run(id);

      return ResultHandler.success(id);
    } catch (error) {
      return ResultHandler.failure(String(error), "INTERNAL_SERVER_ERROR");
    }
  };

  return { create, list, getById, update, remove };
};
