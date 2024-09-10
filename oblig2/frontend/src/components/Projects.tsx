import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCards";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="content-wrapper">
      <AddProjectForm />
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
