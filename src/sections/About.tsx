import Container from '../components/layout/Container'
import SectionLabel from '../components/ui/SectionLabel'
import ScrollReveal from '../components/ui/ScrollReveal'

export default function About() {
  return (
    <section id="about" className="section-apple bg-[#f5f5f7]">
      <Container>
        <ScrollReveal>
          <SectionLabel>About</SectionLabel>
          <h2 className="font-display font-semibold text-[clamp(1.8rem,3.5vw,2.8rem)] lg:text-[48px] leading-[1.08] tracking-[-0.01em] lg:tracking-[-0.144px] text-[#1d1d1f]">
            Who I am
          </h2>
        </ScrollReveal>

        <div className="max-w-[760px] mx-auto mt-12">
          <ScrollReveal delay={1}>
            <div className="space-y-5 text-[0.9rem] leading-[1.6] text-[#424245] prose-width">
              <p>
                I&apos;m a final-year Computer Science student at the University of Hong Kong,
                specializing in scalable backends, modern frontends, and practical ML deployment.
                I care about building software that actually serves people — not just code that compiles.
              </p>
              <p>
                At PORTALVISION, I shipped a multilingual i18n module serving South Asian eHealth
                communities in 4 languages and built full-stack Spring Boot systems for NGO caseworkers.
                I also designed an OCR receipt pipeline with Tesseract that cut manual entry time by 80%.
                I believe in clean architecture, CI/CD discipline, and technology that bridges real gaps.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
