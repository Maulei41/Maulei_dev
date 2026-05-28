import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  id?: string
}

export default function Container({
  children,
  className = '',
  size = 'lg',
  id,
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-7xl',
    full: 'w-full',
  }

  return (
    <div
      id={id}
      className={`mx-auto px-6 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  )
}
