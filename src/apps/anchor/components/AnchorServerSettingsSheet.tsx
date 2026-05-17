import { useState } from 'react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const sections = [
  { title: 'General', rows: ['Display name', 'Start on launch'] },
  { title: 'Network', rows: ['Host', 'Port', 'Local-only access'] },
  { title: 'Library', rows: ['Watch library changes', 'Rescan on restart'] },
  { title: 'Safety', rows: ['Confirm stop/restart', 'Keep mock-only mode'] },
]

export function AnchorServerSettingsSheet({
  onCancel,
  onSave,
}: {
  onCancel: () => void
  onSave: () => void
}) {
  const [enabledRows, setEnabledRows] = useState<Record<string, boolean>>({
    'Confirm stop/restart': true,
    'Keep mock-only mode': true,
    'Local-only access': true,
    'Watch library changes': true,
  })

  return (
    <AnchorBottomSheet
      onClose={onCancel}
      subtitle="Visual server preferences for this preview only."
      title="Server settings"
    >
      <div className="space-y-3">
        {sections.map((section) => (
          <section
            className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5"
            key={section.title}
          >
            <h3 className="mb-2.5 text-sm font-semibold text-white">{section.title}</h3>
            <div className="space-y-2">
              {section.rows.map((row) => {
                const isField = row === 'Display name' || row === 'Host' || row === 'Port'
                const enabled = enabledRows[row] ?? isField
                const value = row === 'Display name' ? 'Navidrome' : row === 'Host' ? '192.168.1.156' : '4533'

                if (isField) {
                  return (
                    <label className="block" key={row}>
                      <span className="text-xs font-medium text-slate-300/74">{row}</span>
                      <input
                        className="mt-1.5 h-9 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-xs text-white outline-none transition focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
                        defaultValue={value}
                      />
                    </label>
                  )
                }

                return (
                  <button
                    aria-pressed={enabled}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-white/[0.045] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                    key={row}
                    onClick={() =>
                      setEnabledRows((current) => ({ ...current, [row]: !enabled }))
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

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            className="h-10 rounded-xl border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-xl bg-amber-400 text-sm font-semibold text-[#211508] shadow-[0_0.8rem_1.5rem_rgba(245,158,11,0.16)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
            onClick={onSave}
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </AnchorBottomSheet>
  )
}
