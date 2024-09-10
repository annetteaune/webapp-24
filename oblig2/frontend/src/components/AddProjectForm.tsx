export default function AddProjectForm() {
  return (
    <article className="add-form">
      <h2>Legg til nytt prosjekt</h2>
      <form id="add-project-form">
        <label htmlFor="title">Tittel</label>
        <input
          name="title"
          id="title"
          type="text"
          placeholder="Prosjekttittel"
          required
        />
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          name="description"
          id="description"
          placeholder="Kort beskrivelse"
          required
        ></textarea>
        <label htmlFor="liveLink">Live link </label>
        <input
          name="liveLink"
          id="liveLink"
          type="url"
          placeholder="Link til nettsted"
        />
        <label htmlFor="codeLink">Kodelink </label>
        <input
          name="codeLink"
          id="codeLink"
          type="url"
          placeholder="Link til kode"
        />
        <label htmlFor="imageLink">Bildelink</label>
        <input
          name="imageLink"
          id="imageLink"
          type="url"
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
