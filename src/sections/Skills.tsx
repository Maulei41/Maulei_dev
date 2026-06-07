import Container from '../components/layout/Container'
import SectionLabel from '../components/ui/SectionLabel'
import Tag from '../components/ui/Tag'
import ScrollReveal from '../components/ui/ScrollReveal'
import { skills } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="section-apple bg-white">
      <Container>
        <ScrollReveal className="text-center">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,3.5vw,2.8rem)] lg:text-[48px] leading-[1.08] tracking-[-0.01em] lg:tracking-[-0.144px] text-[#1d1d1f]">
            Tech stack
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-2 justify-center mt-9">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill} delay={i}>
              <Tag>{skill}</Tag>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
