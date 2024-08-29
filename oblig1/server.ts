import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "./types";
import { readFile, writeFile } from "fs/promises";

// mer eller mindre direkte avskrift fra spa-ts inne i denne filen

const app = new Hono();

app.use("/*", cors());

app.use("/src/*", serveStatic({ root: "./" }));

const jsonPath = "./data/projects.json";

// Leser prosjekter fra JSON
async function readFromJson(): Promise<Project[]> {
  try {
    const jsonData = await readFile(jsonPath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error i lesing fra JSON:", error);
    return [];
  }
}

async function writeToJson(projects: Project[]): Promise<void> {
  try {
    await writeFile(jsonPath, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error("Error under skriving til JSON:", error);
  }
}

/* 
Legger til data fra json i tom liste
const projects: Project[] = [...jsonData];
 går bort ifra denne metoden da jeg benytter read/write istedet
 */

// Oppretter tom liste
let projects: Project[] = [];

// Laster inn eksisterende prosjekter
readFromJson().then((loadedProjects) => {
  projects = loadedProjects;
});

app.post("/new-project", async (c) => {
  const newProject = await c.req.json();
  const project = ProjectSchema.parse(newProject);
  if (!project) return c.json({ error: "Invalid project" }, { status: 400 });

  projects.push(project);

  // skrive inn nytt prosjekt til json
  await writeToJson(projects);

  return c.json<Project[]>(projects, { status: 201 });
});

app.get("/", (c) => {
  return c.json<Project[]>(projects);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
