import type { StudioApp } from '../../apps/apps'

const stageNotes: Record<StudioApp['id'], string> = {
  anchor:
    'Server, library, setup and activity flows for managing a local music hub.',
  forge:
    'Metadata review, library repair, activity and editor flows for a focused cleanup workspace.',
  aria:
    'Music player and library experience aligned with the approved Aria reference set.',
  flux:
    'Neutral workspace for sequencing, shaping and resolving flows.',
}

export function StudioInspector({ selectedApp }: { selectedApp: StudioApp }) {
  return (
    <aside className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-sm text-slate-300 backdrop-blur-xl">
      <p className="text-[0.65rem] uppercase tracking-[0.32em] text-slate-500">
        Studio note
      </p>
      <p className="mt-3 truncate text-lg font-medium text-white">
        {selectedApp.name}
      </p>
      <p className="mt-2 leading-6 text-slate-400">{selectedApp.mood}</p>
      <div className="mt-5 rounded-2xl border border-amber-200/15 bg-amber-200/[0.055] p-3 text-xs leading-5 text-amber-50/70">
        {stageNotes[selectedApp.id]}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Switch between product surfaces and inspect the current interface direction.
      </p>
    </aside>
  )
}
