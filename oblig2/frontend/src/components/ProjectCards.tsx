import { FaCode, FaGlobe } from "react-icons/fa";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <section className="img-wrapper">
        <img src={project.imageLink} alt={project.title} />
      </section>
      <section className="title-wrapper">
        <h2>{project.title}</h2>
        <section className="project-links">
          <a href={project.liveLink}>
            <FaGlobe />
          </a>
          <a href={project.codeLink}>
            <FaCode />
          </a>
        </section>
      </section>
      <section className="desc-wrapper">
        <p>{project.description}</p>
        <button className="more-btn btn">Les mer</button>
      </section>
    </article>
  );
}
