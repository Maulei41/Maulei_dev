import Container from '../components/layout/Container'
import Button from '../components/ui/Button'
import ScrollReveal from '../components/ui/ScrollReveal'
import { ArrowRight } from '@phosphor-icons/react/dist/icons/ArrowRight'
import { Download } from '@phosphor-icons/react/dist/icons/Download'
import { contact } from '../data/contact'

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex items-center justify-center text-center bg-[#0a0a0a] text-white px-0 pt-20 pb-[120px]"
    >
      <Container>
        <div className="max-w-[720px] mx-auto">
          {/* Logo */}
          <ScrollReveal className="mb-6">
            <div className="flex justify-center">
              <img
                src="/Maulei_logo.png"
                alt="Li Ho Yin logo"
                className="h-14 w-auto rounded-xl"
              />
            </div>
          </ScrollReveal>

          {/* Overline */}
          <ScrollReveal className="mb-3">
            <p className="font-mono text-[0.8rem] tracking-[0.08em] uppercase text-white/50">
              Software Engineer
            </p>
          </ScrollReveal>

          {/* Name */}
          <ScrollReveal delay={1}>
            <h1 className="text-white font-display font-semibold leading-[1.05] tracking-[-0.02em] 
              text-[clamp(2.5rem,6.5vw,3.5rem)] lg:text-[56px] lg:tracking-[-0.28px]">
              Li Ho Yin
            </h1>
          </ScrollReveal>

          {/* Subtext */}
          <ScrollReveal delay={2}>
            <p className="mt-5 text-[1rem] leading-[1.6] text-white/60 max-w-[600px] mx-auto">
              A CS student at HKU who builds full-stack systems for real people —
              from multilingual eHealth platforms serving South Asian communities
              to OCR pipelines processing thousands of receipts weekly.
            </p>
          </ScrollReveal>

          {/* Actions */}
          <ScrollReveal delay={3}>
            <div className="flex flex-wrap gap-3 justify-center mt-9">
              <Button
                variant="pill"
                size="md"
                href="#projects"
                icon={ArrowRight}
                iconPosition="right"
              >
                View my work
              </Button>
              <Button
                variant="secondary"
                size="md"
                href="#contact"
                className="!text-white !border-white/20 hover:!bg-white/10 hover:!border-white/50"
              >
                Get in touch
              </Button>
              <Button
                variant="secondary"
                size="md"
                href={contact.resume}
                download
                icon={Download}
                iconPosition="left"
                className="!text-white !border-white/20 hover:!bg-white/10 hover:!border-white/50"
              >
                Resume
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
