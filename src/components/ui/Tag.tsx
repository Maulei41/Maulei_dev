import React from 'react'

export interface TagProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'dark'
}

function Tag({ children, className = '', variant = 'default' }: TagProps) {
  const base =
    'inline-block px-3 py-[4px] rounded-full text-[0.7rem] font-[500] tracking-[0.02em] leading-[1.3] transition-colors duration-200'
  const variantClass =
    variant === 'dark'
      ? 'border border-white/20 text-white/70'
      : 'border border-[#d2d2d7] text-[#6e6e73]'

  return <span className={`${base} ${variantClass} ${className}`}>{children}</span>
}

export default React.memo(Tag)
