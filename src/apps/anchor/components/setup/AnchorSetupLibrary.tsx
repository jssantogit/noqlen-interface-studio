import { ChevronLeft, Folder, FolderOpen } from 'lucide-react'
import { useState } from 'react'
import type { AnchorSetupLibraryOption } from '../../anchorSetupState'
import { AnchorSetupFolderPicker } from './AnchorSetupFolderPicker'

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
  const [pickerOpen, setPickerOpen] = useState(false)
  const hasSelection = selectedPath.trim().length > 0
  const selected = options.find((o) => o.path === selectedPath)

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-5 sm:px-5">
      <header className="mb-4">
        <h1 className="break-words font-serif text-[clamp(1.6rem,12vw,1.9rem)] leading-none tracking-[-0.055em] text-white">
          Music Library
        </h1>
        <p className="mt-2 text-[0.82rem] leading-4 text-slate-300/82">
          Choose where Anchor should look for your music.
        </p>
      </header>

      <p className="mb-3 text-xs leading-5 text-amber-50/72">
        Studio does not access real storage in the preview. Paths are display-only.
      </p>

      {hasSelection ? (
        <div className="mb-4 rounded-2xl border border-emerald-300/14 bg-emerald-300/[0.055] p-3.5">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-emerald-100">
            <Folder className="shrink-0 text-emerald-300" size={18} />
            <span className="min-w-0 break-words">{selected?.label ?? 'Custom folder'}</span>
          </div>
          <p className="mt-1.5 break-all text-xs leading-4 text-emerald-50/78">
            {selectedPath}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-emerald-300/18 px-2 py-0.5 text-emerald-200/90">Accessible</span>
            <span className="text-slate-300/72">Contains {selected?.songCount ?? '0'} songs</span>
          </div>
        </div>
      ) : (
        <div className="mb-4 rounded-2xl border border-white/[0.065] bg-white/[0.035] p-4">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-300">
            <FolderOpen className="shrink-0 text-slate-400" size={18} />
            <span className="min-w-0 break-words">No folder selected</span>
          </div>
          <p className="mt-1.5 text-xs leading-4 text-slate-400/82">
            Anchor has not scanned real storage in the Studio preview. Choose a mock folder to continue.
          </p>
        </div>
      )}

      <button
        className="flex w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] py-3 text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
        onClick={() => setPickerOpen(true)}
        type="button"
      >
        <FolderOpen size={16} />
        {hasSelection ? 'Change folder' : 'Choose folder'}
      </button>

      <div className="mt-auto space-y-2.5 pb-6 pt-6">
        <button
          className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(245,158,11,0.12)] transition focus:outline-none focus:ring-2 focus:ring-amber-100/60 ${
            hasSelection
              ? 'bg-amber-400 text-[#211508] hover:bg-amber-300'
              : 'cursor-not-allowed bg-amber-400/40 text-[#211508]/60'
          }`}
          disabled={!hasSelection}
          onClick={onContinue}
          type="button"
        >
          Continue
        </button>
        {!hasSelection ? (
          <p className="text-center text-xs text-slate-400/82">
            Choose a music folder before continuing.
          </p>
        ) : null}
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      </div>

      {pickerOpen ? (
        <AnchorSetupFolderPicker
          currentPath={selectedPath}
          onCancel={() => setPickerOpen(false)}
          onSelect={(path) => {
            setPickerOpen(false)
            onSelect(path)
          }}
          options={options}
        />
      ) : null}
    </div>
  )
}
