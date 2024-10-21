import { ofetch } from "ofetch";

import { endpoints } from "../../../config";
import { Project, Technology } from "../../../types";
//import { validateProject } from "../../../services/validation";
import { validateProjects } from "../helpers/schema";

const url = endpoints.projects;

const remove = async (id: string) => {
  try {
    await ofetch(`${url}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const create = async (data: Partial<Project>): Promise<Project> => {
  try {
    console.log("Original project data:", JSON.stringify(data, null, 2));

    const projectData = {
      ...data,
      publishedAt:
        data.publishedAt instanceof Date
          ? data.publishedAt.toISOString()
          : typeof data.publishedAt === "string"
          ? new Date(data.publishedAt).toISOString()
          : new Date().toISOString(),
    };

    console.log(
      "Transformed project data:",
      JSON.stringify(projectData, null, 2)
    );

    const response = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(projectData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating project:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

const list = async () => {
  try {
    const projects = await ofetch(url, {
      credentials: "include",
    });

    return validateProjects(projects.data);
  } catch (error) {
    console.error(error);
  }
};

const listTech = async (): Promise<{
  data: (Project & { technologies: Technology[] })[];
}> => {
  try {
    const projectData = await ofetch(url, {
      credentials: "include",
    });

    console.log("Project data from API:", projectData);

    const projects = validateProjects(projectData.data);

    if (!projects.success) {
      console.error("Validation failed:", projects); // logge valideringsfeil
      return { data: [] };
    }

    console.log("Validated projects:", projects.data); // sjekk validert data

    const data = await Promise.all(
      projects.data.map((project) =>
        ofetch(`${url}/${project.id}/technologies`, {
          credentials: "include",
        }).then(({ data }) => data)
      )
    );

    return { data };
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

const update = async (id: string, data: Partial<Project>) => {
  try {
    await ofetch(`${url}/${id}`, {
      method: "PATCH",
      body: data,
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  }
};

export default { remove, create, list, update, listTech };
/*

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

//hente tech
export const getTech = async (): Promise<Technology[]> => {
  try {
    const data = await ofetch(TECH);
    return data;
  } catch (error) {
    console.error("Feil ved henting av teknologier", error);
    return [];
  }
};
 */
