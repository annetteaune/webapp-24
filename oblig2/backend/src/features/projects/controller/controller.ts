import { Hono } from "hono";

import { ProjectService, projectService } from "../service/service";
import type { HonoEnv } from "@/app";
import { UpdateProject } from "../types/types";

export const createProjectController = (projectService: ProjectService) => {
  const app = new Hono<HonoEnv>();

  // hente ut basert på ID
  app.get("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.getById(id);
    if (!result.success)
      return c.json({ error: "Feil ved henting av prosjekt" }, { status: 400 });
    return c.json(result);
  });

  // opprette prosjekt
  app.post("/", async (c) => {
    const data = await c.req.json();
    const result = await projectService.create(data);
    if (!result.success) {
      return c.json(
        { error: "Feil ved oppretting av prosjekt" },
        { status: 400 }
      );
    }
    return c.json(result, { status: 201 });
  });

  // oppdatere prosjekt
  app.patch("/:id", async (c) => {
    const id = c.req.param("id");
    const partialData = await c.req.json();
    const updateData: Partial<UpdateProject> = { ...partialData, id };
    const result = await projectService.update(updateData);
    if (!result.success) {
      return c.json(
        { error: "Feil under oppdatering av prosjekt" },
        { status: 400 }
      );
    }
    return c.json(result);
  });

  // fjerne prosjekt
  app.delete("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.remove(id);
    if (!result.success) {
      return c.json(
        { error: "Feil ved sletting av prosjekt" },
        { status: 400 }
      );
    }
    return c.json(result);
  });
  return app;
};
export const projectController = createProjectController(projectService);
