import { Check } from 'lucide-react'
import { mockScenarioGroups, mockScenarioLabels, type ForgeMockScenario } from '../forgeMockState'

export function ForgeMockStatePanel({
  activeScenario,
  onChange,
}: {
  activeScenario: ForgeMockScenario
  onChange: (scenario: ForgeMockScenario) => void
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="text-sm font-semibold text-white">States</div>
          <span className="rounded-md bg-orange-300/10 px-2 py-0.5 text-[10px] font-semibold text-orange-300/80">
            Local
          </span>
        </div>
        <p className="mb-3 text-[11px] leading-4 text-orange-100/50">
          Select a scenario to see how Forge surfaces behave under different conditions.
        </p>

        <div className="space-y-3">
          {mockScenarioGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/35">{group.label}</p>
              <div className="space-y-1">
                {group.scenarios.map((scenario) => {
                  const active = activeScenario === scenario
                  return (
                    <button
                      key={scenario}
                      className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${
                        active
                          ? 'border-[#e7a35f]/25 bg-[#e7a35f]/10 text-[#f0b879]'
                          : 'border-white/[0.04] bg-white/[0.02] text-white/65 hover:bg-white/[0.04]'
                      }`}
                      onClick={() => onChange(scenario)}
                      type="button"
                    >
                      <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[9px] transition ${active ? 'border-[#e7a35f] bg-[#e7a35f] text-[#211508]' : 'border-white/20 text-transparent'}`}>
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      <span className="text-[11px] font-medium">{mockScenarioLabels[scenario]}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] text-[11px] font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white/85"
          onClick={() => onChange('normal')}
          type="button"
        >
          Reset to Normal
        </button>
      </div>
    </div>
  )
}
