import { useRef, useState, useEffect } from 'react'
import Container from '../components/layout/Container'
import SectionLabel from '../components/ui/SectionLabel'
import Card from '../components/ui/Card'
import Tag from '../components/ui/Tag'
import ScrollReveal from '../components/ui/ScrollReveal'
import { projects } from '../data/projects'
import { ArrowUpRight } from '@phosphor-icons/react/dist/icons/ArrowUpRight'
import { Pause } from '@phosphor-icons/react/dist/icons/Pause'
import { Play } from '@phosphor-icons/react/dist/icons/Play'

const AUTO_ADVANCE_MS = 4000

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)


  // Mutable refs so the animation tick always reads current values
  const activeIndexRef = useRef(activeIndex)
  const isPausedRef = useRef(isPaused)
  const progressRef = useRef(0)
  const lastTickRef = useRef(0)
  const advancingRef = useRef(false)
  activeIndexRef.current = activeIndex
  isPausedRef.current = isPaused

  // Detect manual scroll → update active index & reset progress
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      // Ignore intermediate scroll events during programmatic auto-advance
      if (advancingRef.current) return

      // Find the card closest to viewport center
      const viewCenter = el.scrollLeft + el.clientWidth / 2
      let closest = 0
      let minDist = Infinity
      for (let i = 0; i < el.children.length; i++) {
        const child = el.children[i] as HTMLElement
        const cardCenter = child.offsetLeft + child.offsetWidth / 2
        const dist = Math.abs(cardCenter - viewCenter)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      }
      const clamped = Math.min(closest, projects.length - 1)
      if (clamped !== activeIndexRef.current) {
        activeIndexRef.current = clamped
        setActiveIndex(clamped)
        progressRef.current = 0
        setProgress(0)
      }
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // requestAnimationFrame loop for smooth auto-advance progress
  useEffect(() => {
    let rafId: number

    const tick = (now: number) => {
      if (lastTickRef.current > 0 && !isPausedRef.current) {
        const delta = Math.min(now - lastTickRef.current, AUTO_ADVANCE_MS)
        progressRef.current += delta / AUTO_ADVANCE_MS

        if (progressRef.current >= 1 && !advancingRef.current) {
          advancingRef.current = true
          const nextIdx = (activeIndexRef.current + 1) % projects.length
          const el = scrollRef.current
          if (el) scrollCardIntoView(el, nextIdx)
          activeIndexRef.current = nextIdx
          setActiveIndex(nextIdx)
          progressRef.current = 0
          setProgress(0)
          setTimeout(() => { advancingRef.current = false }, 600)
        } else {
          setProgress(progressRef.current)
        }
      }

      lastTickRef.current = now
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const scrollCardIntoView = (el: HTMLDivElement, index: number) => {
    const card = el.children[index] as HTMLElement | undefined
    if (!card) return
    const targetScroll = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
    el.scrollTo({ left: targetScroll, behavior: 'smooth' })
  }

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    scrollCardIntoView(el, index)
  }

  const togglePause = () => setIsPaused((p) => !p)

  return (
    <section id="projects" className="section-apple bg-[#f5f5f7]">
      <Container>
        <ScrollReveal>
          <SectionLabel>Projects</SectionLabel>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,3.5vw,2.8rem)] lg:text-[48px] leading-[1.08] tracking-[-0.01em] lg:tracking-[-0.144px] text-[#1d1d1f]">
            Things I&apos;ve built
          </h2>
        </ScrollReveal>

        <div className="mt-12">
          {/* Carousel track */}
          <div
            ref={scrollRef}
            className="hide-scrollbar flex overflow-x-auto gap-5 pb-4 pl-[calc(50%_-_42.5vw)] pr-[calc(50%_-_42.5vw)] sm:pl-[calc(50%_-_170px)] sm:pr-[calc(50%_-_170px)] md:pl-[calc(50%_-_190px)] md:pr-[calc(50%_-_190px)] lg:pl-[calc(50%_-_210px)] lg:pr-[calc(50%_-_210px)]"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[420px]"
                style={{ scrollSnapAlign: 'center' }}
              >
                <Card hoverable className="flex flex-col h-full">
                  <h3 className="font-body text-[1rem] lg:text-[17px] font-semibold leading-[1.24] tracking-[-0.02em] lg:tracking-[-0.374px] text-[#1d1d1f] mb-1">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[0.7rem] tracking-[0.02em] text-[#6e6e73] mb-4">
                    {project.description}
                  </p>
                  <p className="text-[0.9rem] leading-[1.6] text-[#1d1d1f] flex-1">
                    {project.longDescription.length > 150
                      ? project.longDescription.slice(0, 150) + '…'
                      : project.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-[6px] mt-5">
                    {project.technologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div>
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-[6px] text-[14px] font-[500] text-[#0071e3] no-underline hover:text-[#0066cc] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#0071e3] focus-visible:outline-offset-2"
                        >
                          View project
                          <ArrowUpRight size={16} weight="bold" />
                        </a>
                      ) : null}
                    </div>
                    <div>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-[6px] text-[14px] font-[500] text-[#0071e3] no-underline hover:text-[#0066cc] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#0071e3] focus-visible:outline-offset-2"
                        >
                          Live
                          <ArrowUpRight size={16} weight="bold" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

        </div>

        {/* Apple Progressive Page Indicator – dark frosted glass */}
        <div className="flex justify-center mt-6">
          <div className="glass-pill-dark inline-flex items-center gap-2.5 px-4 py-2.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className="cursor-pointer"
                aria-label={`Go to project ${i + 1}`}
              >
                {i === activeIndex ? (
                  /* Active: capsule with animated progress fill */
                  <div className="relative w-[48px] h-[8px] rounded-full overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-white/35" />
                    <div
                      className="absolute inset-0 rounded-full bg-white origin-left will-change-transform"
                      style={{ transform: `scaleX(${progress})` }}
                    />
                  </div>
                ) : (
                  /* Inactive (dim) or visited (brighter) circular dot */
                  <div
                    className="rounded-full transition-colors duration-500"
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor:
                        i < activeIndex
                          ? 'rgba(255,255,255,0.7)'   // visited
                          : 'rgba(255,255,255,0.35)',  // upcoming
                    }}
                  />
                )}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1" />

            {/* Pause / Play – circular frosted glass button */}
            <button
              onClick={togglePause}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer"
              aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            >
              {isPaused ? <Play size={14} weight="fill" /> : <Pause size={14} weight="fill" />}
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
