import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  padding?: 'md' | 'sm'
  as?: 'article' | 'div'
}

export default function Card({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
  as: Tag = 'article',
}: CardProps) {
  const paddingClass = padding === 'md' ? 'p-8 max-sm:p-6' : 'p-6'
  const hoverClass = hoverable
    ? 'transition-all duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5'
    : ''

  return (
    <Tag
      className={`bg-white border border-[#d2d2d7] rounded-[12px] ${paddingClass} ${hoverClass} ${className}`}
    >
      {children}
    </Tag>
  )
}
