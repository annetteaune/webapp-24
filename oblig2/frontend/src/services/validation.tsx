interface Project {
  title: string;
  description: string;
  liveLink?: string;
  codeLink?: string;
  imageLink: string;
}

export const validateProject = (project: Project) => {
  const { title, description, imageLink } = project;
  if (!title || !description || !imageLink) {
    return false;
  }
  return true;
};

export const validateDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};
