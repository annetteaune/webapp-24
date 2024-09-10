import { Hono } from "hono";
import { cors } from "hono/cors";
import { ProjectSchema, type Project } from "./types";
import { readFile, writeFile } from "fs/promises";

const app = new Hono();

app.use("/*", cors());

const jsonPath = "./data/projects.json";

//LEse fra json
async function readFromJson(): Promise<Project[]> {
  try {
    const jsonData = await readFile(jsonPath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error i lesing fra JSON:", error);
    return [];
  }
}

let projects: Project[] = [];

// Laster inn eksisterende prosjekter
readFromJson().then((loadedProjects) => {
  projects = loadedProjects;
});

app.get("/projects", (c) => {
  return c.json<Project[]>(projects);
});

export default app;
