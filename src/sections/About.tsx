import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants } from '../animations/variants'
import Container from '../components/layout/Container'
import { Code, Lightning, Brain, Database } from '@phosphor-icons/react'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.15 })
  const [hasActivated, setHasActivated] = useState(false)

  useEffect(() => {
    if (inView && !hasActivated) setHasActivated(true)
  }, [inView, hasActivated])

  const sectionState = !hasActivated ? 'hidden' : inView ? 'visible' : 'exit'
  const interestItems = [
    { icon: Database },
    { icon: Brain },
    { icon: Lightning },
    { icon: Code },
  ]

  return (
    <section id="about" className="py-16 lg:py-24 bg-bg-secondary/30">
      <Container size="lg">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={sectionState}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <span className="text-accent text-sm font-mono tracking-wide">
              {t('about.header')}
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-primary">
              {t('about.title')}
            </h2>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Philosophy */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-2xl text-text-primary mb-4">
                  {t('about.whatIBuild.title')}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {t('about.whatIBuild.content')}
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-text-primary mb-4">
                  {t('about.howIThink.title')}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {t('about.howIThink.content')}
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-text-primary mb-4">
                  {t('about.philosophy.title')}
                </h3>
                <ul className="space-y-3 text-text-secondary">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-accent mt-1">→</span>
                      <span>{t(`about.philosophy.items.${idx}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right: Interests Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {interestItems.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="group p-6 rounded-lg border border-neutral-800/50 bg-bg-primary/50 hover:border-accent/50 hover:bg-bg-primary/80 transition-all"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, color: '#00CC7A' }}
                      className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-text-secondary group-hover:text-accent transition-colors"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <h4 className="font-semibold text-text-primary mb-2">{t(`about.interests.${idx}.title`)}</h4>
                    <p className="text-sm text-text-secondary">{t(`about.interests.${idx}.description`)}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Tech Stack Highlights */}
          <motion.div variants={itemVariants} className="pt-12 border-t border-neutral-800/20">
            <h3 className="font-display font-bold text-2xl text-text-primary mb-8">
              {t('about.techStack')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'Python', 'Java', 'TypeScript', 'C++',
                'Spring Boot', 'React.js', 'Django', 'Streamlit',
                'TensorFlow', 'PyTorch', 'SQL', 'GitHub Actions',
                'REST APIs', 'CI/CD', 'Linux', 'OOP & Design Patterns',
              ].map((tech) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 204, 122, 0.1)' }}
                  className="px-4 py-3 rounded-lg bg-bg-primary border border-neutral-800/30 text-text-secondary text-sm text-center hover:text-accent transition-all"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
