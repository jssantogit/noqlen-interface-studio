import type { ReactNode } from 'react'

interface ForgeCardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function ForgeCard({ children, onClick, className = '' }: ForgeCardProps) {
  const base =
    'w-full rounded-2xl border border-white/[0.06] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] text-left shadow-[0_1rem_2rem_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] transition'
  const interactive = onClick
    ? 'cursor-pointer hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.04))] active:scale-[0.99]'
    : ''

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
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0.25rem_0.5rem_rgba(0,0,0,0.25)] ${gradient} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,.38),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(0,0,0,.5),transparent_38%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,.25)_100%)]" />
      <div className="absolute bottom-1.5 left-1.5 h-4 w-4 rounded-[3px] bg-black/40 backdrop-blur-sm ring-1 ring-white/10" />
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
      <h1 className="truncate font-serif text-[27px] leading-none tracking-[-0.04em] text-white">{title}</h1>
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
          className={
            index === activeIndex
              ? 'rounded-lg bg-white/[0.09] py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors'
              : 'rounded-lg py-2 transition-colors hover:text-white'
          }
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
