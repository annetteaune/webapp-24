import { useState, useEffect, useCallback } from "react";
import { Project } from "../types";
import { getProjects, deleteProject, addProject } from "../services/api";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      setError("Feil ved henting av prosjekter");
      console.error("Feil ved henting av prosjekter:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Feil ved sletting av prosjekter", error);
      setError("Feil ved sletting av prosjekter");
    }
  };

  const handleAdd = async (newProject: Omit<Project, "id">) => {
    try {
      const addedProject = await addProject(newProject);
      setProjects((prevProjects) => [...prevProjects, addedProject]);
      return addedProject;
    } catch (error) {
      console.error("Feil ved lagring av prosjekt", error);
      setError("Feil ved lagring av prosjekt");
      throw error;
    }
  };

  return {
    projects,
    isLoading,
    error,
    handleDelete,
    handleAdd,
    refreshProjects: fetchProjects,
  };
};
