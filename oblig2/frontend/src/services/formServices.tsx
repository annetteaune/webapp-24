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
  { id: "42ee207f-2c4e-4bec-b172-322ec494afd1", name: "React" },
  { id: "42ee207f-2c4e-2bec-b172-322ec494afd1", name: "Node.js" },
  { id: "42ee203f-2c4e-2bec-b172-322ec494afd1", name: "TypeScript" },
  { id: "42ee207f-2c8e-2bec-b172-322ec494afd1", name: "Java" },
  { id: "42ee205f-2c4e-2bec-b172-322ec494afd1", name: "Python" },
  { id: "42ee207f-2c4e-6bec-b172-322ec494afd1", name: "JavaScript" },
  { id: "42ee207f-2c4e-2bec-b172-342ec494afd1", name: "SQL" },
  { id: "42ee507f-2c4e-2bec-b172-322ec494afd1", name: "CSS" },
  { id: "42ee607f-2c4e-2bec-b172-322ec494afd1", name: "Tailwind" },
];
