import projects from "../data/projects.json";

// Opprette prosjektkort
function createProjectCard(project: {
  id: number;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  codeLink: string;
}) {
  return `
        <article class="project-card">
            <section class="img-wrapper">
                <img src="${project.image}" alt="${project.title}" />
            </section>
            <section class="title-wrapper">
                <h2>${project.title}</h2>
                <section class="project-links">
                    <a href="${project.liveLink}"><i class="fa-solid fa-globe"></i></a>
                    <a href="${project.codeLink}"><i class="fa-solid fa-code"></i></a>
                </section>
            </section>
            <section class="desc-wrapper">
                <p>${project.description}</p>
                <button class="more-btn btn">Les mer</button>
            </section>
        </article>
    `;
}

//legge til prosjektkort i tillegg til eksisterende html
function showProjects() {
  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.innerHTML += projects.map(createProjectCard).join("");
  }
}

// Håndtere skjema
function addNewProject(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const newProject = {
    id: projects.length + 1,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image: formData.get("imageLink") as string,
    liveLink: formData.get("liveLink") as string,
    codeLink: formData.get("codeLink") as string,
  };

  projects.push(newProject);

  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.innerHTML += createProjectCard(newProject);
  }

  form.reset();
}

// Initialisere siden
function init() {
  showProjects();

  // Lytt etter knappetykk
  const form = document.getElementById("add-project-form");
  if (form) {
    form.addEventListener("submit", addNewProject);
  }
}

init();
