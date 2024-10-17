import { useState, FormEvent } from "react";
import { useProjects } from "../hooks/useProjects";

export default function AddProjectForm() {
  const { handleAdd } = useProjects();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [imageLink, setImageLink] = useState("");

  const addProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !description || !imageLink) return;

    const newProject = {
      title,
      description,
      liveLink,
      codeLink,
      imageLink,
    };

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

  const updateTitle = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setTitle(input.value);
  };

  const updateDesc = (event: FormEvent<HTMLTextAreaElement>) => {
    const input = event.target as HTMLTextAreaElement | null;
    if (!input) return;
    setDescription(input.value);
  };

  const updateLiveLink = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setLiveLink(input.value);
  };

  const updateCodeLink = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setCodeLink(input.value);
  };

  const updateImageLink = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    setImageLink(input.value);
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
          onChange={updateTitle}
          required
        />
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          name="description"
          id="description"
          placeholder="Kort beskrivelse"
          value={description}
          onChange={updateDesc}
          required
        ></textarea>
        <label htmlFor="liveLink">Live link </label>
        <input
          name="liveLink"
          id="liveLink"
          type="url"
          value={liveLink}
          onChange={updateLiveLink}
          placeholder="Link til nettsted"
        />
        <label htmlFor="codeLink">Kodelink </label>
        <input
          name="codeLink"
          id="codeLink"
          type="url"
          value={codeLink}
          onChange={updateCodeLink}
          placeholder="Link til kode"
        />
        <label htmlFor="imageLink">Bildelink</label>
        <input
          name="imageLink"
          id="imageLink"
          type="url"
          value={imageLink}
          onChange={updateImageLink}
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
