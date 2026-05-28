export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  link?: string
}

export interface TimelineItem {
  id: string
  role: string
  company: string
  date: string
  description: string
}

export interface SkillCategory {
  title: string
  tag: string
  skills: string[]
  accent: 'green' | 'blue' | 'purple' | 'amber'
}
