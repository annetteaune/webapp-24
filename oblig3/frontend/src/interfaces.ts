//separat fil for lettere gjenbruk av interfaces

export interface Skill {
  name: string;
}

export interface Student {
  name: string;
  degree: string;
  points: number;
  email: string;
  skills: Skill[];
}
