import { Check, ChevronLeft, Folder } from 'lucide-react'
import type { AnchorSetupLibraryOption } from '../../anchorSetupState'

export function AnchorSetupLibrary({
  options,
  selectedPath,
  onSelect,
  onContinue,
  onBack,
}: {
  options: AnchorSetupLibraryOption[]
  selectedPath: string
  onSelect: (path: string) => void
  onContinue: () => void
  onBack: () => void
}) {
  const selected = options.find((o) => o.path === selectedPath) ?? options[0]

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-5 sm:px-5">
      <header className="mb-4">
        <h1 className="break-words font-serif text-[clamp(1.6rem,12vw,1.9rem)] leading-none tracking-[-0.055em] text-white">
          Music Library
        </h1>
        <p className="mt-2 text-[0.82rem] leading-4 text-slate-300/82">
          Choose your music folder.
        </p>
      </header>

      <p className="mb-3 text-xs leading-5 text-amber-50/72">
        Studio does not access real storage. Paths are display-only.
      </p>

      <div className="mb-4 rounded-2xl border border-emerald-300/14 bg-emerald-300/[0.055] p-3.5">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-emerald-100">
          <Folder className="shrink-0 text-emerald-300" size={18} />
          <span className="min-w-0 break-words">{selected.label}</span>
        </div>
        <p className="mt-1.5 text-xs leading-4 text-emerald-50/78">
          {selected.path}
        </p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-emerald-300/18 px-2 py-0.5 text-emerald-200/90">Accessible</span>
          <span className="text-slate-300/72">Contains {selected.songCount} songs</span>
        </div>
      </div>

      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300/72">Folder options</h2>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = option.path === selectedPath
          return (
            <button
              aria-pressed={isSelected}
              className={`flex w-full min-w-0 items-center gap-3 rounded-2xl border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300/30 ${
                isSelected
                  ? 'border-amber-300/35 bg-amber-300/[0.065]'
                  : 'border-white/[0.065] bg-white/[0.04] hover:bg-white/[0.06]'
              }`}
              key={option.path}
              onClick={() => onSelect(option.path)}
              type="button"
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                isSelected ? 'bg-amber-300/16 text-amber-300' : 'bg-white/[0.06] text-slate-300'
              }`}>
                <Folder size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-white">{option.path}</span>
                <span className="block text-xs text-slate-300/72">{option.songCount} songs</span>
              </div>
              {isSelected ? (
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-300 text-[#211508]">
                  <Check size={11} strokeWidth={2.8} />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      <div className="mt-auto space-y-2.5 pb-6 pt-6">
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
