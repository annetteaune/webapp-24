import { useState, FormEvent } from "react";
import { useProjects } from "../hooks/useProjects";
import { handleInputChange } from "../services/formServices";
import { validateProject } from "../services/validation";

export default function AddProjectForm() {
  const { handleAdd } = useProjects();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [imageLink, setImageLink] = useState("");

  const addProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProject = {
      title,
      description,
      liveLink,
      codeLink,
      imageLink,
      publishedAt: new Date().toISOString(),
    };

    if (!validateProject(newProject)) return;

    try {
      await handleAdd(newProject);
      // reset form etter at prosjektet er lagret
      setTitle("");
      setDescription("");
      setLiveLink("");
      setCodeLink("");
      setImageLink("");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <article className="add-form">
      <h2>Legg til nytt prosjekt</h2>
      <form id="add-project-form" onSubmit={addProject}>
        <label htmlFor="title">Tittel</label>
        <input
          name="title"
          id="title"
          type="text"
          placeholder="Prosjekttittel"
          value={title}
          onChange={handleInputChange(setTitle)}
          required
        />
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          name="description"
          id="description"
          placeholder="Kort beskrivelse"
          value={description}
          onChange={handleInputChange(setDescription)}
          required
        ></textarea>
        <label htmlFor="liveLink">Live link </label>
        <input
          name="liveLink"
          id="liveLink"
          type="url"
          value={liveLink}
          onChange={handleInputChange(setLiveLink)}
          placeholder="Link til nettsted"
        />
        <label htmlFor="codeLink">Kodelink </label>
        <input
          name="codeLink"
          id="codeLink"
          type="url"
          value={codeLink}
          onChange={handleInputChange(setCodeLink)}
          placeholder="Link til kode"
        />
        <label htmlFor="imageLink">Bildelink</label>
        <input
          name="imageLink"
          id="imageLink"
          type="url"
          value={imageLink}
          onChange={handleInputChange(setImageLink)}
          placeholder="Link til bilde"
          required
        />
        <button type="submit" className="btn">
          Lagre prosjekt
        </button>
      </form>
    </article>
  );
}
