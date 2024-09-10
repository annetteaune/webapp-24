import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCards";

export default function Projects() {
  return (
    <section id="content-wrapper">
      <AddProjectForm />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </section>
  );
}
