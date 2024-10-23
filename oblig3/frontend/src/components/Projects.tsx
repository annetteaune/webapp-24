import { Project } from "../features/projects/helpers/schema";

import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCards";
import TechnologyFilter from "./TechnologyFilter";
import { useState } from "react";

interface ProjectsProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export default function Projects({ projects, onDelete }: ProjectsProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string>("");

  // hente unike teknologier fra alle prosjekter
  const allTechnologies = Array.from(
    new Map(
      projects
        .flatMap((project) => project.technologies || [])
        .map((tech) => [tech.id, tech])
    ).values()
  );

  // filtrer basert på teknologier
  const filteredProjects = selectedTech
    ? projects.filter((project) =>
        project.technologies?.some((tech) => tech.id === selectedTech)
      )
    : projects;

  const projectCount = filteredProjects.length;

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
      <section className="projects-header">
        {" "}
        <h2 className="section-title" id="projects">
          Prosjekter ({projectCount})
        </h2>
        <TechnologyFilter
          technologies={allTechnologies}
          selectedTech={selectedTech}
          onTechChange={setSelectedTech}
        />
      </section>

      <section id="content-wrapper">
        <AddProjectForm />

        {deleteError && <p className="error-message">{deleteError}</p>}
        {filteredProjects.length === 0 ? (
          <p>Ingen prosjekter</p>
        ) : (
          filteredProjects.map((project) => (
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
