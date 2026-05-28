import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants, cardHoverVariants } from '../animations/variants'
import Container from '../components/layout/Container'
import { projects } from '../data/projects'
import { ExternalLink, Code2 as GithubIcon } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Projects() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.15 })
  const [hasActivated, setHasActivated] = useState(false)

  useEffect(() => {
    if (inView && !hasActivated) setHasActivated(true)
  }, [inView, hasActivated])

  const sectionState = !hasActivated ? 'hidden' : inView ? 'visible' : 'exit'
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-16 lg:py-24">
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
            <span className="text-accent text-sm font-mono tracking-widest uppercase">
              {t('projects.header')}
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-primary">
              {t('projects.title')}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl">
              {t('projects.description')}
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="space-y-6">
            {projects
              .filter((p) => p.featured)
              .map((project, idx) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="group"
                >
                  <motion.div
                    variants={cardHoverVariants}
                    className="p-6 lg:p-8 rounded-xl border border-neutral-800/50 bg-bg-primary/30 hover:border-accent/50 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-display font-bold text-2xl text-text-primary mb-2">
                            {t(`projects.data.${project.i18nKey}.title`)}
                          </h3>
                          <p className="text-text-secondary">{t(`projects.data.${project.i18nKey}.description`)}</p>
                        </div>

                        <p className="text-text-tertiary text-sm leading-relaxed">
                          {t(`projects.data.${project.i18nKey}.longDescription`)}
                        </p>

                        {/* Impact */}
                        <div className="pt-4 border-t border-neutral-800/30">
                          <p className="text-sm text-accent font-semibold">
                            {t(`projects.data.${project.i18nKey}.impact`)}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 pt-4">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-4 pt-6">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, x: 4 }}
                              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
                            >
                              <GithubIcon size={18} />
                              <span>{t('projects.github')}</span>
                            </motion.a>
                          )}
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, x: 4 }}
                              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
                            >
                              <ExternalLink size={18} />
                              <span>{t('projects.liveDemo')}</span>
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Visual Indicator */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-full lg:w-48 h-48 rounded-lg bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 flex items-center justify-center flex-shrink-0"
                      >
                        <div className="text-center">
                          <div className="text-accent text-4xl font-bold mb-2">
                            {idx + 1}
                          </div>
                          <p className="text-text-tertiary text-xs">{t('projects.featuredLabel')}</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
          </div>

          {/* Other Projects Grid */}
          {otherProjects.length > 0 && (
          <motion.div variants={itemVariants} className="pt-12">
            <h3 className="font-display font-bold text-2xl text-text-primary mb-8">
              {t('projects.otherProjects')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    variants={cardHoverVariants}
                    className="p-6 rounded-lg border border-neutral-800/50 bg-bg-primary/30 hover:border-accent/50 transition-all group"
                  >
                    <h4 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm text-text-secondary mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-text-tertiary">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-accent mb-4">{project.impact}</p>

                    <div className="flex gap-3">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="text-text-tertiary hover:text-accent transition-colors"
                        >
                          <GithubIcon size={16} />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="text-text-tertiary hover:text-accent transition-colors"
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
