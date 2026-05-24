import { Check, FolderOpen } from 'lucide-react'
import { useState } from 'react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const folders = [
  '/storage/emulated/0/Music/Naqlen',
  '/storage/emulated/0/Music/Albums',
  '/storage/emulated/0/Download/Music',
  '/sdcard/Music',
]

export function AnchorFolderPickerMock({
  currentPath,
  onCancel,
  onUseFolder,
}: {
  currentPath: string
  onCancel: () => void
  onUseFolder: (path: string) => void
}) {
  const [selectedPath, setSelectedPath] = useState(currentPath)

  return (
    <AnchorBottomSheet
      onClose={onCancel}
      title="Change library folder"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.055] p-3">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-amber-200/75">Current folder</p>
          <p className="mt-2 break-all text-xs leading-5 text-white">{currentPath}</p>
        </div>

        <div className="space-y-2">
          {folders.map((path) => {
            const selected = selectedPath === path
            return (
              <button
                className={`flex w-full min-w-0 items-center gap-3 rounded-2xl border px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300/35 ${
                  selected
                    ? 'border-amber-300/35 bg-amber-300/[0.11]'
                    : 'border-white/[0.06] bg-white/[0.035] hover:bg-white/[0.06]'
                }`}
                key={path}
                onClick={() => setSelectedPath(path)}
                type="button"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.055] text-amber-300">
                  <FolderOpen size={18} />
                </span>
                <span className="min-w-0 flex-1 break-all text-xs leading-5 text-slate-100">{path}</span>
                {selected ? <Check className="shrink-0 text-emerald-300" size={18} /> : null}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-slate-100 transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-lg bg-amber-300 text-sm font-semibold text-slate-950 shadow-[0_0.8rem_1.6rem_rgba(245,158,11,0.16)] transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
            onClick={() => onUseFolder(selectedPath)}
            type="button"
          >
            Use selected folder
          </button>
        </div>
      </div>
    </AnchorBottomSheet>
  )
}
