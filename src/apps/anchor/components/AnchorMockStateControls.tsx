import type {
  AnchorActivityState,
  AnchorLibraryState,
  AnchorMockState,
  AnchorServerListState,
  AnchorServerState,
} from '../anchorState'
import { anchorMockStateLabels, initialAnchorMockState } from '../anchorState'

function StateChip({
  active,
  ariaLabel,
  label,
  onClick,
}: {
  active: boolean
  ariaLabel?: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`min-h-8 rounded-full border px-2.5 py-1.5 text-[0.68rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-300/30 ${
        active
          ? 'border-amber-300/45 bg-amber-300 text-[#211508]'
          : 'border-white/[0.07] bg-white/[0.04] text-slate-200 hover:bg-white/[0.07]'
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

function StateGroup<T extends string>({
  current,
  labels,
  onChange,
  title,
}: {
  current: T
  labels: Record<T, string>
  onChange: (value: T) => void
  title: string
}) {
  return (
    <section className="rounded-2xl border border-white/[0.065] bg-white/[0.035] p-3">
      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-amber-200/75">
        {title}
      </h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {(Object.keys(labels) as T[]).map((key) => (
          <StateChip
            active={current === key}
            ariaLabel={`${title}: ${labels[key]}`}
            key={key}
            label={labels[key]}
            onClick={() => onChange(key)}
          />
        ))}
      </div>
    </section>
  )
}

export function AnchorMockStateControls({
  mockState,
  onClearSurfaces,
  onShowToast,
  onStateChange,
}: {
  mockState: AnchorMockState
  onClearSurfaces: () => void
  onShowToast: () => void
  onStateChange: (state: AnchorMockState) => void
}) {
  const update = (patch: Partial<AnchorMockState>) => onStateChange({ ...mockState, ...patch })

  return (
    <section className="rounded-2xl border border-amber-300/14 bg-amber-300/[0.045] p-3.5">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/78">
          Studio mock states
        </p>
        <p className="mt-1 text-xs leading-5 text-amber-50/78">
          Local preview controls only. They do not contact servers, files, logs or ports.
        </p>
      </div>

      <div className="space-y-2.5">
        <StateGroup<AnchorServerState>
          current={mockState.server}
          labels={anchorMockStateLabels.server}
          onChange={(server) => update({ server })}
          title="Server"
        />
        <StateGroup<AnchorServerListState>
          current={mockState.serverList}
          labels={anchorMockStateLabels.serverList}
          onChange={(serverList) => update({ serverList })}
          title="Servers"
        />
        <StateGroup<AnchorLibraryState>
          current={mockState.library}
          labels={anchorMockStateLabels.library}
          onChange={(library) => update({ library })}
          title="Library"
        />
        <StateGroup<AnchorActivityState>
          current={mockState.activity}
          labels={anchorMockStateLabels.activity}
          onChange={(activity) => update({ activity })}
          title="Activity"
        />

        <section className="rounded-2xl border border-white/[0.065] bg-white/[0.035] p-3">
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-amber-200/75">
            Global
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <StateChip
              active={mockState.globalLoading}
              ariaLabel="Global: Loading overlay"
              label="Loading overlay"
              onClick={() => update({ globalLoading: !mockState.globalLoading })}
            />
            <StateChip
              active={mockState.globalDisabled}
              ariaLabel="Global: Disable primary actions"
              label="Disable primary actions"
              onClick={() => update({ globalDisabled: !mockState.globalDisabled })}
            />
            <StateChip active={false} ariaLabel="Global: Show toast" label="Show toast" onClick={onShowToast} />
            <StateChip active={false} ariaLabel="Global: Clear overlays" label="Clear overlays" onClick={onClearSurfaces} />
            <StateChip active={false} ariaLabel="Global: Reset all" label="Reset all" onClick={() => onStateChange(initialAnchorMockState)} />
          </div>
        </section>
      </div>
    </section>
  )
}
