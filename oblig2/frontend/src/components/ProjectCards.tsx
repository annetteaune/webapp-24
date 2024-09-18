import { FaCode, FaGlobe, FaTrash } from "react-icons/fa";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const handleDelete = () => {
    if (window.confirm("Er du sikker på at du vil slette prosjektet?")) {
      onDelete(project.id);
    }
  };

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
        <div className="btn-wrapper">
          <button className="more-btn btn">Les mer</button>
          <button onClick={handleDelete} className="delete-btn btn">
            <FaTrash />
          </button>
        </div>
      </section>
    </article>
  );
}
