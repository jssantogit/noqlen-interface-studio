import { Copy, Edit3, Power, Trash2 } from 'lucide-react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const menuItems = [
  { Icon: Edit3, label: 'Rename', tone: 'default' },
  { Icon: Copy, label: 'Duplicate config', tone: 'default' },
  { Icon: Power, label: 'Disable mock server', tone: 'warning' },
  { Icon: Trash2, label: 'Remove mock server', tone: 'danger' },
] as const

export function AnchorServerMenuSheet({
  onAction,
  onClose,
}: {
  onAction: (action: 'rename' | 'duplicate' | 'disable' | 'remove') => void
  onClose: () => void
}) {
  const actionByLabel = {
    Rename: 'rename',
    'Duplicate config': 'duplicate',
    'Disable mock server': 'disable',
    'Remove mock server': 'remove',
  } as const

  return (
    <AnchorBottomSheet
      onClose={onClose}
      subtitle="Local-only actions for the mock Navidrome profile."
      title="Server menu"
    >
      <div className="space-y-2.5">
        {menuItems.map(({ Icon, label, tone }) => (
          <button
            className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300/30 ${
              tone === 'danger'
                ? 'border-orange-400/16 bg-orange-400/[0.055] text-orange-100 hover:bg-orange-400/[0.09]'
                : tone === 'warning'
                  ? 'border-amber-300/13 bg-amber-300/[0.05] text-amber-50 hover:bg-amber-300/[0.08]'
                  : 'border-white/[0.065] bg-white/[0.04] text-white hover:bg-white/[0.07]'
            }`}
            key={label}
            onClick={() => onAction(actionByLabel[label])}
            type="button"
          >
            <Icon className="shrink-0" size={17} />
            <span className="min-w-0 flex-1 text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </AnchorBottomSheet>
  )
}
