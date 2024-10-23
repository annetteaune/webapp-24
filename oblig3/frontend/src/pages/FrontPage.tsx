import React from "react";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import { student } from "../config";
import { useProjects } from "../features/projects/hooks/useProjects";

const FrontPage: React.FC = () => {
  const { data: projects, remove: handleDelete } = useProjects();

  return (
    <>
      <Skills skills={student.skills} />
      <Projects projects={projects} onDelete={handleDelete} />
      <Contact student={student} />
    </>
  );
};

export default FrontPage;
