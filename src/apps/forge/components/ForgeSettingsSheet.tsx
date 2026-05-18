import { Eye, FileText, Image, Info, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { ForgeBottomSheet } from './ForgeBottomSheet'

const sections = [
  {
    Icon: SlidersHorizontal,
    title: 'Review behavior',
    rows: ['Preview before applying', 'Show dry-run diff', 'Auto-expand first group'],
  },
  {
    Icon: ShieldCheck,
    title: 'Metadata safety',
    rows: ['Confirm batch actions', 'Warn on destructive changes'],
  },
  {
    Icon: Image,
    title: 'Visual previews',
    rows: ['Show cover placeholders', 'Show genre chips in detail'],
  },
  {
    Icon: Eye,
    title: 'Mock mode',
    rows: ['Studio mock state controls'],
  },
  {
    Icon: FileText,
    title: 'Reports',
    rows: ['Keep activity summaries', 'Show change counts'],
  },
  {
    Icon: Info,
    title: 'About',
    rows: ['Forge Studio preview', 'No real metadata changes'],
  },
]

export function ForgeSettingsSheet({
  mockStateControls,
  onClose,
  onSave,
}: {
  mockStateControls?: ReactNode
  onClose: () => void
  onSave: () => void
}) {
  const [enabledRows, setEnabledRows] = useState<Record<string, boolean>>({
    'Preview before applying': true,
    'Confirm batch actions': true,
    'Show cover placeholders': true,
    'Keep activity summaries': true,
  })

  return (
    <ForgeBottomSheet
      onClose={onClose}
      subtitle="Preview-only preferences for the Forge mock."
      title="Settings"
    >
      <div className="space-y-3">
        {mockStateControls}
        {sections.map(({ Icon, rows, title }) => (
          <section
            className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5"
            key={title}
          >
            <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-white">
              <Icon className="text-orange-300" size={17} />
              {title}
            </div>
            <div className="space-y-2">
              {rows.map((row) => {
                const enabled = enabledRows[row] ?? false
                return (
                  <button
                    aria-pressed={enabled}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-white/[0.045] focus:outline-none focus:ring-2 focus:ring-orange-300/30"
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
                        enabled ? 'bg-[#e7a35f]' : 'bg-white/14'
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
        <button
          className="h-11 w-full rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c] focus:outline-none focus:ring-2 focus:ring-orange-300/40"
          onClick={onSave}
          type="button"
        >
          Save settings
        </button>
      </div>
    </ForgeBottomSheet>
  )
}
