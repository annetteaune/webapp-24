import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./components/Projects";
import { ofetch } from "ofetch";

function App() {
  /* 
  Jeg har bare kopiert inn css og struktur fra oblig 1, da jeg har forstått oppgaven som å gjøre akkurat 
  det samme som i 1, men med react. 
  */

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await ofetch("http://localhost:3000/projects");
      setProjects(data);
    };

    fetchProjects();
  }, [projects]); // oppdateres hver gang projects endres

  return (
    <>
      <Header />
      <main>
        <Projects projects={projects} />
      </main>
      <Footer />
    </>
  );
}

export default App;
