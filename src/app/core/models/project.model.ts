export interface Project {
  id?: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  github: string;
  demo?: string;
  image?: string;
  screenshots?: string[];
  featured?: boolean;
  category?: 'backend' | 'frontend' | 'fullstack' | 'qa';
}
