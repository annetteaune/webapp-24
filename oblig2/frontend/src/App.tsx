import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./components/Projects";
import { ofetch } from "ofetch";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await ofetch("http://localhost:3000/projects");
      setProjects(data);
    };

    fetchProjects();
  }, []); // kjører kun en gang per nå, endre senere slik at den kjører igjen når et nytt ptosjkt legges tiL!

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
