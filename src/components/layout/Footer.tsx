import Container from './Container'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-7 text-center border-t border-white/[0.06]">
      <Container>
        <p className="font-mono text-[0.65rem] tracking-[0.05em] text-white/30 mx-auto">
          &copy; 2026 Li Ho Yin. Built with purpose.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="/LICENSE"
            className="font-mono text-[0.6rem] tracking-[0.05em] text-white/20 no-underline hover:text-white/50 transition-colors duration-200"
          >
            License
          </a>
        </div>
      </Container>
    </footer>
  )
}
