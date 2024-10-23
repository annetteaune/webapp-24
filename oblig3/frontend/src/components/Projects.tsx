import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCards";
import { Project } from "../types";
import { useState } from "react";

interface ProjectsProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export default function Projects({ projects, onDelete }: ProjectsProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const projectCount = projects.length;

  const handleDelete = async (id: string) => {
    try {
      setDeleteError(null);
      await onDelete(id);
    } catch (error) {
      setDeleteError("Failed to delete project. Please try again.");
      console.error("Delete error:", error);
    }
  };

  return (
    <>
      <h2 className="section-title" id="projects">
        Prosjekter ({projectCount})
      </h2>
      <section id="content-wrapper">
        <AddProjectForm />
        {deleteError && <p className="error-message">{deleteError}</p>}
        {projects.length === 0 ? (
          <p>Ingen prosjekter</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))
        )}
      </section>
    </>
  );
}
