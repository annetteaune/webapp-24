import { Skill } from "../interfaces";

// bruker skills istedet for experiences

interface SkillsListProps {
  skills: Skill[];
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) =>
  skills.length === 0 ? (
    <p>Ingen ferdigheter</p>
  ) : (
    <ul className="skills-list">
      {skills.map((skill, index) => (
        <li key={index} className="skills-li">
          {skill.name}
        </li>
      ))}
    </ul>
  );
interface SkillsProps {
  skills: Skill[];
}
export default function Skills({ skills }: SkillsProps) {
  return (
    <>
      <h2 className="section-title" id="skills">
        Ferdigheter
      </h2>
      <section id="skills-wrapper">
        <SkillsList skills={skills} />
      </section>
    </>
  );
}
