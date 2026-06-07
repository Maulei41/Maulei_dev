import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function Container({ children, className = '', id }: ContainerProps) {
  return (
    <div id={id} className={`max-w-[1120px] mx-auto px-8 max-sm:px-5 ${className}`}>
      {children}
    </div>
  )
}
