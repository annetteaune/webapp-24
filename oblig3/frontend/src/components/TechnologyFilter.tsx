import { Technology } from "../features/technologies/helpers/schema";

interface TechnologyFilterProps {
  technologies: Technology[];
  selectedTech: string;
  onTechChange: (techId: string) => void;
}

export default function TechnologyFilter({
  technologies,
  selectedTech,
  onTechChange,
}: TechnologyFilterProps) {
  return (
    <div className="tech-filter">
      <label htmlFor="tech-select">Filtrer på teknologi:</label>
      <select
        id="tech-select"
        value={selectedTech}
        onChange={(e) => onTechChange(e.target.value)}
        className="tech-select"
      >
        <option value="">Se alle</option>
        {technologies.map((tech) => (
          <option key={tech.id} value={tech.id}>
            {tech.name}
          </option>
        ))}
      </select>
    </div>
  );
}
