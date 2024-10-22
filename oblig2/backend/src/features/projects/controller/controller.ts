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
    try {
      const body = await c.req.json();
      console.log("Received project data:", JSON.stringify(body, null, 2));

      // hente tech id hvis de fins
      const technologyIds =
        body.technologies?.map((tech: { id: string }) => tech.id) || [];

      // oppretter selve prosjektet
      const result = await projectService.create({
        ...body,
        technologies: undefined, // fjerner tech fra opprettelsesdata
      });

      if (!result.success) {
        console.error("Project creation failed:", result.error);
        return c.json(
          { error: "Failed to create project", details: result.error },
          { status: 400 }
        );
      }

      // hvos det sendes med tech, opprett relasjon
      if (technologyIds.length > 0) {
        await projectService.linkTechnologies(result.data, technologyIds);
      }

      // hente komplett prosjekt
      const projectWithTech = await projectService.getById(result.data);
      return c.json(projectWithTech, { status: 201 });
    } catch (error) {
      console.error("Error in project creation:", error);
      return c.json(
        {
          error: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
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

  app.get("/:id/technologies", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.listProjectTech(id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });
  return app;
};
export const projectController = createProjectController(projectService);
