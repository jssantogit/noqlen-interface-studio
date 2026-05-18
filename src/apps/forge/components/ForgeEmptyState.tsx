import type { ReactNode } from 'react'

interface ForgeEmptyStateProps {
  icon?: ReactNode
  title: string
  message: string
  actions?: { label: string; onClick: () => void; tone?: 'primary' | 'secondary' }[]
}

export function ForgeEmptyState({ icon, title, message, actions }: ForgeEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      {icon && (
        <div className="mb-1 grid h-14 w-14 place-items-center rounded-full bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {icon}
        </div>
      )}
      <p className="text-base font-medium text-white/85">{title}</p>
      <p className="max-w-[260px] text-sm leading-5 text-white/45">{message}</p>
      {actions && actions.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              className={`h-9 rounded-lg px-4 text-xs font-medium transition ${
                action.tone === 'primary'
                  ? 'bg-[#e7a35f] text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#efad6c]'
                  : 'border border-white/[0.065] bg-white/[0.045] text-white transition hover:bg-white/[0.075]'
              }`}
              onClick={action.onClick}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
