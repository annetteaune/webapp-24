import { ofetch } from "ofetch";
import { Project } from "../types";
import { PROJECTS } from "../config";

// hente prosjekter
export const getProjects = async (): Promise<Project[]> => {
  try {
    const data = await ofetch(PROJECTS);
    return data;
  } catch (error) {
    console.error("Feil ved henting av prosjekter", error);
    return [];
  }
};

// slette prosjekt
export const deleteProject = async (id: string) => {
  try {
    const response = await ofetch(PROJECTS + `${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Feil ved sletting av prosjekt", error);
    throw error;
  }
};

//legge til prosjekt
export const addProject = async (
  newProject: Omit<Project, "id">
): Promise<Project> => {
  try {
    const response = await ofetch(PROJECTS, {
      method: "POST",
      body: JSON.stringify(newProject),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Feil ved lagring av prosjekt", error);
    throw error;
  }
};
