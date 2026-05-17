import { Bell, Info, Network, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const sections = [
  {
    Icon: SlidersHorizontal,
    title: 'General',
    rows: ['Launch Anchor to Home', 'Compact server cards'],
  },
  {
    Icon: Network,
    title: 'Network',
    rows: ['Prefer local mock address', 'Show LAN hints'],
  },
  {
    Icon: Bell,
    title: 'Notifications',
    rows: ['Server status alerts', 'Library scan summaries'],
  },
  {
    Icon: ShieldCheck,
    title: 'Safety',
    rows: ['Mock-only controls', 'Confirm server actions'],
  },
  {
    Icon: Info,
    title: 'About',
    rows: ['Anchor Studio preview', 'No real server connection'],
  },
]

export function AnchorSettingsSheet({ onClose }: { onClose: () => void }) {
  const [enabledRows, setEnabledRows] = useState<Record<string, boolean>>({
    'Confirm server actions': true,
    'Mock-only controls': true,
    'Prefer local mock address': true,
  })

  return (
    <AnchorBottomSheet
      onClose={onClose}
      subtitle="Preview-only preferences for the Anchor mock."
      title="Settings"
    >
      <div className="space-y-3">
        {sections.map(({ Icon, rows, title }) => (
          <section
            className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5"
            key={title}
          >
            <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-white">
              <Icon className="text-amber-300" size={17} />
              {title}
            </div>
            <div className="space-y-2">
              {rows.map((row) => {
                const enabled = enabledRows[row] ?? false
                return (
                  <button
                    aria-pressed={enabled}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-white/[0.045] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                    key={row}
                    onClick={() =>
                      setEnabledRows((current) => ({
                        ...current,
                        [row]: !enabled,
                      }))
                    }
                    type="button"
                  >
                    <span className="min-w-0 truncate text-xs text-slate-200/88">{row}</span>
                    <span
                      className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${
                        enabled ? 'bg-amber-300' : 'bg-white/14'
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-[#071014] transition ${
                          enabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </AnchorBottomSheet>
  )
}
