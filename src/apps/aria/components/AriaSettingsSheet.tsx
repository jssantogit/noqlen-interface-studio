import { useState } from 'react'
import { HardDrive, Info, Music2, Palette, SlidersHorizontal, Volume2 } from 'lucide-react'
import { AriaBottomSheet } from './AriaBottomSheet'

type ActiveSource = {
  type: 'local' | 'server'
  name: string
  status: string
  detail: string
}

type SegmentOption<T extends string> = {
  label: string
  value: T
}

export function AriaSettingsSheet({
  activeSource,
  onClose,
  onOpenSource,
  onShowToast,
}: {
  activeSource: ActiveSource
  onClose: () => void
  onOpenSource: () => void
  onShowToast: (message: string) => void
}) {
  const [showSourceBadges, setShowSourceBadges] = useState(true)
  const [preferLosslessLabels, setPreferLosslessLabels] = useState(true)
  const [recentlyAddedScope, setRecentlyAddedScope] = useState<'tracks' | 'albums' | 'mixed'>('tracks')
  const [gapless, setGapless] = useState(false)
  const [loudnessNormalization, setLoudnessNormalization] = useState(false)
  const [crossfade, setCrossfade] = useState<'off' | 'short' | 'long'>('off')
  const [compactLists, setCompactLists] = useState(false)
  const [visualOnlyMode, setVisualOnlyMode] = useState(true)
  const [artworkEmphasis, setArtworkEmphasis] = useState<'balanced' | 'large' | 'minimal'>('balanced')

  const toggleSetting = (label: string, checked: boolean, setChecked: (checked: boolean) => void) => {
    const next = !checked
    setChecked(next)
    onShowToast(`${label}: ${next ? 'On' : 'Off'} (mock)`)
  }

  const setSegment = <T extends string>(label: string, value: T, setValue: (value: T) => void) => {
    setValue(value)
    onShowToast(`${label}: ${formatValue(value)} (mock)`)
  }

  return (
    <AriaBottomSheet onClose={onClose} subtitle="Mock-only preferences for this visual player." title="Aria Settings">
      <div className="space-y-5">
        <SourceStatusCard activeSource={activeSource} onOpenSource={onOpenSource} />

        <SettingsSection icon={<Music2 size={15} />} title="Library">
          <ToggleSetting checked={showSourceBadges} description="Show small source labels on library items." label="Show source badges" onToggle={() => toggleSetting('Show source badges', showSourceBadges, setShowSourceBadges)} />
          <ToggleSetting checked={preferLosslessLabels} description="Prefer FLAC and lossless badges where mock data has them." label="Prefer lossless labels" onToggle={() => toggleSetting('Prefer lossless labels', preferLosslessLabels, setPreferLosslessLabels)} />
          <SegmentedSetting
            description="Controls only the settings preview. Recently Added stays tracks-only in this block."
            label="Recently Added scope"
            onChange={(value) => setSegment('Recently Added scope', value, setRecentlyAddedScope)}
            options={[{ label: 'Tracks', value: 'tracks' }, { label: 'Albums', value: 'albums' }, { label: 'Mixed', value: 'mixed' }]}
            value={recentlyAddedScope}
          />
        </SettingsSection>

        <SettingsSection icon={<Volume2 size={15} />} title="Playback">
          <ToggleSetting checked={gapless} description="Visual preference only; no playback engine is connected." label="Gapless playback" onToggle={() => toggleSetting('Gapless playback', gapless, setGapless)} />
          <ToggleSetting checked={loudnessNormalization} description="Shows desired behavior without changing audio." label="Loudness normalization" onToggle={() => toggleSetting('Loudness normalization', loudnessNormalization, setLoudnessNormalization)} />
          <SegmentedSetting
            label="Crossfade"
            onChange={(value) => setSegment('Crossfade', value, setCrossfade)}
            options={[{ label: 'Off', value: 'off' }, { label: 'Short', value: 'short' }, { label: 'Long', value: 'long' }]}
            value={crossfade}
          />
        </SettingsSection>

        <SettingsSection icon={<Palette size={15} />} title="Interface">
          <ToggleSetting checked={compactLists} description="Preview state only; screens outside Settings do not change." label="Compact lists" onToggle={() => toggleSetting('Compact lists', compactLists, setCompactLists)} />
          <ToggleSetting checked={visualOnlyMode} description="Keeps Aria as a display-only simulator." label="Visual-only mode" onToggle={() => toggleSetting('Visual-only mode', visualOnlyMode, setVisualOnlyMode)} />
          <SegmentedSetting
            label="Artwork emphasis"
            onChange={(value) => setSegment('Artwork emphasis', value, setArtworkEmphasis)}
            options={[{ label: 'Balanced', value: 'balanced' }, { label: 'Large', value: 'large' }, { label: 'Minimal', value: 'minimal' }]}
            value={artworkEmphasis}
          />
        </SettingsSection>

        <InfoCard />
      </div>
    </AriaBottomSheet>
  )
}

