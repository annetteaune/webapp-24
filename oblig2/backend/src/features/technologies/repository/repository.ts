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
      const query = db.prepare(`
        SELECT t.id, t.name 
        FROM technologies t
        JOIN project_technologies pt ON t.id = pt.technology_id
        WHERE pt.project_id = ?;
      `);
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
      const insertTech = db.prepare(
        "INSERT OR IGNORE INTO technologies (id, name) VALUES (?, ?);"
      );
      const linkTechToProject = db.prepare(
        "INSERT OR IGNORE INTO project_technologies (project_id, technology_id) VALUES (?, ?);"
      );

      db.transaction(() => {
        insertTech.run(tech.id, tech.name);
        linkTechToProject.run(projectID, tech.id);
      })();

      return ResultHandler.success(tech.id);
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
