import { Hono } from "hono";
import type { HonoEnv } from "@/app";
import type { Data } from "@/types";
import { techService } from "../service/service";
import { TechService } from "../types/types";
import { errorResponse } from "@/lib/error";

export const createTechController = (techService: TechService) => {
  const app = new Hono<HonoEnv>();

  app.post("/", async (c) => {
    const data = await c.req.json();
    const result = await techService.addTechToProject(data.id, data.name);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json<Data<string>>(result, { status: 201 });
  });

  return app;
};

export const techController = createTechController(techService);
