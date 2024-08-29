import { z } from "zod";
import { ProjectArraySchema, type Project } from "../types";

/* Har i STOR grad fulgt eksempelet gitt i spa-ts-repoet. Server er helt nytt for meg, så håper det er OK å lene seg på
  tilgjengeliggjorte løsninger i starten! :) Har fokusert på å skjønne hvordan og hvorfor ting funker, og hvor jeg må
  endre på ting for å få det til å funke slik jeg vil det skal funke.*/

const form = document.getElementById("add-project-form") as HTMLFormElement;
const contentWrapper = document.getElementById(
  "content-wrapper"
) as HTMLElement;

// let for å kunne legge til fra json
let projects: Project[] = [];

// Lese input fra skjema
form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const newProject = {
    id: crypto.randomUUID(),
    title: (
      (event.target as HTMLFormElement).elements.namedItem(
        "title"
      ) as HTMLInputElement
    )?.value,
    description: (
      (event.target as HTMLFormElement).elements.namedItem(
        "description"
      ) as HTMLInputElement
    )?.value,
    image: (
      (event.target as HTMLFormElement).elements.namedItem(
        "imageLink"
      ) as HTMLInputElement
    )?.value,
    liveLink: (
      (event.target as HTMLFormElement).elements.namedItem(
        "liveLink"
      ) as HTMLInputElement
    )?.value,
    codeLink: (
      (event.target as HTMLFormElement).elements.namedItem(
        "codeLink"
      ) as HTMLInputElement
    )?.value,
  };

  projects.push(newProject);
  updateProjectsList();

  try {
    const response = await fetch("http://localhost:3999/new-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (response.status === 201) {
      // Legger til statiske json-prosjekter
      const updatedProjects = await response.json();
      projects = updatedProjects;
      updateProjectsList();
      console.log("Prosjekt lagret på serveren");
    } else {
      console.error("Feil ved lagring av prosjekt på serveren");
    }
  } catch (error) {
    console.error("Feil ved sending av data til serveren:", error);
  }
});

function createProjectCard(project: Project): string {
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

function updateProjectsList() {
  console.log("Updating projects list:", projects);

  // Fjern eksisterende kort
  const existingCards = contentWrapper.querySelectorAll(".project-card");
  existingCards.forEach((card) => card.remove());

  // Opprett nye kort
  for (const project of projects) {
    const projectHTML = createProjectCard(project);
    contentWrapper.insertAdjacentHTML("beforeend", projectHTML);
  }
  // Tømme skjema
  form.reset();
}

function loadFromApi() {
  fetch("http://localhost:3999")
    .then((response) => response.json())
    .then((data: unknown) => {
      try {
        const validatedProjects = ProjectArraySchema.parse(data);
        projects = validatedProjects;
        updateProjectsList();
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Ugyldig data mottatt fra serveren:", error.errors);
        } else {
          console.error("Uventet feil ved validering av data:", error);
        }
      }
    })
    .catch((error: Error) => {
      console.error("Feil ved henting av data fra serveren:", error);
    });
}

loadFromApi();
