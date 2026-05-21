import type { StudioApp } from '../../apps/apps'

const stageNotes: Record<StudioApp['id'], string> = {
  anchor:
    'High-fidelity interactive mock foundation. Local-state-only server, library, setup and activity flows.',
  forge:
    'Advanced interactive mock preview for metadata review, library repair, activity and editor flows.',
  aria:
    'Music player and library mock in visual alignment against the approved Aria reference set.',
  flux:
    'Intentionally neutral static placeholder until a dedicated Flux concept block begins.',
}

export function StudioInspector({ selectedApp }: { selectedApp: StudioApp }) {
  return (
    <aside className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-sm text-slate-300 backdrop-blur-xl">
      <p className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-500">
        Simulator note
      </p>
      <p className="mt-3 truncate text-lg font-medium text-white">
        {selectedApp.name}
      </p>
      <p className="mt-2 leading-6 text-slate-400">{selectedApp.mood}</p>
      <div className="mt-5 rounded-2xl border border-amber-200/15 bg-amber-200/[0.055] p-3 text-xs leading-5 text-amber-50/70">
        {stageNotes[selectedApp.id]}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        All simulator interactions remain mock-only, local-state-only and display-only.
      </p>
    </aside>
  )
}
