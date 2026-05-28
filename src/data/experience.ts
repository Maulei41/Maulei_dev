export interface Experience {
  id: string
  i18nKey: string
  type: 'education' | 'work'
  title: string
  organization: string
  date: {
    start: string
    end: string
  }
  description: string
  technologies?: string[]
  highlights?: string[]
}

export const experiences: Experience[] = [
  {
    id: 'portalvision-intern',
    i18nKey: 'portalvision-intern',
    type: 'work',
    title: 'Software Engineer Intern',
    organization: 'PORTALVISION Limited',
    date: {
      start: 'May 2025',
      end: 'Aug 2025',
    },
    description:
      'Built and shipped production-ready features for South Asian eHealth communities. Delivered multilingual UI/UX and full-stack backend integrations on weekly sprints.',
    technologies: ['React.js', 'Spring Boot', 'SQL', 'Jaspersoft', 'Java'],
    highlights: [
      'Built multilingual i18n module for React.js eHealth app serving South Asian communities; shipped UI/UX in 4 languages (English, Hindi, Urdu, Nepali)',
      'Developed full-stack Spring Boot backend for iSocial non-profit management system, integrating SQL database and Jaspersoft reporting to serve NGO caseworkers',
      'Owned end-to-end feature delivery across React.js frontend and Spring Boot backend; resolved client-reported bugs and shipped UX improvements on weekly sprints',
    ],
  },
  {
    id: 'hku-beng',
    i18nKey: 'hku-beng',
    type: 'education',
    title: 'Bachelor of Engineering in Computer Science',
    organization: 'The University of Hong Kong',
    date: {
      start: 'Sep 2024',
      end: 'Present',
    },
    description:
      'Final-year Computer Science student building strong foundations in algorithms, data structures, and software engineering principles.',
    technologies: ['C++', 'C', 'JavaScript', 'HTML', "R"],
    highlights: [
      'Specializing in scalable backends, React frontends, and ML model deployment',
      'Building production-grade projects with Spring Boot, React, and TensorFlow',
    ],
  },
  {
    id: 'hku-space-associate',
    i18nKey: 'hku-space-associate',
    type: 'education',
    title: 'Associate of Engineering in Computer Science',
    organization: 'HKU School of Professional and Continuing Education',
    date: {
      start: 'Sep 2022',
      end: 'Aug 2024',
    },
    description:
      'Completed associate degree with distinction, achieving strong academic performance in computer science fundamentals.',
    technologies: ['Python', 'Java', 'Android Studio', 'SQL'],
    highlights: [
      'GPA: 3.72/4.0',
      'Distinction classification',
      "Principal's Honours List (2023, 2024)",
    ],
  },
]
