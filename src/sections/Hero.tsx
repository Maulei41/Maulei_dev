import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants } from '../animations/variants'
import Container from '../components/layout/Container'
import { ArrowRight } from 'lucide-react'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const codeSnippets = [
  {
    label: 'Controller.java',
    lines: [
      '@RestController',
      '@RequestMapping("/api/v1")',
      'public class FinanceController {',
      '',
      '    @PostMapping("/transactions")',
      '    public Response create(',
      '            @RequestBody Transaction tx) {',
      '        return service.process(tx);',
      '    }',
      '}',
    ],
  },
  {
    label: 'Dashboard.tsx',
    lines: [
      'function Dashboard() {',
      '  const [data, setData] = useState<Metric[]>([]);',
      '',
      '  useEffect(() => {',
      '    fetch("/api/metrics")',
      '      .then(res => res.json())',
      '      .then(setData);',
      '  }, []);',
      '',
      '  return <MetricsGrid data={data} />;',
      '}',
    ],
  },
  {
    label: 'pipeline.py',
    lines: [
      'class OCRPipeline:',
      '    def process(self, image) -> str:',
      '        gray = cv2.cvtColor(image,',
      '            cv2.COLOR_BGR2GRAY)',
      '        thresh = cv2.threshold(gray, 0, 255,',
      '            cv2.THRESH_BINARY | OTSU)[1]',
      '        return pytesseract.',
      '            image_to_string(thresh)',
    ],
  },
]

function CodeWindow() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [visibleLines, setVisibleLines] = useState<number>(0)

  const snippet = codeSnippets[activeIndex]

  // Reveal lines one by one
  useEffect(() => {
    setVisibleLines(0)
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= snippet.lines.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 60)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(timer)
  }, [activeIndex, snippet.lines.length])

  // Cycle snippets on hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  const handleClick = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
  }, [])

  // Auto-cycle every few seconds, pause on hover
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div
      className="relative h-full cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl" />

      {/* Code window */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="absolute inset-0 m-4 rounded-xl border border-neutral-800/60 bg-bg-primary/60 backdrop-blur-sm overflow-hidden"
      >
        {/* Window header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800/60 bg-neutral-900/40">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          {/* File tab */}
          <motion.div
            key={snippet.label}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-4 px-3 py-1 rounded-md bg-accent/10 text-accent text-xs font-mono"
          >
            {snippet.label}
          </motion.div>
        </div>

        {/* Code content */}
        <div className="p-4 font-mono text-sm leading-relaxed">
          <div className="flex">
            {/* Line numbers */}
            <div className="select-none pr-4 text-right text-neutral-600 text-xs leading-relaxed">
              {snippet.lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Code with reveal */}
            <div className="text-xs leading-relaxed">
              {snippet.lines.map((line, i) => (
                <motion.div
                  key={`${activeIndex}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={
                    i < visibleLines
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -8 }
                  }
                  transition={{ duration: 0.2 }}
                  className="whitespace-pre"
                >
                  {i < visibleLines ? (
                    <SyntaxHighlight line={line} />
                  ) : (
                    <span className="opacity-0">{line}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-3 right-4"
        >
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            className="text-[10px] text-text-tertiary font-mono tracking-wider uppercase"
          >
            {isHovered ? t('codeWindow.clickHint') : t('codeWindow.hoverHint')}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function SyntaxHighlight({ line }: { line: string }) {
  // Tokenize line with simple regex matching
  const tokenPatterns: [RegExp, string][] = [
    [/(\/\/.*$|#.*$)/, 'text-emerald-500'],        // comments first
    [/("[^"]*"|'[^']*'|`[^`]*`)/, 'text-amber-300'], // strings
    [/(@\w+)/, 'text-blue-400'],                     // annotations
    [/\b(public|private|class|function|return|const|let|var|import|from|useEffect|useState|def|if|else|async|await|interface|extends|implements|new)\b/, 'text-purple-300'], // keywords
    [/\b\d+\b/, 'text-orange-300'],                   // numbers
    [/\b[A-Z]\w*\b/, 'text-yellow-200'],              // types/classes
  ]

  const tokens: { text: string; className: string }[] = []
  let remaining = line

  while (remaining.length > 0) {
    let matched = false
    for (const [pattern, className] of tokenPatterns) {
      const match = remaining.match(pattern)
      if (match && match.index === 0) {
        tokens.push({ text: match[0], className })
        remaining = remaining.slice(match[0].length)
        matched = true
        break
      }
    }
    if (!matched) {
      // Consume one character as plain text
      const next = remaining[0]
      tokens.push({ text: next, className: 'text-gray-300' })
      remaining = remaining.slice(1)
    }
  }

  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={token.className}>{token.text}</span>
      ))}
    </>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.15 })
  const [hasActivated, setHasActivated] = useState(false)

  useEffect(() => {
    if (inView && !hasActivated) setHasActivated(true)
  }, [inView, hasActivated])

  const sectionState = !hasActivated ? 'hidden' : inView ? 'visible' : 'exit'

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-20">
      <Container size="lg" className="w-full">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={sectionState}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: Content */}
          <motion.div className="space-y-8">
            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="inline-block"
              >
                <span className="text-accent text-sm font-mono tracking-widest uppercase">
                  {t('hero.welcome')}
                </span>
              </motion.div>

              <h1 className="font-display font-bold text-5xl lg:text-7xl leading-tight text-text-primary">
                <motion.span variants={itemVariants} className="block">
                  {t('hero.headline1')}
                </motion.span>
                <motion.span variants={itemVariants} className="block">
                  {t('hero.headline2')}
                </motion.span>
                <motion.span variants={itemVariants} className="block text-transparent bg-gradient-to-r from-accent to-accent-light bg-clip-text">
                  {t('hero.headline3')}
                </motion.span>
              </h1>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary leading-relaxed max-w-lg"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(0, 255, 149, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent text-bg-primary font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-accent-light transition-colors"
              >
                {t('hero.viewProjects')}
                <ArrowRight size={20} />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 149, 0.5)', boxShadow: '0 0 16px rgba(0, 255, 149, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-neutral-700 text-text-primary font-semibold rounded-lg flex items-center justify-center gap-2 hover:border-accent transition-all"
              >
                {t('hero.getInTouch')}
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 sm:gap-8 pt-8 border-t border-neutral-800/30"
            >
              {[
                { key: 'projects' },
                { key: 'experience' },
                { key: 'technologies' },
              ].map((stat) => (
                <div key={stat.key}>
                  <div className="text-2xl font-bold text-accent">{t(`hero.stats.${stat.key}.value`)}</div>
                  <div className="text-sm text-text-tertiary">{t(`hero.stats.${stat.key}.label`)}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Interactive Code Window */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 lg:h-[500px] hidden lg:block"
          >
            <CodeWindow />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
