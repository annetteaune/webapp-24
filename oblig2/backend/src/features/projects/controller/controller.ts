import { Hono } from "hono";

import type { HonoEnv } from "@/app";
import { projectService, ProjectService } from "../service/service";
import { UpdateProjectDto } from "../types/types";
import { errorResponse } from "@/lib/error";

export const createProjectController = (projectService: ProjectService) => {
  const app = new Hono<HonoEnv>();

  // liste alle prosjetker
  app.get("/", async (c) => {
    const result = await projectService.list();
    if (!result.success)
      return c.json(
        { error: "Feil ved henting av prosjekter" },
        { status: 500 }
      );
    return c.json(result);
  });

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
    const updateData: Partial<UpdateProjectDto> = { ...partialData, id };
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

  // hente tech per prosjekt

  app.get("/:id/tech", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.listProjectTech(id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });
  return app;
};
export const projectController = createProjectController(projectService);
