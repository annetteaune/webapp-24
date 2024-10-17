import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import { useProjects } from "../hooks/useProjects";
import { student } from "../config";

const FrontPage: React.FC = () => {
  //custom hook
  const { projects, handleDelete } = useProjects();

  return (
    <>
      <Skills skills={student.skills} />
      <Projects projects={projects} onDelete={handleDelete} />
      <Contact student={student} />
    </>
  );
};

export default FrontPage;
