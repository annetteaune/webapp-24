import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

import { student } from "../config";
import { useProjects } from "../features/projects/hooks/useProjects";

const FrontPage: React.FC = () => {
  //custom hook
  const {
    data: projects,
    remove: handleDelete,
    //add: handleAdd,
    //update: handleUpdate,
    //status,
    //error,
  } = useProjects();

  return (
    <>
      <Skills skills={student.skills} />
      <Projects projects={projects} onDelete={handleDelete} />
      <Contact student={student} />
    </>
  );
};

export default FrontPage;
