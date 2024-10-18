import { FormEvent } from "react";
import { Technology } from "../types";
// oppdaterer inputfelt
export const handleInputChange =
  (setter: (value: string) => void) =>
  (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!input) return;
    setter(input.value);
  };

export const TECHNOLOGIES: Technology[] = [
  { id: "1", name: "React" },
  { id: "2", name: "Node.js" },
  { id: "3", name: "TypeScript" },
  { id: "4", name: "Java" },
  { id: "5", name: "Python" },
  { id: "6", name: "JavaScript" },
  { id: "7", name: "SQL" },
  { id: "8", name: "CSS" },
  { id: "9", name: "Tailwind" },
];
