import { useState, FormEvent } from "react";
import { useProjects } from "../features/projects/hooks/useProjects";
import { handleInputChange } from "../services/formServices";
import { TECHNOLOGIES } from "../services/formServices";

import {
  projectSchema,
  validateProject,
} from "../features/projects/helpers/schema";
import { z } from "zod";

export default function AddProjectForm() {
  const { add } = useProjects();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [privateBox, setPrivateBox] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );

  const handleTechnologyChange = (techId: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  const addProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProject: z.infer<typeof projectSchema> = {
      id: crypto.randomUUID(),
      title,
      description,
      liveLink,
      codeLink,
      imageLink,
      publishedAt: new Date(),
      privateBox,
      technologies: TECHNOLOGIES.filter((tech) =>
        selectedTechnologies.includes(tech.id)
      ),
    };

    const validationResult = validateProject(newProject);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error);
      return;
    }

    try {
      await add(newProject);
      // reset skjema etter lagring
      setTitle("");
      setDescription("");
      setLiveLink("");
      setCodeLink("");
      setImageLink("");
      setPrivateBox(false);
      setSelectedTechnologies([]);
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
        <fieldset className="form-tech">
          <legend>Teknologier</legend>
          {TECHNOLOGIES.map((tech) => (
            <label key={tech.id} className="form-tech-label">
              <input
                type="checkbox"
                checked={selectedTechnologies.includes(tech.id)}
                onChange={() => handleTechnologyChange(tech.id)}
              />
              {tech.name}
            </label>
          ))}
        </fieldset>

        <label htmlFor="privateBox" className="private-box">
          <input
            type="checkbox"
            id="privateBox"
            checked={privateBox}
            onChange={() => setPrivateBox(!privateBox)}
          />
          Privat prosjekt
        </label>
        <button type="submit" className="btn">
          Lagre prosjekt
        </button>
      </form>
    </article>
  );
}
