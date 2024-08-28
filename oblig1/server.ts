import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "./types";
import jsonData from "./data/projects.json";

// mer eller mindre direkte avskrift fra spa-ts

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

// Legger til data fra json i tom liste
const projects: Project[] = [...jsonData];

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  const project = ProjectSchema.parse(newProject);
  if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
  console.log(project);
  projects.push(project);

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
