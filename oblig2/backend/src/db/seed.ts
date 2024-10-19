import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Database } from "better-sqlite3";

interface Technology {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  liveLink: string;
  codeLink: string;
  publishedAt: string;
  privateBox: boolean;
  technologies: Technology[];
}

export const seed = async (db: Database) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dataPath = path.join(__dirname, "data.json");

  const file = await fs.readFile(dataPath, "utf-8");
  const projects = JSON.parse(file) as Project[];

  const insertProject = db.prepare(`
    INSERT INTO projects (id, title, description, image_link, live_link, code_link, published_at, private_box)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTechnology = db.prepare(`
    INSERT OR IGNORE INTO technologies (id, name)
    VALUES (?, ?)
  `);

  const insertProjectTechnology = db.prepare(`
    INSERT INTO project_technologies (project_id, technology_id)
    VALUES (?, ?)
  `);

  const transaction = db.transaction(() => {
    for (const project of projects) {
      insertProject.run(
        project.id,
        project.title,
        project.description,
        project.imageLink,
        project.liveLink,
        project.codeLink,
        project.publishedAt,
        project.privateBox ? 1 : 0
      );

      for (const tech of project.technologies) {
        insertTechnology.run(tech.id, tech.name);
        insertProjectTechnology.run(project.id, tech.id);
      }
    }
  });

  transaction();
};