function SourceStatusCard({ activeSource, onOpenSource }: { activeSource: ActiveSource; onOpenSource: () => void }) {
  return (
    <section className="rounded-[22px] border border-[#f0a13d]/16 bg-[radial-gradient(circle_at_0%_0%,rgba(240,161,61,0.15),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f0a13d]/15 text-[#f0a13d]">
          <HardDrive size={21} strokeWidth={1.7} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0a13d]">Active Source</p>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.055] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#d7cabe]">{activeSource.type}</span>
          </div>
          <h3 className="mt-1 truncate text-[17px] font-semibold text-[#fff3e4]">{activeSource.name}</h3>
          <p className="mt-0.5 text-[11px] font-semibold text-[#65e985]">{activeSource.status}</p>
          <p className="mt-1 text-[12px] leading-5 text-[#b9b1a7]">{activeSource.detail}</p>
        </div>
      </div>
      <button className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[13px] font-bold text-[#1b1109] shadow-[0_10px_20px_rgba(240,161,61,0.18)] transition active:scale-[0.98]" onClick={onOpenSource} type="button">
        <SlidersHorizontal size={15} /> Manage Source
      </button>
    </section>
  )
}

function SettingsSection({ children, icon, title }: { children: React.ReactNode; icon: React.ReactNode; title: string }) {
  return (
    <section>
      <div className="flex items-center gap-2 px-1 text-[#f0a13d]">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f0a13d]/12">{icon}</span>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.24em]">{title}</h3>
      </div>
      <div className="mt-2 space-y-2.5 rounded-[22px] border border-white/[0.075] bg-white/[0.03] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {children}
      </div>
    </section>
  )
}

function ToggleSetting({ checked, description, label, onToggle }: { checked: boolean; description?: string; label: string; onToggle: () => void }) {
  return (
    <button aria-pressed={checked} className="flex w-full items-center gap-3 rounded-[18px] bg-white/[0.035] px-3 py-2.5 text-left transition hover:bg-white/[0.055]" onClick={onToggle} type="button">
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold leading-tight text-[#fff3e4]">{label}</span>
        {description ? <span className="mt-1 block text-[11px] leading-4 text-[#b9b1a7]">{description}</span> : null}
      </span>
      <span className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition ${checked ? 'bg-[#f0a13d]' : 'bg-white/[0.12]'}`} role="switch" aria-checked={checked}>
        <span className={`h-5 w-5 rounded-full bg-[#0d1218] shadow transition ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </span>
    </button>
  )
}

function SegmentedSetting<T extends string>({ description, label, onChange, options, value }: { description?: string; label: string; onChange: (value: T) => void; options: SegmentOption<T>[]; value: T }) {
  return (
    <div className="rounded-[18px] bg-white/[0.035] p-3">
      <div>
        <p className="text-[14px] font-semibold leading-tight text-[#fff3e4]">{label}</p>
        {description ? <p className="mt-1 text-[11px] leading-4 text-[#b9b1a7]">{description}</p> : null}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1 rounded-full bg-black/20 p-1">
        {options.map((option) => {
          const active = option.value === value
          return (
            <button className={`rounded-full px-2 py-1.5 text-[11px] font-bold transition ${active ? 'bg-[#f0a13d] text-[#1b1109]' : 'text-[#c9beb2] hover:bg-white/[0.07]'}`} key={option.value} onClick={() => onChange(option.value)} type="button">
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function InfoCard() {
  const facts = ['Visual mock only', 'No backend connected', 'Local state only', 'No filesystem access', 'No server sync']

  return (
    <section className="rounded-[22px] border border-white/[0.075] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-3.5">
      <div className="flex items-center gap-2 text-[#f0a13d]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f0a13d]/12">
          <Info size={15} />
        </span>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em]">About</h3>
      </div>
      <h4 className="mt-3 text-[15px] font-semibold text-[#fff3e4]">Mock-only simulator</h4>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {facts.map((fact) => (
          <span className="rounded-full border border-white/[0.075] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#cfc3b8]" key={fact}>{fact}</span>
        ))}
      </div>
    </section>
  )
}

function formatValue(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1)
}
