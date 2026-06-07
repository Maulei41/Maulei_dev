import Container from '../components/layout/Container'
import SectionLabel from '../components/ui/SectionLabel'
import ScrollReveal from '../components/ui/ScrollReveal'
import { contact } from '../data/contact'
import { Envelope } from '@phosphor-icons/react/dist/icons/Envelope'
import { GithubLogo } from '@phosphor-icons/react/dist/icons/GithubLogo'
import { LinkedinLogo } from '@phosphor-icons/react/dist/icons/LinkedinLogo'

const links = [
  { label: 'Email', icon: Envelope, href: `mailto:${contact.email}` },
  { label: 'GitHub', icon: GithubLogo, href: contact.github || '#' },
  { label: 'LinkedIn', icon: LinkedinLogo, href: contact.linkedin || '#' },
]

export default function Contact() {
  return (
    <section id="contact" className="section-apple bg-[#0a0a0a] text-center">
      <Container>
        <ScrollReveal>
          <div className="max-w-[600px] mx-auto">
            <SectionLabel dark>Contact</SectionLabel>
            <h2 className="font-display font-semibold text-[clamp(1.8rem,3.5vw,2.8rem)] lg:text-[48px] leading-[1.08] tracking-[-0.01em] lg:tracking-[-0.144px] text-white">
              Let&apos;s connect
            </h2>
            <p className="mt-3 text-white/60 leading-[1.6]">
              I&apos;m always open to new opportunities, interesting projects, or just a
              chat about technology and design. Drop me a message — I&apos;ll get back to you.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-[500] text-white no--decoration bg-transparent border border-white/20 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                >
                  <Icon size={18} weight="bold" />
                  {link.label}
                </a>
              )
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
