import type { ReactNode } from 'react'

interface ForgeCardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function ForgeCard({ children, onClick, className = '' }: ForgeCardProps) {
  const base = 'w-full rounded-2xl border border-white/[0.06] bg-white/[0.045] text-left shadow-lg shadow-black/10 transition'
  const interactive = onClick ? 'cursor-pointer hover:bg-white/[0.07] active:scale-[0.99]' : ''

  if (onClick) {
    return (
      <button className={`${base} ${interactive} ${className}`} onClick={onClick} type="button">
        {children}
      </button>
    )
  }

  return <div className={`${base} ${className}`}>{children}</div>
}

export function CoverGradient({ gradient, className = '' }: { gradient: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br shadow-inner ${gradient} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,.42),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(0,0,0,.45),transparent_38%)]" />
      <div className="absolute bottom-2 left-2 h-5 w-5 rounded-sm bg-black/35 backdrop-blur-sm" />
    </div>
  )
}

export function ForgeScreenHeader({
  title,
  rightAction,
}: {
  title: string
  rightAction?: ReactNode
}) {
  return (
    <div className="mb-8 flex items-center justify-between pt-12">
      <h1 className="truncate font-serif text-[27px] leading-none text-white">{title}</h1>
      {rightAction}
    </div>
  )
}

export function SegmentedControl({
  options,
  activeIndex,
  onChange,
}: {
  options: string[]
  activeIndex: number
  onChange: (index: number) => void
}) {
  return (
    <div
      className="mx-4 mb-3 grid rounded-xl bg-white/[0.055] p-1 text-sm text-white/64"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option, index) => (
        <button
          className={index === activeIndex ? 'rounded-lg bg-white/[0.09] py-2 text-white transition-colors' : 'rounded-lg py-2 transition-colors hover:text-white'}
          key={option}
          onClick={() => onChange(index)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
