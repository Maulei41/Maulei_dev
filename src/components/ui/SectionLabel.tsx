import React from 'react'

export interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
}

function SectionLabel({ children, className = '', dark = false }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-[0.75rem] font-[500] tracking-[0.05em] uppercase mb-3 ${
        dark ? 'text-white/50' : 'text-[#6e6e73]'
      } ${className}`}
    >
      {children}
    </p>
  )
}

export default React.memo(SectionLabel)
