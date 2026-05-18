import { AlertTriangle, Info, XCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface ForgeStateNoticeProps {
  variant: 'warning' | 'error' | 'info'
  title: string
  message: string
  actions?: { label: string; onClick: () => void; tone?: 'primary' | 'secondary' }[]
}

export function ForgeStateNotice({ variant, title, message, actions }: ForgeStateNoticeProps) {
  const iconMap: Record<string, ReactNode> = {
    warning: <AlertTriangle size={18} className="text-orange-300/90" />,
    error: <XCircle size={18} className="text-red-300/90" />,
    info: <Info size={18} className="text-sky-300/90" />,
  }

  const borderMap = {
    warning: 'border-orange-300/12 bg-orange-300/6',
    error: 'border-red-300/12 bg-red-300/6',
    info: 'border-sky-300/12 bg-sky-300/6',
  }

  return (
    <div className={`mb-5 rounded-2xl border p-4 ${borderMap[variant]}`}>
      <div className="mb-2 flex items-center gap-2">
        {iconMap[variant]}
        <p className="text-sm font-semibold text-white/85">{title}</p>
      </div>
      <p className="text-xs leading-5 text-white/50">{message}</p>
      {actions && actions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              className={`h-8 rounded-lg px-3 text-[11px] font-medium transition ${
                action.tone === 'primary'
                  ? 'bg-[#e7a35f] text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#efad6c]'
                  : 'border border-white/[0.065] bg-white/[0.045] text-white hover:bg-white/[0.075]'
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
