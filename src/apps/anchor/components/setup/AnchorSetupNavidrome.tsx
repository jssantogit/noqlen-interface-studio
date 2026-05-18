import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'

export function AnchorSetupNavidrome({
  draft,
  onChange,
  onContinue,
  onBack,
  onOpenAdvanced,
}: {
  draft: {
    MusicFolder: string
    DataFolder: string
    Port: number
    LogLevel: string
    ScannerSchedule: string
    EnableDownloads: boolean
    EnableSharing: boolean
    EnableLogRedacting: boolean
  }
  onChange: (key: string, value: string | number | boolean) => void
  onContinue: () => void
  onBack: () => void
  onOpenAdvanced: () => void
}) {
  const logLevels = ['debug', 'info', 'warn', 'error']

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-5 sm:px-5">
      <header className="mb-4">
        <h1 className="break-words font-serif text-[clamp(1.6rem,12vw,1.9rem)] leading-none tracking-[-0.055em] text-white">
          Navidrome
        </h1>
        <p className="mt-2 text-[0.82rem] leading-4 text-slate-300/82">
          Configure the basic navidrome.toml profile.
        </p>
      </header>

      <p className="mb-3 text-xs leading-5 text-amber-50/72">
        Studio does not write real config. Values are display-only.
      </p>

      <div className="anchor-scrollbar-soft min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden pr-1">
        <div className="space-y-3">
          <label className="block min-w-0">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400/82">MusicFolder</span>
            <input
              className="mt-1.5 h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
              onChange={(e) => onChange('MusicFolder', e.target.value)}
              value={draft.MusicFolder}
            />
          </label>

          <label className="block min-w-0">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400/82">DataFolder</span>
            <input
              className="mt-1.5 h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
              onChange={(e) => onChange('DataFolder', e.target.value)}
              value={draft.DataFolder}
            />
          </label>

          <label className="block min-w-0">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400/82">Port</span>
            <input
              className="mt-1.5 h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
              onChange={(e) => onChange('Port', Number(e.target.value) || 0)}
              type="number"
              value={draft.Port}
            />
          </label>

          <label className="block min-w-0">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400/82">LogLevel</span>
            <select
              className="mt-1.5 h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-xs text-white outline-none transition focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
              onChange={(e) => onChange('LogLevel', e.target.value)}
              value={draft.LogLevel}
            >
              {logLevels.map((level) => (
                <option className="bg-[#071014] text-white" key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label className="block min-w-0">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400/82">Scanner.Schedule</span>
            <input
              className="mt-1.5 h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
              onChange={(e) => onChange('ScannerSchedule', e.target.value)}
              value={draft.ScannerSchedule}
            />
          </label>
        </div>

        <div className="space-y-2">
          {[
            { key: 'EnableDownloads', label: 'Enable downloads' },
            { key: 'EnableSharing', label: 'Enable sharing' },
            { key: 'EnableLogRedacting', label: 'Enable log redacting' },
          ].map(({ key, label }) => {
            const enabled = draft[key as keyof typeof draft] as boolean
            return (
              <button
                aria-pressed={enabled}
                className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-white/[0.045] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                key={key}
                onClick={() => onChange(key, !enabled)}
                type="button"
              >
                <span className="min-w-0 truncate text-xs text-slate-200/88">{label}</span>
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

        <button
          className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-white/[0.065] bg-white/[0.04] px-3.5 py-3 text-left transition hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={onOpenAdvanced}
          type="button"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="text-amber-300" size={16} />
            <span className="text-sm font-medium text-white">Advanced Navidrome Settings</span>
          </span>
          <ChevronRight className="shrink-0 text-slate-300/72" size={16} />
        </button>
      </div>

      <div className="mt-auto space-y-2.5 pb-6 pt-4">
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(245,158,11,0.12)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/60"
          onClick={onContinue}
          type="button"
        >
          Continue
        </button>
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      </div>
    </div>
  )
}
