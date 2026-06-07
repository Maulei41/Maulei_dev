import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants } from '../animations/variants'
import Container from '../components/layout/Container'
import { contact } from '../data/contact'
import { GithubLogo, LinkedinLogo, Envelope, DownloadSimple } from '@phosphor-icons/react'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.15 })
  const [hasActivated, setHasActivated] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (inView && !hasActivated) setHasActivated(true)
  }, [inView, hasActivated])

  const sectionState = !hasActivated ? 'hidden' : inView ? 'visible' : 'exit'
  const socialLinks = [
    {
      name: t('contact.social.github'),
      socialKey: 'github',
      url: contact.github,
      icon: GithubLogo,
      label: 'github.com/hoyin99999',
    },
    {
      name: t('contact.social.linkedin'),
      socialKey: 'linkedin',
      url: contact.linkedin,
      icon: LinkedinLogo,
      label: 'linkedin.com/in/ho-yin-li-527156336/',
    },
    {
      name: t('contact.social.email'),
      socialKey: 'email',
      url: `mailto:${contact.email}`,
      icon: Envelope,
      label: contact.email,
    },
  ]

  return (
    <section id="contact" className="py-16 lg:py-24">
      <Container size="md">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={sectionState}
          className="space-y-12 text-center"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <span className="text-accent text-sm font-mono tracking-wide">
              {t('contact.header')}
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-primary">
              {t('contact.title')}
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              {t('contact.description')}
            </p>
          </motion.div>

          {/* Main CTA */}
          <motion.div variants={itemVariants} className="space-y-6 py-12">
            <motion.a
              href={`mailto:${contact.email}`}
              whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(0, 204, 122, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 bg-accent text-bg-primary font-semibold rounded-lg text-lg hover:bg-accent-light transition-colors"
            >
              <Envelope size={24} />
              {t('contact.cta')}
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-text-secondary">
              <p className="mb-6">{t('contact.orConnect')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="px-6 py-3 rounded-lg border border-neutral-800/50 bg-bg-primary/50 hover:border-accent/50 hover:bg-bg-primary/80 transition-all flex items-center justify-center gap-2 group"
                    >
                      <Icon size={20} className="group-hover:text-accent transition-colors" />
                      <span className="hidden sm:inline text-sm group-hover:text-accent transition-colors">
                        {social.name}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Resume */}
          <motion.div variants={itemVariants} className="pt-8 border-t border-neutral-800/20">
            <p className="text-text-secondary mb-6">
              {t('contact.resume.title')}
            </p>
            <motion.a
              href={contact.resume}
              download
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(0, 204, 122, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 border border-neutral-700 text-text-primary hover:border-accent hover:text-accent font-semibold rounded-lg transition-all"
            >
              <DownloadSimple size={20} />
              {t('contact.resume.cta')}
            </motion.a>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            variants={itemVariants}
            className="pt-12 text-text-tertiary text-sm"
          >
            <p>
              {t('contact.footer')}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
