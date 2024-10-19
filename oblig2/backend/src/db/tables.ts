import type { DB } from "./db";

export const createTables = async (db: DB) => {
  db.exec(`
  CREATE TABLE projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      image_link TEXT,
      live_link TEXT,
      code_link TEXT,
      published_at TEXT,
      private_box BOOLEAN
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

  // her fikk jeg hjelp av claude.ai da jeg hadde trøbbel med å kjøre setup
  // sjekker altså om indexen finnes før den opprettes
  const indexExists = (indexName: string) => {
    const result = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='index' AND name=?`)
      .get(indexName);
    return !!result;
  };

  if (!indexExists("idx_projects_published_at")) {
    db.exec(
      `CREATE INDEX idx_projects_published_at ON projects (published_at);`
    );
  }

  if (!indexExists("idx_project_technologies_project_id")) {
    db.exec(
      `CREATE INDEX idx_project_technologies_project_id ON project_technologies (project_id);`
    );
  }

  if (!indexExists("idx_project_technologies_technology_id")) {
    db.exec(
      `CREATE INDEX idx_project_technologies_technology_id ON project_technologies (technology_id);`
    );
  }
};
