import Container from '../components/layout/Container'
import SectionLabel from '../components/ui/SectionLabel'
import ScrollReveal from '../components/ui/ScrollReveal'
import { experiences } from '../data/experience'

function TimelineDot() {
  return (
    <div
      className="absolute left-[-5px] top-[4px] w-[9px] h-[9px] rounded-full bg-white border-2"
      style={{ borderColor: '#86868b' }}
    />
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-apple bg-white">
      <Container>
        <ScrollReveal>
          <SectionLabel>Experience &amp; Education</SectionLabel>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,3.5vw,2.8rem)] lg:text-[48px] leading-[1.08] tracking-[-0.01em] lg:tracking-[-0.144px] text-[#1d1d1f]">
            My path so far
          </h2>
        </ScrollReveal>

        <div className="mt-12">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.id} delay={i}>
              <div className="relative pl-8 pb-12 last:pb-0 border-l border-[#d2d2d7]">
                <TimelineDot />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-1">
                  <span className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
                    {exp.title}
                  </span>
                  <span className="text-[0.9rem] text-[#6e6e73]">
                    {exp.organization}
                  </span>
                </div>
                <p className="font-mono text-[0.7rem] tracking-[0.03em] text-[#6e6e73] mb-3">
                  {exp.date.start} — {exp.date.end}
                </p>
                <p className="text-[0.9rem] leading-[1.6] text-[#1d1d1f] prose-width">
                  {exp.description}
                </p>
                {exp.highlights && exp.highlights.length > 0 ? (
                  <ul className="mt-3 space-y-1">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-[0.85rem] leading-[1.5] text-[#424245] flex gap-2">
                        <span className="text-[#0071e3] mt-0.5 shrink-0">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {exp.technologies && exp.technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-3 py-[4px] rounded-full text-[0.7rem] font-[500] tracking-[0.02em] leading-[1.3] border border-[#d2d2d7] text-[#6e6e73]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
