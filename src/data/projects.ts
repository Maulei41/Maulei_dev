export interface Project {
  id: string
  i18nKey: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  github?: string
  liveUrl?: string
  image?: string
  impact: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'spendify',
    i18nKey: 'spendify',
    title: 'Spendify – Personal Finance Tracker',
    description: 'Spring Boot RESTful API with OCR receipt processing and CI/CD pipeline',
    longDescription:
      'Architected a Spring Boot RESTful API backend with layered architecture (Controller/Service/Repository) and CI/CD pipeline via GitHub Actions deploying to production on every merge to main. Implemented 7+ RESTful endpoints with JWT-based authentication and Microsoft SQL Server for secure financial data storage.',
    technologies: ['Spring Boot', 'Java', 'Microsoft SQL Server', 'JWT', 'GitHub Actions', 'Tesseract OCR'],
    github: 'https://github.com/Maulei41/Spendify',
    impact: 'OCR pipeline reduces manual expense entry time by 80% for active beta users',
    featured: true,
  },
  {
    id: 'money-detector',
    i18nKey: 'money-detector',
    title: 'Money Detector',
    description: 'On-device Android banknote denomination classifier using TensorFlow Lite',
    longDescription:
      'Built an Android banknote denomination classifier in Java using TensorFlow Lite, processing images directly on-device with no server dependency. Trained a CNN model via Teachable Machine on 500+ banknote images across 8 denomination classes, achieving 70% accuracy on variable-quality captures.',
    technologies: ['Java', 'TensorFlow Lite', 'Android', 'Teachable Machine', 'CNN'],
    github: 'https://github.com/Maulei41/Money_Detector',
    impact: '70% accuracy on variable-quality captures, outperforming naive baseline by 30pp',
    featured: true,
  },
  {
    id: 'pose-monitor',
    i18nKey: 'pose-monitor',
    title: 'Pose-Monitor',
    description: 'Real-time plank pose monitoring web app with MoveNet pose estimation',
    longDescription:
      'Led a 4-person team to build a real-time plank pose monitoring web app in Python and Streamlit with pre-trained MoveNet Lightning pose estimation. Trained a TensorFlow custom classifier on joint position data to distinguish standard plank poses from incorrect form, deployed with 80% classification accuracy and 200ms average inference latency.',
    technologies: ['Python', 'Streamlit', 'TensorFlow', 'MoveNet Lightning', 'Pose Estimation'],
    github: 'https://github.com/Maulei41/Pose-Monitor',
    impact: '80% pose classification accuracy with 200ms inference latency for real-time feedback',
    featured: true,
  },
]
