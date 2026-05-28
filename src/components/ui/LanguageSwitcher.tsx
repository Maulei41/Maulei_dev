import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'zh-HK', label: '繁' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleSwitch = (code: string) => {
    i18n.changeLanguage(code)
  }

  return (
    <div className="flex items-center gap-1 ml-2 pl-2 border-l border-neutral-700/50">
      {languages.map((lang) => {
        const isActive = i18n.language === lang.code
        return (
          <motion.button
            key={lang.code}
            onClick={() => handleSwitch(lang.code)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-2 py-1 text-xs font-mono rounded-md transition-colors ${
              isActive
                ? 'text-accent bg-accent/10'
                : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            {lang.label}
          </motion.button>
        )
      })}
    </div>
  )
}
