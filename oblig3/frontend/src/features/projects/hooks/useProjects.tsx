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
      const result = await projectsApi.list();

      setData(result?.data ?? []);

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Error fetching data");
    } finally {
      resetToIdle();
    }
  }, [resetToIdle]);

  useEffectOnce(fetchData);

  const add = async (data: Partial<Project>) => {
    try {
      setStatus("loading");
      await projectsApi.create(data);
      await fetchData();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Failed to create project");
      console.error("Error details:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
    } finally {
      resetToIdle();
    }
  };
  const remove = async (id: string) => {
    try {
      setStatus("loading");
      await projectsApi.remove(id);

      // oppdatere local state for å fjerne det slettede prosjektet
      setData((prevData) => prevData.filter((project) => project.id !== id));

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setError("Failed to delete project");
      throw error;
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
      setError("Failed updating project");
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
