import Container from '../components/layout/Container'
import SectionLabel from '../components/ui/SectionLabel'
import Card from '../components/ui/Card'
import Tag from '../components/ui/Tag'
import ScrollReveal from '../components/ui/ScrollReveal'
import { projects } from '../data/projects'
import { ArrowUpRight } from '@phosphor-icons/react/dist/icons/ArrowUpRight'

export default function Projects() {
  return (
    <section id="projects" className="section-apple bg-[#f5f5f7]">
      <Container>
        <ScrollReveal>
          <SectionLabel>Projects</SectionLabel>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,3.5vw,2.8rem)] lg:text-[48px] leading-[1.08] tracking-[-0.01em] lg:tracking-[-0.144px] text-[#1d1d1f]">
            Things I&apos;ve built
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i} stagger>
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
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[6px] mt-5 text-[14px] font-[500] text-[#0071e3] no-underline hover:text-[#0066cc] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#0071e3] focus-visible:outline-offset-2"
                  >
                    View project
                    <ArrowUpRight size={16} weight="bold" />
                  </a>
                ) : null}
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
