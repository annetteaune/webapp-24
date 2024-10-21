import { Student } from "./interfaces";

export const student: Student = {
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

// URLs
export const PROJECTS = "http://localhost:3000/v1/projects";
export const TECH = "http://localhost:3000/v1/technologies";

const baseUrl = import.meta.env.baseUrl ?? "http://localhost:3000";
const endpointsV1 = {
  projects: `${baseUrl}/v1/projects`,
  tech: `${baseUrl}/v1/technologies`,
};

export { baseUrl, endpointsV1 as endpoints };
