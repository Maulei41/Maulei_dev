import { motion } from 'framer-motion'
import { GithubLogo, LinkedinLogo, Envelope, ArrowSquareOut } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      socialKey: 'github',
      url: 'https://github.com/hoyin99999',
      icon: GithubLogo,
    },
    {
      name: 'LinkedIn',
      socialKey: 'linkedin',
      url: 'https://www.linkedin.com/in/ho-yin-li-527156336/',
      icon: LinkedinLogo,
    },
    {
      name: 'Email',
      socialKey: 'email',
      url: 'mailto:hoyin99999@gmail.com',
      icon: Envelope,
    },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="border-t border-neutral-800/20 bg-bg-primary/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-2xl text-text-primary mb-2">{t('footer.brand')}</h3>
            <p className="text-text-secondary text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('footer.links.about'), href: '#about' },
                { label: t('footer.links.projects'), href: '#projects' },
                { label: t('footer.links.experience'), href: '#experience' },
                { label: t('footer.links.resume'), href: '/LiHoYin_resume.pdf' },
              ].map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-text-secondary hover:text-accent transition-colors text-sm flex items-center gap-1"
                  >
                    {link.label}
                    {link.href.startsWith('/') && <ArrowSquareOut size={12} />}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">{t('footer.connect')}</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, color: '#00CC7A' }}
                    whileTap={{ scale: 0.95 }}
                    className="text-text-secondary hover:text-accent transition-colors"
                    title={t(`contact.social.${social.socialKey}`)}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800/20 pt-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-tertiary">
          <p>&copy; {currentYear} {t('footer.brand')}. {t('footer.copyright')}</p>
          <p>
            {t('footer.crafted')}
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
