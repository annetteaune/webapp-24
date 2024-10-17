import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { useProjects } from "./hooks/useProjects";
import { student } from "./config";

function App() {
  //custom hook
  const { projects, handleDelete } = useProjects();

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
