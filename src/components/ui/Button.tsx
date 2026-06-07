import React from 'react'
import type { Icon } from '@phosphor-icons/react'

type ButtonVariant = 'primary' | 'secondary' | 'pill'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  icon?: Icon
  iconPosition?: 'left' | 'right'
  className?: string
  download?: boolean
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent) => void
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-[18px] py-2 text-[13px]',
  md: 'px-[22px] py-3 text-[14px]',
  lg: 'px-[28px] py-[14px] text-[15px]',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#0071e3] text-white hover:bg-[#0077ed] border-none',
  secondary:
    'bg-transparent text-[#1d1d1f] border border-[#d2d2d7] hover:bg-black/5 hover:border-[#86868b]',
  pill:
    'bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full border-none',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  download,
  target,
  rel,
  onClick,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-[500] leading-none tracking-[-0.01em] cursor-pointer no-underline whitespace-nowrap rounded-[8px] transition-all duration-200 select-none active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#0071e3] focus-visible:outline-offset-2'
  const pillClass = variant === 'pill' ? 'rounded-full' : ''
  const combined = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${pillClass} ${className}`.trim()

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={18} weight="bold" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} weight="bold" />}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={combined}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button className={combined} onClick={onClick}>
      {content}
    </button>
  )
}

export default React.memo(Button)
