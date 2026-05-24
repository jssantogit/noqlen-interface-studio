import { Check, Folder, FolderOpen, Keyboard, X } from 'lucide-react'
import { useState } from 'react'
import { AnchorBottomSheet } from '../AnchorBottomSheet'
import type { AnchorSetupLibraryOption } from '../../anchorSetupState'

export function AnchorSetupFolderPicker({
  options,
  currentPath,
  onCancel,
  onSelect,
}: {
  options: AnchorSetupLibraryOption[]
  currentPath: string
  onCancel: () => void
  onSelect: (path: string) => void
}) {
  const [selectedPath, setSelectedPath] = useState(currentPath || '')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customPath, setCustomPath] = useState('')
  const [customError, setCustomError] = useState('')

  const handleSelectOption = (path: string) => {
    setSelectedPath(path)
    setShowCustomInput(false)
    setCustomError('')
  }

  const handleUseCustom = () => {
    const trimmed = customPath.trim()
    if (!trimmed) {
      setCustomError('Enter a path')
      return
    }
    if (!trimmed.startsWith('/')) {
      setCustomError('Android paths should start with /')
      return
    }
    setCustomError('')
    setSelectedPath(trimmed)
    setShowCustomInput(false)
  }

  const handleConfirm = () => {
    if (selectedPath) {
      onSelect(selectedPath)
    }
  }

  const isCustom = selectedPath && !options.some((o) => o.path === selectedPath)

  return (
    <AnchorBottomSheet
      onClose={onCancel}
      title="Choose music folder"
    >
      <div className="space-y-3">
        <div className="space-y-2">
          {options.map((option) => {
            const selected = selectedPath === option.path
            return (
              <button
                aria-pressed={selected}
                className={`flex w-full min-w-0 items-center gap-3 rounded-2xl border px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300/35 ${
                  selected
                    ? 'border-amber-300/35 bg-amber-300/[0.11]'
                    : 'border-white/[0.06] bg-white/[0.035] hover:bg-white/[0.06]'
                }`}
                key={option.path}
                onClick={() => handleSelectOption(option.path)}
                type="button"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${selected ? 'bg-amber-300/16 text-amber-300' : 'bg-white/[0.055] text-slate-300'}`}>
                  <FolderOpen size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-white">{option.label}</span>
                  <span className="block break-all text-xs leading-4 text-slate-300/72">{option.path}</span>
                  <span className="block text-[0.65rem] text-slate-400/72">{option.songCount} songs</span>
                </div>
                {selected ? <Check className="shrink-0 text-emerald-300" size={18} /> : null}
              </button>
            )
          })}
        </div>

        {isCustom && (
          <div className="rounded-2xl border border-sky-300/18 bg-sky-300/[0.055] p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-sky-100">
              <Folder className="shrink-0 text-sky-300" size={16} />
              <span className="min-w-0 break-words">Custom path selected</span>
            </div>
            <p className="mt-1 break-all text-xs leading-4 text-sky-50/78">{selectedPath}</p>
          </div>
        )}

        {showCustomInput ? (
          <div className="space-y-2 rounded-2xl border border-white/[0.065] bg-white/[0.035] p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300/82">
              <Keyboard size={14} />
              Enter path
            </div>
            <input
              autoFocus
              className="h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
              onChange={(e) => {
                setCustomPath(e.target.value)
                setCustomError('')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUseCustom()
              }}
              placeholder="/storage/emulated/0/Music/Custom"
              value={customPath}
            />
            {customError ? (
              <p className="text-xs text-orange-300/90">{customError}</p>
            ) : null}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                className="h-9 rounded-lg border border-white/[0.075] bg-white/[0.045] text-xs font-medium text-slate-200 transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                onClick={() => {
                  setShowCustomInput(false)
                  setCustomError('')
                }}
                type="button"
              >
                <X size={14} className="mr-1 inline" />
                Cancel
              </button>
              <button
                className="h-9 rounded-lg bg-amber-300 text-xs font-semibold text-slate-950 shadow-[0_0.6rem_1.2rem_rgba(245,158,11,0.16)] transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
                onClick={handleUseCustom}
                type="button"
              >
                Save custom path
              </button>
            </div>
          </div>
        ) : (
          <button
            className="flex w-full min-w-0 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.035] px-3 py-3 text-left transition hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-300/35"
            onClick={() => {
              setShowCustomInput(true)
              setCustomPath('')
              setCustomError('')
            }}
            type="button"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.055] text-slate-300">
              <Keyboard size={18} />
            </span>
            <span className="min-w-0 flex-1 text-sm font-medium text-slate-200">Use another folder...</span>
          </button>
        )}

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-slate-200 transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`h-10 rounded-lg text-sm font-semibold shadow-[0_0.6rem_1.2rem_rgba(245,158,11,0.16)] transition focus:outline-none focus:ring-2 focus:ring-amber-100/70 ${
              selectedPath
                ? 'bg-amber-300 text-slate-950 hover:bg-amber-200'
                : 'cursor-not-allowed bg-amber-300/40 text-slate-950/60'
            }`}
            disabled={!selectedPath}
            onClick={handleConfirm}
            type="button"
          >
            Use selected folder
          </button>
        </div>
      </div>
    </AnchorBottomSheet>
  )
}
