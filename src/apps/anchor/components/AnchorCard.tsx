import type { ReactNode } from 'react'

export function AnchorCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`w-full min-w-0 max-w-full overflow-hidden rounded-[1.15rem] border border-white/[0.075] bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.032))] shadow-[0_1.1rem_2rem_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.045)] ${className}`}
    >
      {children}
    </section>
  )
}

export function AnchorScreenHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle: string
  action?: ReactNode
}) {
  return (
    <header className="mb-5 flex min-w-0 items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="break-words font-serif text-[clamp(1.72rem,13vw,2rem)] leading-none tracking-[-0.055em] text-white">
          {title}
        </h1>
        <p className="mt-2 text-[0.82rem] leading-4 text-slate-300/82">
          {subtitle}
        </p>
      </div>
      {action}
    </header>
  )
}

export function AnchorIconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <button
      aria-label={label}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-200 transition hover:bg-white/8 hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300/35"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
