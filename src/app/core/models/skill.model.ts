export interface SkillItem {
  name: string;
  level?: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: string[];
}
