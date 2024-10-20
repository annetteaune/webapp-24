import { db, type DB } from "@/db/db";
import { DbTechnologies, Technology, TechRepository } from "../types/types";
import { Result } from "@/types";
import { ResultHandler } from "@/lib/result";
import { fromDb, toDb } from "../mappers/mappers";

export const createTechRepository = (db: DB): TechRepository => {
  const listByProject = async (
    projectID: string
  ): Promise<Result<Technology[]>> => {
    try {
      const query = db.prepare("SELECT * FROM technologies WHERE id = ?;");
      const data = query.all(projectID) as DbTechnologies[];
      return ResultHandler.success(data.map((tech) => fromDb(tech)));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const addTechToProject = async (
    projectID: string,
    name: string
  ): Promise<Result<string>> => {
    try {
      const tech = toDb({ name }, projectID);

      const query = db.prepare(
        "INSERT INTO technologies (id, name) VALUES (?, ?);"
      );
      query.run(projectID, tech.id, tech, name);

      return ResultHandler.success(fromDb(tech).id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  return {
    listByProject,
    addTechToProject,
  };
};

export const techRepository = createTechRepository(db);
