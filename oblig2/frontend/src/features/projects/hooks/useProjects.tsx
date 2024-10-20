import { useState, useCallback } from "react";
import projectsApi from "../services/api";
import { useEffectOnce } from "./useEffectOnce";
import { Project } from "../../../types";

type Status = "idle" | "loading" | "error" | "success" | "fetching";

export const useProjects = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Project[]>([]);

  const [error, setError] = useState<string | null>(null);

  const isFetching = status === "fetching";
  const isLoading = status === "loading" || isFetching;
  const isError = status === "error" || !!error;
  const isIdle = status === "idle";
  const isSuccess = status === "success";

  const resetToIdle = useCallback(
    (timeout = 2000) =>
      setTimeout(() => {
        setStatus("idle");
      }, timeout),
    []
  );

  const fetchData = useCallback(async () => {
    try {
      setStatus("loading");
      const result = await projectsApi.listTech();

      setData(result?.data ?? []);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Feil ved henting av data");
    } finally {
      resetToIdle();
    }
  }, [resetToIdle]);

  useEffectOnce(fetchData);

  const add = async (data: Partial<Project>) => {
    const { title = "" } = data;

    try {
      setStatus("loading");
      await projectsApi.create({ title });
      await fetchData();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Feilet under opprettelse av prosjekt");
    } finally {
      resetToIdle();
    }
  };

  const remove = async (id: string) => {
    try {
      setStatus("loading");
      await projectsApi.remove(id);
      await fetchData();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Feil under fjerning av prosjekt");
    } finally {
      resetToIdle();
    }
  };

  const update = async (id: string, data: Partial<Project>) => {
    try {
      setStatus("loading");
      await projectsApi.update(id, data);
      await fetchData();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Oppdatering av prosjekt mislykket");
    } finally {
      resetToIdle();
    }
  };

  return {
    add,
    remove,
    update,
    get: fetchData,
    data,
    error,
    status: {
      idle: isIdle,
      loading: isLoading,
      success: isSuccess,
      error: isError,
      fetching: isFetching,
    },
  };
};

/*export const useProjects = () => {
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
*/
