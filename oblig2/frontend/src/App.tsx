import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { Student } from "./interfaces";
import Contact from "./components/Contact";
import { useProjects } from "./hooks/useProjects";

function App() {
  //custom hook
  const { projects, handleDelete } = useProjects();

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
