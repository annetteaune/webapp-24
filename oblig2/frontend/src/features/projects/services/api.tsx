import { ofetch } from "ofetch";

import { endpoints } from "../../../config";
import { Project, Technology } from "../../../types";
import { validateProjects } from "../helpers/schema";

const url = endpoints.projects;

const remove = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "Failed to delete project");
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

const create = async (data: Partial<Project>): Promise<Project> => {
  try {
    const projectData = {
      ...data,
      publishedAt:
        data.publishedAt instanceof Date
          ? data.publishedAt.toISOString()
          : typeof data.publishedAt === "string"
          ? new Date(data.publishedAt).toISOString()
          : new Date().toISOString(),
    };

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

const list = async (): Promise<{
  data: (Project & { technologies: Technology[] })[];
}> => {
  try {
    const projectData = await ofetch(url, {
      credentials: "include",
    });

    const projects = validateProjects(projectData.data);

    if (!projects.success) {
      console.error("Validation failed:", projects); // logge valideringsfeil
      return { data: [] };
    }

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

export default { remove, create, update, list };
