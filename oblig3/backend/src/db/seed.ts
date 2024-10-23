// backend/src/db/seed.ts

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
  technologies: string[]; // tech id-er
}

interface SeedData {
  technologies: Technology[];
  projects: Project[];
}

export const seed = async (db: Database) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dataPath = path.join(__dirname, "data.json");

  const file = await fs.readFile(dataPath, "utf-8");
  const { technologies, projects } = JSON.parse(file) as SeedData;

  const insertProject = db.prepare(`
    INSERT INTO projects (id, title, description, imageLink, liveLink, codeLink, publishedAt, privateBox)
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
    // insert alle technologies
    for (const tech of technologies) {
      insertTechnology.run(tech.id, tech.name);
    }

    // deretter prosjekter
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

      // relasjon mellom prosjekt og tech
      for (const techId of project.technologies) {
        insertProjectTechnology.run(project.id, techId);
      }
    }
  });

  transaction();

  console.log("Database seeded successfully!");
};
