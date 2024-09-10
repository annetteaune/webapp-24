import { FaCode, FaGlobe } from "react-icons/fa";

export default function ProjectCard() {
  return (
    <article className="project-card">
      <section className="img-wrapper">
        <img src="https://picsum.photos/400/250" alt="placeholder image" />
      </section>
      <section className="title-wrapper">
        <h2>Placeholder title</h2>
        <section className="project-links">
          <a href="#">
            <FaGlobe />
          </a>
          <a href="#">
            <FaCode />
          </a>
        </section>
      </section>
      <section className="desc-wrapper">
        <p>Description placeholder</p>
        <button className="more-btn btn">Les mer</button>
      </section>
    </article>
  );
}
