export interface Project {
  id?: string;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  category?: 'backend' | 'frontend' | 'fullstack' | 'qa';
}
