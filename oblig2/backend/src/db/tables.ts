import type { DB } from "./db";

export const createTables = async (db: DB) => {
  db.exec(`
  CREATE TABLE projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      imageLink TEXT,
      liveLink TEXT,
      codeLink TEXT,
      publishedAt TEXT,
      privateBox BOOLEAN
  );
  
  
  CREATE TABLE technologies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
  );
  
  
  CREATE TABLE project_technologies (
      project_id TEXT,
      technology_id TEXT,
      PRIMARY KEY (project_id, technology_id),
      FOREIGN KEY (project_id) REFERENCES projects (id),
      FOREIGN KEY (technology_id) REFERENCES technologies (id)
  );
  `);
};
