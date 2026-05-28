import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants, timelineItemVariants } from '../animations/variants'
import Container from '../components/layout/Container'
import { experiences } from '../data/experience'
import { CheckCircle2 } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Experience() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.15 })
  const [hasActivated, setHasActivated] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (inView && !hasActivated) setHasActivated(true)
  }, [inView, hasActivated])

  const sectionState = !hasActivated ? 'hidden' : inView ? 'visible' : 'exit'
  const workExperience = experiences.filter((e) => e.type === 'work')
  const education = experiences.filter((e) => e.type === 'education')

  const TimelineItem = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => (
    <motion.div
      variants={timelineItemVariants}
      className="relative pb-12 last:pb-0"
    >
      {/* Timeline line */}
      {index !== experiences.length - 1 && (
        <div className="absolute left-0 top-12 w-0.5 h-12 bg-gradient-to-b from-accent/50 to-transparent" />
      )}

      {/* Timeline dot */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-accent bg-bg-primary"
      />

      {/* Content */}
      <div className="pl-10 sm:pl-12 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
          <h3 className="font-semibold text-lg text-text-primary">{t(`experience.data.${exp.i18nKey}.title`)}</h3>
          <span className="text-sm text-text-tertiary">
            {t(`experience.data.${exp.i18nKey}.date.start`, {defaultValue: exp.date.start})} — {t(`experience.data.${exp.i18nKey}.date.end`, {defaultValue: exp.date.end})}
          </span>
        </div>

        <p className="text-text-secondary font-semibold">{t(`experience.data.${exp.i18nKey}.organization`)}</p>
        <p className="text-text-secondary leading-relaxed">{t(`experience.data.${exp.i18nKey}.description`)}</p>

        {/* Highlights */}
        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="space-y-2 pt-2">
            {exp.highlights.map((_highlight, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="text-sm text-text-tertiary flex gap-2"
              >
                <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span>{t(`experience.data.${exp.i18nKey}.highlights.${idx}`)}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {exp.technologies && exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/30"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <section id="experience" className="py-16 lg:py-24 bg-bg-secondary/30">
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
              {t('experience.header')}
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-primary">
              {t('experience.title')}
            </h2>
          </motion.div>

          {/* Work Experience */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="font-display font-bold text-2xl text-text-primary mb-8">
                {t('experience.work')}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={sectionState}
                className="space-y-0"
              >
                {workExperience.map((exp, idx) => (
                  <TimelineItem key={exp.id} exp={exp} index={idx} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="space-y-8 pt-12 border-t border-neutral-800/20">
            <div>
              <h3 className="font-display font-bold text-2xl text-text-primary mb-8">
                {t('experience.education')}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={sectionState}
                className="space-y-0"
              >
                {education.map((exp, idx) => (
                  <TimelineItem key={exp.id} exp={exp} index={idx + workExperience.length} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12"
          >
            {[0, 1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-lg border border-neutral-800/50 bg-bg-primary/50 text-center"
              >
                <div className="text-2xl font-bold text-accent mb-1">{t(`experience.stats.${idx}.value`)}</div>
                <div className="text-sm text-text-tertiary">{t(`experience.stats.${idx}.label`)}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
