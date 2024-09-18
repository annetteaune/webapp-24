import { Hono } from "hono";
import { cors } from "hono/cors";
import { ProjectSchema, type Project } from "./types";
import { readFile, writeFile } from "fs/promises";

const app = new Hono();

app.use("/*", cors());

const jsonPath = "./data/projects.json";

// lese fra json
async function readFromJson(): Promise<Project[]> {
  try {
    const jsonData = await readFile(jsonPath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error i lesing fra JSON:", error);
    return [];
  }
}

// skrive til json
async function writeToJson(projects: Project[]): Promise<void> {
  try {
    await writeFile(jsonPath, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error("Error under skriving til JSON:", error);
  }
}

let projects: Project[] = [];

// Laster inn eksisterende prosjekter
readFromJson().then((loadedProjects) => {
  projects = loadedProjects;
});

app.post("/projects", async (c) => {
  try {
    const newProject = await c.req.json();

    // legge til ID i prosjektdata
    const projectWithId = {
      id: crypto.randomUUID(),
      ...newProject,
    };

    // validere
    const project = ProjectSchema.parse(projectWithId);

    // legge til i prosjektlista
    projects.push(project);

    await writeToJson(projects);

    return c.json<Project[]>(projects, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return c.json({ error: "Feil under lagring av data" }, { status: 400 });
  }
});

app.get("/projects", (c) => {
  return c.json<Project[]>(projects);
});

// slette prosjekter, her har jeg fått hjelp fra claude siden vi ikke har vært gjennom sletting fra server så langt i kurset.
app.delete("/projects/:id", async (c) => {
  const id = c.req.param("id");
  const index = projects.findIndex((project) => project.id === id);

  if (index === -1) {
    return c.json(
      { error: "Feil under sletting av prosjekt" },
      { status: 404 }
    );
  }

  projects.splice(index, 1);
  await writeToJson(projects);

  return c.json({ message: "Prosjekt slettet" }, { status: 200 });
});

export default app;
