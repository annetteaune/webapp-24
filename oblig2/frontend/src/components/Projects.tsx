import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCards";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export default function Projects({ projects, onDelete }: ProjectsProps) {
  const projectCount = projects.length;

  return (
    <>
      <h2 className="section-title" id="projects">
        Prosjekter ({projectCount})
      </h2>
      <section id="content-wrapper">
        <AddProjectForm />
        {projects.length === 0 ? (
          <p>Ingen prosjekter</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={onDelete}
            />
          ))
        )}
      </section>
    </>
  );
}
