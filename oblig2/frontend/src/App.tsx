import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { ofetch } from "ofetch";
import { Student } from "./interfaces";
import Contact from "./components/Contact";
import { Project } from "./types";

function App() {
  /* Hei!
  Jeg slet med å forstå oppgaveteksten og hva det var meningen vi egentlig skulle ha av funksjonalitet på siden 
  (syns det var vrient når oppgavene tilhørende modulene ikke sier spesifikt at "dette her skal du ha med i obligen", men framstod for meg
  som valgfrie øvingsoppgaver siden det ikke står noe om faktisk krevd innhold på selve obligen, bare i modulene, om det gir mening! tror jeg kanskje tenker litt for firkanta innimellom, beklager!). 
  Så jeg satte opp serverfunksjonalitet iht oppretting og sletting før jeg skjønte at vi bare skulle håndtere dette i state. Men siden jeg alt hadde gjort det, syns jeg det ble for 
  dumt å skulle ta bort funksjonalitet. Så hvis det er noe som mangler eller er overkill her, så er det rett og slett fordi jeg sleit med å skjønne oppgaveteksten. :c
  */

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await ofetch("http://localhost:3000/projects");
      setProjects(data);
    };

    fetchProjects();
  }, [projects]); // oppdateres hver gang projects endres

  //Her har jeg fått hjelp fra claude, da vi ikke har gått gjennom sletting av elementer fra server ennå.

  const handleDelete = async (id: string) => {
    try {
      const response = await ofetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
      }
    } catch (error) {
      console.error("Feil ved sletting av prosjekt", error);
    }
  };

  const student: Student = {
    name: "Annette Liv Aune",
    degree: "Bachelor i informasjonssystemer",
    points: 180,
    email: "annettla@hiof.no",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "Sass" },
      { name: "React" },
      { name: "Java" },
      { name: "MySQL" },
      { name: "Tailwind" },
      { name: "Bootstrap" },
      { name: "Python" },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <Skills skills={student.skills} />
        <Projects projects={projects} onDelete={handleDelete} />
        <Contact student={student} />
      </main>
      <Footer />
    </>
  );
}

export default App;
