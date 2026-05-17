import { useState } from 'react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

export type AnchorLibrarySettings = Record<string, boolean>

const sections = [
  {
    title: 'Scan behavior',
    rows: ['Auto-scan on launch', 'Watch library changes', 'Include subfolders'],
  },
  {
    title: 'Metadata',
    rows: ['Refresh missing artwork', 'Prefer embedded tags', 'Keep original genre tags'],
  },
  {
    title: 'Safety',
    rows: ['Confirm folder changes', 'Mock-only mode'],
  },
]

export function AnchorLibrarySettingsSheet({
  onCancel,
  onSave,
  settings,
}: {
  onCancel: () => void
  onSave: (settings: AnchorLibrarySettings) => void
  settings: AnchorLibrarySettings
}) {
  const [localSettings, setLocalSettings] = useState(settings)

  const toggleSetting = (row: string) => {
    setLocalSettings((current) => ({ ...current, [row]: !current[row] }))
  }

  return (
    <AnchorBottomSheet
      onClose={onCancel}
      subtitle="Tune local visual scan behavior for the Studio mock."
      title="Library settings"
    >
      <div className="space-y-4">
        {sections.map((section) => (
          <section className="rounded-2xl border border-white/[0.065] bg-white/[0.035] p-3" key={section.title}>
            <h3 className="text-[0.68rem] uppercase tracking-[0.18em] text-amber-200/75">{section.title}</h3>
            <div className="mt-2 divide-y divide-white/[0.055]">
              {section.rows.map((row) => (
                <button
                  className="flex w-full items-center justify-between gap-3 py-3 text-left focus:outline-none"
                  key={row}
                  onClick={() => toggleSetting(row)}
                  type="button"
                >
                  <span className="min-w-0 text-xs font-medium text-slate-100">{row}</span>
                  <span
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      localSettings[row] ? 'bg-amber-300' : 'bg-white/[0.12]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                        localSettings[row] ? 'left-6' : 'left-1'
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-slate-100 transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-lg bg-amber-300 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
            onClick={() => onSave(localSettings)}
            type="button"
          >
            Save settings
          </button>
        </div>
      </div>
    </AnchorBottomSheet>
  )
}
