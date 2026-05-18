import { ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronDown, ChevronRight, Image, Music2, Search, ShieldAlert, SlidersHorizontal, Tags, Text, Users, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { artistData, albumData, songData } from '../forgeMockData'
import { CoverGradient, ForgeCard, ForgeScreenHeader } from './ForgeCard'

export interface EnrichCategory {
  id: 'tags' | 'covers' | 'lyrics' | 'advanced'
  label: string
  description: string
  options: EnrichOption[]
}

export interface EnrichOption {
  id: string
  label: string
  checked: boolean
}

export interface EnrichTarget {
  mode: 'library' | 'artists' | 'albums' | 'songs'
  selectedIds: Set<string>
}

export interface EnrichResultSummary {
  changed: number
  rewritten: number
  sentToReview: number
  protectedSkipped: number
  tagsCount: number
  coversCount: number
  lyricsCount: number
  advancedCount: number
}

type EnrichStep = 'options' | 'targets' | 'confirm' | 'dryrun' | 'progress' | 'result'

const enrichCategories: EnrichCategory[] = [
  {
    id: 'tags',
    label: 'Tags',
    description: 'Genre, style, mood and Last.fm tags.',
    options: [
      { id: 'genre', label: 'Genre', checked: false },
      { id: 'style', label: 'Style', checked: false },
      { id: 'mood', label: 'Mood', checked: false },
      { id: 'lastfm', label: 'Last.fm Tags', checked: false },
    ],
  },
  {
    id: 'covers',
    label: 'Covers',
    description: 'Album covers and artist images.',
    options: [
      { id: 'missing', label: 'Missing covers', checked: false },
      { id: 'lowres', label: 'Low-resolution covers', checked: false },
      { id: 'artist', label: 'Artist images', checked: false },
    ],
  },
  {
    id: 'lyrics',
    label: 'Lyrics',
    description: 'Plain lyrics, synced lyrics and sidecar LRC.',
    options: [
      { id: 'missing', label: 'Missing lyrics', checked: false },
      { id: 'incomplete', label: 'Incomplete lyrics', checked: false },
      { id: 'synced', label: 'Synced lyrics', checked: false },
      { id: 'sidecar', label: 'Sidecar .lrc', checked: false },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced Metadata',
    description: 'Identity, release and audio metadata.',
    options: [
      { id: 'identity', label: 'Identity IDs', checked: false },
      { id: 'release', label: 'Release data', checked: false },
      { id: 'audio', label: 'Audio analysis', checked: false },
      { id: 'replaygain', label: 'ReplayGain', checked: false },
    ],
  },
]

const providerHints: Record<string, string[]> = {
  tags: ['Last.fm'],
  covers: ['Discogs', 'MusicBrainz'],
  lyrics: ['Lyrics mock'],
  advanced: ['MusicBrainz', 'AcoustID', 'Audio analysis mock'],
}

const minImageSizes = ['600px', '1000px', '1400px']

function StepIndicator({ steps, currentIndex }: { steps: string[]; currentIndex: number }) {
  return (
    <div className="mb-6 flex items-center gap-1.5 overflow-x-auto px-1 pb-1">
      {steps.map((step, idx) => {
        const isCurrent = idx === currentIndex
        const isPast = idx < currentIndex
        return (
          <div className="flex items-center gap-1.5" key={step}>
            <span
              className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                isCurrent
                  ? 'bg-[#e7a35f]/15 text-[#e7a35f]'
                  : isPast
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'bg-white/[0.04] text-white/30'
              }`}
            >
              {isPast ? <Check size={10} className="mr-1 inline" /> : null}
              {step}
            </span>
            {idx < steps.length - 1 && (
              <ChevronRight size={10} className={isPast ? 'text-emerald-300/50' : 'text-white/15'} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function CategoryToggle({
  category,
  options,
  overwrite,
  expanded,
  onToggleOption,
  onToggleOverwrite,
  onToggleExpand,
}: {
  category: EnrichCategory
  options: EnrichOption[]
  overwrite: boolean
  expanded: boolean
  onToggleOption: (optionId: string) => void
  onToggleOverwrite: () => void
  onToggleExpand: () => void
}) {
  const selectedCount = options.filter((o) => o.checked).length
  const totalCount = options.length
  const allSelected = selectedCount === totalCount && totalCount > 0

  const statusLabel = allSelected ? 'All selected' : `${selectedCount} selected`

  return (
    <ForgeCard className="mb-2.5 overflow-hidden">
      <button
        className="flex w-full items-center justify-between gap-3 p-3 text-left transition hover:bg-white/[0.02]"
        onClick={onToggleExpand}
        type="button"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white">{category.label}</p>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                selectedCount > 0
                  ? 'bg-[#e7a35f]/15 text-[#f0b879]'
                  : 'bg-white/[0.05] text-white/35'
              }`}
            >
              {statusLabel}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] leading-4 text-white/45">{category.description}</p>
        </div>
        <ChevronDown
          size={16}
          className={`shrink-0 text-white/30 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="px-3 pb-3">
          <div className="mb-3 space-y-1.5">
            {options.map((opt) => (
              <label
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2 transition hover:bg-white/[0.04]"
                key={opt.id}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[9px] transition ${
                    opt.checked
                      ? 'border-[#e7a35f] bg-[#e7a35f] text-[#211508]'
                      : 'border-white/25 text-transparent hover:border-white/45'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleOption(opt.id)
                  }}
                  type="button"
                >
                  <Check size={11} strokeWidth={2.5} />
                </button>
                <span className="text-xs text-white/75">{opt.label}</span>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
            <div>
              <p className="text-[11px] font-medium text-white/70">
                {category.id === 'tags'
                  ? 'Replace existing tag values'
                  : category.id === 'covers'
                    ? 'Replace existing artwork'
                    : category.id === 'lyrics'
                      ? 'Replace existing lyrics'
                      : 'Replace protected identity fields'}
              </p>
              <p className="mt-0.5 text-[10px] text-white/40">
                {category.id === 'advanced'
                  ? 'Advanced metadata can rewrite identity, release and audio fields. Protected fields should usually stay unchanged unless the source is verified.'
                  : 'Existing values will be overwritten in the mock preview.'}
              </p>
            </div>
            <button
              className={`relative h-5 w-9 shrink-0 rounded-full transition ${overwrite ? 'bg-[#e7a35f]' : 'bg-white/15'}`}
              onClick={(e) => {
                e.stopPropagation()
                onToggleOverwrite()
              }}
              type="button"
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${overwrite ? 'left-4.5' : 'left-0.5'}`}
              />
            </button>
          </div>

          {category.id === 'covers' && selectedCount > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[10px] font-medium text-white/50">Minimum image size</p>
              <div className="flex gap-2">
                {minImageSizes.map((size) => (
                  <span
                    className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/55"
                    key={size}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {category.id === 'advanced' && overwrite && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-orange-300/15 bg-orange-300/8 p-2.5">
              <ShieldAlert size={13} className="mt-0.5 shrink-0 text-orange-300/80" />
              <p className="text-[10px] leading-4 text-orange-200/75">
                Only enable this when MusicBrainz or AcoustID identity is trusted.
              </p>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {providerHints[category.id]?.map((p) => (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-[#e7a35f]/12 bg-[#e7a35f]/8 px-2 py-0.5 text-[10px] font-medium text-[#f0b879]/80"
                key={p}
              >
                <BadgeCheck size={9} />
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </ForgeCard>
  )
}

function TargetSelection({
  target,
  searchQuery,
  onSetTarget,
  onToggleId,
  onToggleAllVisible,
  onClearSelection,
  onSearch,
}: {
  target: EnrichTarget
  searchQuery: string
  onSetTarget: (mode: EnrichTarget['mode']) => void
  onToggleId: (id: string) => void
  onToggleAllVisible: (ids: string[]) => void
  onClearSelection: () => void
  onSearch: (q: string) => void
}) {
  const tabs: { id: EnrichTarget['mode']; label: string }[] = [
    { id: 'library', label: 'Library' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
    { id: 'songs', label: 'Songs' },
  ]

  const filteredArtists = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return artistData.filter((a) => a.name.toLowerCase().includes(q))
  }, [searchQuery])

  const filteredAlbums = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return albumData.filter((a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q))
  }, [searchQuery])

  const filteredSongs = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return songData.filter((s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q))
  }, [searchQuery])

  const allVisibleIds = useMemo(() => {
    if (target.mode === 'artists') return filteredArtists.map((a) => a.id)
    if (target.mode === 'albums') return filteredAlbums.map((a) => a.id)
    if (target.mode === 'songs') return filteredSongs.map((s) => s.id)
    return []
  }, [target.mode, filteredArtists, filteredAlbums, filteredSongs])

  const isAllVisibleSelected = allVisibleIds.length > 0 && allVisibleIds.every((id) => target.selectedIds.has(id))

  return (
    <div>
      <div className="mb-4 grid grid-cols-4 rounded-2xl border border-white/[0.07] bg-black/18 p-1">
        {tabs.map((tab) => (
          <button
            className={`h-8 rounded-xl text-[12px] font-medium transition ${
              target.mode === tab.id
                ? 'border border-[#e7a35f]/20 bg-[#e7a35f]/10 text-[#e7a35f]'
                : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
            }`}
            key={tab.id}
            onClick={() => onSetTarget(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {target.mode !== 'library' && (
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
          <Search size={14} className="text-white/35" />
          <input
            className="min-w-0 flex-1 bg-transparent text-xs text-white placeholder-white/30 outline-none"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            type="text"
            value={searchQuery}
          />
        </div>
      )}

      {target.mode === 'library' && (
        <ForgeCard
          className="mb-3 p-4"
          onClick={() => {
            onSetTarget('library')
            onClearSelection()
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Entire library</p>
              <p className="mt-1 text-[11px] text-white/50">1,248 tracks · 96 albums · 42 artists</p>
            </div>
            <div
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] transition ${
                target.mode === 'library' && target.selectedIds.size === 0
                  ? 'border-[#e7a35f] bg-[#e7a35f] text-[#211508]'
                  : 'border-white/25 text-transparent'
              }`}
            >
              <Check size={12} strokeWidth={2.5} />
            </div>
          </div>
        </ForgeCard>
      )}

      {target.mode !== 'library' && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] text-white/40">
              {target.selectedIds.size} selected
            </p>
            <div className="flex gap-2">
              <button
                className="text-[10px] font-medium text-[#f0b879]/70 transition hover:text-[#f0b879]"
                onClick={() => onToggleAllVisible(allVisibleIds)}
                type="button"
              >
                {isAllVisibleSelected ? 'Deselect all' : 'Select all visible'}
              </button>
              <button
                className="text-[10px] font-medium text-white/40 transition hover:text-white/70"
                onClick={onClearSelection}
                type="button"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {target.mode === 'artists' &&
              filteredArtists.map((artist) => (
                <TargetRow
                  checked={target.selectedIds.has(artist.id)}
                  gradient={undefined}
                  id={artist.id}
                  key={artist.id}
                  meta={`${artist.subtitle}`}
                  onToggle={() => onToggleId(artist.id)}
                  title={artist.name}
                />
              ))}
            {target.mode === 'albums' &&
              filteredAlbums.map((album) => (
                <TargetRow
                  checked={target.selectedIds.has(album.id)}
                  gradient={album.coverGradient}
                  id={album.id}
                  key={album.id}
                  meta={`${album.artist} · ${album.year}`}
                  onToggle={() => onToggleId(album.id)}
                  title={album.title}
                />
              ))}
            {target.mode === 'songs' &&
              filteredSongs.map((song) => (
                <TargetRow
                  checked={target.selectedIds.has(song.id)}
                  gradient={undefined}
                  id={song.id}
                  key={song.id}
                  meta={`${song.artist} · ${song.album}`}
                  onToggle={() => onToggleId(song.id)}
                  title={song.title}
                />
              ))}
          </div>

          {target.mode === 'artists' && filteredArtists.length === 0 && <EmptySearch />}
          {target.mode === 'albums' && filteredAlbums.length === 0 && <EmptySearch />}
          {target.mode === 'songs' && filteredSongs.length === 0 && <EmptySearch />}
        </>
      )}
    </div>
  )
}

function TargetRow({
  id,
  title,
  meta,
  gradient,
  checked,
  onToggle,
}: {
  id: string
  title: string
  meta: string
  gradient?: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2.5 transition hover:bg-white/[0.04]">
      <button
        className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[9px] transition ${
          checked ? 'border-[#e7a35f] bg-[#e7a35f] text-[#211508]' : 'border-white/25 text-transparent hover:border-white/45'
        }`}
        onClick={onToggle}
        type="button"
      >
        <Check size={11} strokeWidth={2.5} />
      </button>
      {gradient ? (
        <CoverGradient className="h-9 w-9 shrink-0 rounded-lg" gradient={gradient} />
      ) : (
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06]">
          {id.startsWith('nils') || id.startsWith('vola') || id.startsWith('chon') ? (
            <Users size={14} className="text-white/35" />
          ) : (
            <Music2 size={14} className="text-white/35" />
          )}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-white/85">{title}</p>
        <p className="truncate text-[10px] text-white/45">{meta}</p>
      </div>
    </div>
  )
}

function EmptySearch() {
  return (
    <div className="py-6 text-center">
      <p className="text-xs text-white/40">No results found</p>
    </div>
  )
}

function ConfirmationSummary({
  categories,
  overwrite,
  target,
}: {
  categories: EnrichCategory[]
  overwrite: Record<string, boolean>
  target: EnrichTarget
}) {
  const activeCategories = categories.filter((c) => c.options.some((o) => o.checked))
  const targetLabel =
    target.mode === 'library'
      ? 'Entire library'
      : target.mode === 'artists'
        ? `${target.selectedIds.size} artists`
        : target.mode === 'albums'
          ? `${target.selectedIds.size} albums`
          : `${target.selectedIds.size} songs`

  return (
    <div className="space-y-3">
      <ForgeCard className="p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">Selected categories</p>
        <div className="flex flex-wrap gap-2">
          {activeCategories.map((c) => (
            <span
              className="rounded-lg bg-[#e7a35f]/12 px-2.5 py-1 text-[11px] font-medium text-[#e7a35f]"
              key={c.id}
            >
              {c.label}
            </span>
          ))}
        </div>
      </ForgeCard>

      <ForgeCard className="p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">Target</p>
        <p className="text-sm font-medium text-white/85">{targetLabel}</p>
      </ForgeCard>

      <ForgeCard className="p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">Overwrite options</p>
        <div className="space-y-1">
          {Object.entries(overwrite).map(([key, val]) => (
            <p className="text-xs text-white/60" key={key}>
              {key}: <span className={val ? 'text-orange-300/80' : 'text-emerald-300/70'}>{val ? 'Enabled' : 'Disabled'}</span>
            </p>
          ))}
        </div>
      </ForgeCard>

      <div className="flex items-start gap-2 rounded-xl border border-orange-300/12 bg-orange-300/6 p-3">
        <ShieldAlert size={14} className="mt-0.5 shrink-0 text-orange-300/70" />
        <div>
          <p className="text-xs font-medium text-orange-200/80">This is a force rewrite workflow.</p>
          <p className="mt-0.5 text-[11px] leading-4 text-orange-200/55">
            Studio preview will not change real files. In the real app, this must run as dry-run before apply.
          </p>
        </div>
      </div>
    </div>
  )
}

function DryRunProgress({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [step, setStep] = useState(0)
  const steps = [
    'Preparing selected targets',
    'Checking current metadata',
    'Comparing provider suggestions',
    'Finding fields that would be overwritten',
    'Building rewrite plan',
  ]

  useMemo(() => {
    const timers = steps.map((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 700))
    timers.push(setTimeout(() => onComplete(), (steps.length + 1) * 700))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-4">
      <p className="text-xs text-white/50">Dry-run preview only. No files are changed.</p>
      <div className="space-y-2.5">
        {steps.map((s, i) => {
          const active = i === step
          const done = i < step
          return (
            <div
              className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                active ? 'border-[#e7a35f]/25 bg-[#e7a35f]/10' : done ? 'border-emerald-300/15 bg-emerald-300/[0.04]' : 'border-white/[0.04] bg-white/[0.02]'
              }`}
              key={s}
            >
              <div
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                  done ? 'bg-emerald-400/12 text-emerald-300' : active ? 'bg-[#e7a35f]/15 text-[#e7a35f]' : 'bg-white/[0.05] text-white/30'
                }`}
              >
                {done ? <Check size={12} /> : i + 1}
              </div>
              <span className={`text-sm ${active ? 'text-white' : done ? 'text-emerald-200/60' : 'text-white/30'}`}>{s}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DryRunResult({
  onStartRewrite,
  onReviewConflicts,
  onBack,
}: {
  onStartRewrite: () => void
  onReviewConflicts: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[#e7a35f]/12">
          <SlidersHorizontal size={22} className="text-[#f0b879]" />
        </div>
        <p className="text-sm font-medium text-white">Dry-run complete</p>
      </div>

      <ForgeCard className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-lg font-semibold text-white">248</p>
            <p className="text-[10px] text-white/45">tracks scanned</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">612</p>
            <p className="text-[10px] text-white/45">fields would be rewritten</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">138</p>
            <p className="text-[10px] text-white/45">existing values replaced</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">18</p>
            <p className="text-[10px] text-white/45">protected fields need review</p>
          </div>
          <div className="col-span-2 border-t border-white/[0.05] pt-3">
            <p className="text-lg font-semibold text-white">74</p>
            <p className="text-[10px] text-white/45">conflicts found</p>
          </div>
        </div>
      </ForgeCard>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075]"
          onClick={onBack}
          type="button"
        >
          Back
        </button>
        <button
          className="h-10 rounded-lg bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]"
          onClick={onStartRewrite}
          type="button"
        >
          Start rewrite
        </button>
      </div>
      <button
        className="w-full rounded-lg border border-white/[0.075] bg-transparent py-2.5 text-xs font-medium text-white/55 transition hover:bg-white/[0.045] hover:text-white/80"
        onClick={onReviewConflicts}
        type="button"
      >
        Review conflicts
      </button>
    </div>
  )
}

function RewriteProgress({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const steps = [
    'Preparing rewrite plan',
    'Rewriting tag values',
    'Updating artwork selections',
    'Updating lyrics data',
    'Processing advanced metadata',
    'Recording mock activity',
    'Finalizing result',
  ]

  useMemo(() => {
    const timers = steps.map((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 650))
    timers.push(setTimeout(() => onComplete(), (steps.length + 1) * 650))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-4">
      <p className="text-xs text-white/50">Mock preview only. No files are changed.</p>
      <div className="space-y-2.5">
        {steps.map((s, i) => {
          const active = i === step
          const done = i < step
          return (
            <div
              className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                active ? 'border-[#e7a35f]/25 bg-[#e7a35f]/10' : done ? 'border-emerald-300/15 bg-emerald-300/[0.04]' : 'border-white/[0.04] bg-white/[0.02]'
              }`}
              key={s}
            >
              <div
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                  done ? 'bg-emerald-400/12 text-emerald-300' : active ? 'bg-[#e7a35f]/15 text-[#e7a35f]' : 'bg-white/[0.05] text-white/30'
                }`}
              >
                {done ? <Check size={12} /> : i + 1}
              </div>
              <span className={`text-sm ${active ? 'text-white' : done ? 'text-emerald-200/60' : 'text-white/30'}`}>{s}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ResultScreen({
  result,
  onViewReview,
  onViewActivity,
  onDone,
}: {
  result: EnrichResultSummary
  onViewReview: () => void
  onViewActivity: () => void
  onDone: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-400/12">
          <Check size={24} className="text-emerald-300" />
        </div>
        <p className="text-sm font-medium text-white">Enrich Mode complete</p>
      </div>

      <ForgeCard className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-lg font-semibold text-white">{result.changed}</p>
            <p className="text-[10px] text-white/45">mock changes applied</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{result.rewritten}</p>
            <p className="text-[10px] text-white/45">existing values rewritten</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{result.sentToReview}</p>
            <p className="text-[10px] text-white/45">items sent to Review</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{result.protectedSkipped}</p>
            <p className="text-[10px] text-white/45">protected fields skipped</p>
          </div>
          <div className="col-span-2 border-t border-white/[0.05] pt-3">
            <p className="text-[11px] text-white/50">0 real files changed</p>
          </div>
        </div>
      </ForgeCard>

      <div className="space-y-2">
        <ForgeCard className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Tags size={14} className="text-[#e7a35f]" />
            <span className="text-xs text-white/75">Tags rewritten</span>
          </div>
          <span className="text-xs font-semibold text-[#f0b879]">{result.tagsCount}</span>
        </ForgeCard>
        <ForgeCard className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Image size={14} className="text-[#e7a35f]" />
            <span className="text-xs text-white/75">Covers updated</span>
          </div>
          <span className="text-xs font-semibold text-[#f0b879]">{result.coversCount}</span>
        </ForgeCard>
        <ForgeCard className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Text size={14} className="text-[#e7a35f]" />
            <span className="text-xs text-white/75">Lyrics updated</span>
          </div>
          <span className="text-xs font-semibold text-[#f0b879]">{result.lyricsCount}</span>
        </ForgeCard>
        <ForgeCard className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#e7a35f]" />
            <span className="text-xs text-white/75">Advanced metadata processed</span>
          </div>
          <span className="text-xs font-semibold text-[#f0b879]">{result.advancedCount}</span>
        </ForgeCard>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075]"
          onClick={onViewReview}
          type="button"
        >
          View Review queue
        </button>
        <button
          className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075]"
          onClick={onViewActivity}
          type="button"
        >
          View Activity
        </button>
      </div>
      <button
        className="w-full rounded-lg bg-[#e7a35f] py-2.5 text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]"
        onClick={onDone}
        type="button"
      >
        Done
      </button>
    </div>
  )
}

export function ForgeEnrichMode({
  onClose,
  onViewReview,
  onViewActivity,
  onOpenSettings,
  showToast,
  appendActivity,
  markSafeItemsApplied,
}: {
  onClose: () => void
  onViewReview: () => void
  onViewActivity: () => void
  onOpenSettings?: () => void
  showToast: (message: string, tone?: 'success' | 'info' | 'warning') => void
  appendActivity: (entry: {
    id: string
    title: string
    subtitle: string
    time: string
    icon: 'CheckCircle2' | 'Image' | 'Tags' | 'Clock3' | 'Check' | 'AlertTriangle' | 'Music2'
    accent: string
    bgAccent: string
    summary: string[]
    detail: string
    activityType: 'lyrics' | 'artwork' | 'tags' | 'identity' | 'release' | 'audio' | 'libraryEdit' | 'libraryCheck' | 'error'
    dateGroup: 'today' | 'yesterday'
    affectedCount: number
    affectedItems: string[]
    changedFields?: string[]
    provider?: string
    status: 'completed' | 'pendingReview' | 'warning' | 'failed'
    relatedReviewTarget?: 'all' | 'artwork' | 'lyrics' | 'metadata' | 'metadata/tags' | 'metadata/identity' | 'metadata/release' | 'metadata/audio'
  }) => void
  markSafeItemsApplied?: () => void
}) {
  const [step, setStep] = useState<EnrichStep>('options')
  const [categories, setCategories] = useState<EnrichCategory[]>(
    enrichCategories.map((c) => ({ ...c, options: c.options.map((o) => ({ ...o })) })),
  )
  const [overwrite, setOverwrite] = useState<Record<string, boolean>>({
    tags: false,
    covers: false,
    lyrics: false,
    advanced: false,
  })
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    tags: true,
    covers: false,
    lyrics: false,
    advanced: false,
  })
  const [target, setTarget] = useState<EnrichTarget>({ mode: 'library', selectedIds: new Set() })
  const [searchQuery, setSearchQuery] = useState('')
  const [dryRunComplete, setDryRunComplete] = useState(false)
  const [result, setResult] = useState<EnrichResultSummary | null>(null)

  const stepLabels = ['Options', 'Targets', 'Confirm', 'Dry-run', 'Apply']
  const stepIndex = step === 'options' ? 0 : step === 'targets' ? 1 : step === 'confirm' ? 2 : step === 'dryrun' ? 3 : step === 'progress' ? 4 : 5

  const anyOptionSelected = categories.some((c) => c.options.some((o) => o.checked))

  const canContinueTargets = target.mode === 'library' || target.selectedIds.size > 0

  const toggleOption = (catId: string, optId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, options: c.options.map((o) => (o.id === optId ? { ...o, checked: !o.checked } : o)) }
          : c,
      ),
    )
  }

  const toggleOverwrite = (catId: string) => {
    setOverwrite((prev) => ({ ...prev, [catId]: !prev[catId] }))
  }

  const toggleExpand = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }))
  }

  const setTargetMode = (mode: EnrichTarget['mode']) => {
    setTarget({ mode, selectedIds: new Set() })
    setSearchQuery('')
  }

  const toggleTargetId = (id: string) => {
    setTarget((prev) => {
      const next = new Set(prev.selectedIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { ...prev, selectedIds: next }
    })
  }

  const toggleAllVisible = (ids: string[]) => {
    setTarget((prev) => {
      const next = new Set(prev.selectedIds)
      const allSelected = ids.every((id) => next.has(id))
      if (allSelected) {
        ids.forEach((id) => next.delete(id))
      } else {
        ids.forEach((id) => next.add(id))
      }
      return { ...prev, selectedIds: next }
    })
  }

  const clearSelection = () => {
    setTarget((prev) => ({ ...prev, selectedIds: new Set() }))
  }

  const runDryRun = () => {
    setDryRunComplete(false)
    setStep('dryrun')
  }

  const startRewrite = () => {
    setStep('progress')
  }

  const completeRewrite = () => {
    const mockResult: EnrichResultSummary = {
      changed: 438,
      rewritten: 138,
      sentToReview: 74,
      protectedSkipped: 18,
      tagsCount: 124,
      coversCount: 96,
      lyricsCount: 112,
      advancedCount: 106,
    }
    setResult(mockResult)
    setStep('result')

    // Append activity
    const now = new Date()
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
    appendActivity({
      id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: 'Enrich Mode completed',
      subtitle: 'Source: Forge mock',
      time: timeStr,
      icon: 'CheckCircle2',
      accent: 'text-emerald-300',
      bgAccent: 'bg-emerald-400/13',
      summary: ['Tags', 'Covers', 'Lyrics', 'Metadata'],
      detail: `Enrich Mode rewrite completed in mock preview. ${mockResult.changed} changes applied, ${mockResult.rewritten} existing values rewritten, ${mockResult.sentToReview} items sent to Review, ${mockResult.protectedSkipped} protected fields skipped. No real files changed.`,
      activityType: 'libraryCheck',
      dateGroup: 'today',
      affectedCount: mockResult.changed,
      affectedItems: ['Tags', 'Covers', 'Lyrics', 'Advanced metadata'],
      changedFields: ['Tags', 'Covers', 'Lyrics', 'Metadata'],
      provider: 'Forge mock',
      status: 'completed',
      relatedReviewTarget: 'all',
    })

    markSafeItemsApplied?.()
    showToast('Enrich Mode completed in mock preview')
  }

  const handleReviewConflicts = () => {
    onClose()
    onViewReview()
    showToast('Conflicts sent to Review queue', 'info')
  }

  const handleViewReview = () => {
    onClose()
    onViewReview()
  }

  const handleViewActivity = () => {
    onClose()
    onViewActivity()
  }

  const handleDone = () => {
    onClose()
  }

  const openSettings = () => {
    if (onOpenSettings) {
      onOpenSettings()
    } else {
      showToast('Forge Settings opened', 'info')
    }
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[radial-gradient(circle_at_40%_0%,rgba(255,200,150,.08),transparent_35%),linear-gradient(180deg,#0f0c0a,#080604_70%)] text-white">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        {step !== 'result' && step !== 'progress' && (
          <button
            className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
            onClick={() => {
              if (step === 'options') onClose()
              else if (step === 'targets') setStep('options')
              else if (step === 'confirm') setStep('targets')
              else if (step === 'dryrun') setStep('confirm')
            }}
            type="button"
          >
            {step === 'options' ? <X size={16} /> : <ArrowLeft size={16} />}
          </button>
        )}
        {step !== 'result' && step !== 'progress' && <div className="w-8" />}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pb-8">
        {step !== 'progress' && step !== 'result' && (
          <StepIndicator currentIndex={stepIndex} steps={stepLabels} />
        )}

        {step === 'options' && (
          <div>
            <div className="sticky top-0 z-10 -mx-5 mb-5 bg-[#0f0c0a]/90 px-5 py-3 backdrop-blur-xl">
              <ForgeScreenHeader title="Enrich Mode" />
              <p className="-mt-5 text-sm leading-5 text-white/52">
                Choose what Forge should rewrite.
              </p>
              <p className="mt-1 text-[11px] text-white/40">
                Reprocess selected metadata using current provider settings.
              </p>
            </div>

            {categories.map((cat) => (
              <CategoryToggle
                category={cat}
                expanded={expandedCategories[cat.id] ?? false}
                key={cat.id}
                onToggleExpand={() => toggleExpand(cat.id)}
                onToggleOption={(optId) => toggleOption(cat.id, optId)}
                onToggleOverwrite={() => toggleOverwrite(cat.id)}
                options={cat.options}
                overwrite={overwrite[cat.id]}
              />
            ))}

            {!anyOptionSelected && (
              <p className="mt-2 text-xs text-orange-300/70">Select at least one rewrite option to continue.</p>
            )}

            <button
              className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 text-left transition hover:bg-white/[0.04]"
              onClick={openSettings}
              type="button"
            >
              <span className="text-[11px] text-white/50">Using current mock provider settings</span>
              <span className="text-[11px] font-medium text-[#f0b879] transition hover:text-[#efad6c]">
                Open Forge Settings →
              </span>
            </button>
          </div>
        )}

        {step === 'targets' && (
          <div>
            <ForgeScreenHeader title="Choose target" />
            <p className="-mt-5 mb-5 text-sm leading-5 text-white/52">
              Select where Enrich Mode should rewrite metadata.
            </p>
            <TargetSelection
              onClearSelection={clearSelection}
              onSearch={setSearchQuery}
              onSetTarget={setTargetMode}
              onToggleAllVisible={toggleAllVisible}
              onToggleId={toggleTargetId}
              searchQuery={searchQuery}
              target={target}
            />
            {!canContinueTargets && (
              <p className="mt-2 text-xs text-orange-300/70">Select the entire library or at least one item.</p>
            )}
          </div>
        )}

        {step === 'confirm' && (
          <div>
            <ForgeScreenHeader title="Confirm rewrite" />
            <p className="-mt-5 mb-5 text-sm leading-5 text-white/52">
              Enrich Mode can replace existing metadata depending on your selected options.
            </p>
            <ConfirmationSummary categories={categories} overwrite={overwrite} target={target} />
          </div>
        )}

        {step === 'dryrun' && !dryRunComplete && (
          <div>
            <ForgeScreenHeader title="Dry-run" />
            <p className="-mt-5 mb-5 text-sm leading-5 text-white/52">Planning what would change before applying.</p>
            <DryRunProgress onComplete={() => setDryRunComplete(true)} />
          </div>
        )}

        {step === 'dryrun' && dryRunComplete && (
          <div>
            <ForgeScreenHeader title="Dry-run result" />
            <p className="-mt-5 mb-5 text-sm leading-5 text-white/52">Review what would be rewritten.</p>
            <DryRunResult
              onBack={() => setStep('confirm')}
              onReviewConflicts={handleReviewConflicts}
              onStartRewrite={startRewrite}
            />
          </div>
        )}

        {step === 'progress' && (
          <div className="pt-8">
            <div className="mb-6 text-center">
              <p className="font-serif text-xl text-white">Rewriting metadata</p>
              <p className="mt-1 text-xs text-white/50">Mock preview only. No files are changed.</p>
            </div>
            <RewriteProgress onComplete={completeRewrite} />
          </div>
        )}

        {step === 'result' && result && (
          <div className="pt-4">
            <ResultScreen
              onDone={handleDone}
              onViewActivity={handleViewActivity}
              onViewReview={handleViewReview}
              result={result}
            />
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      {(step === 'options' || step === 'targets' || step === 'confirm') && (
        <div className="shrink-0 border-t border-white/[0.06] bg-[#0a0806]/80 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              className="h-10 rounded-xl border border-white/[0.075] bg-white/[0.045] px-4 text-sm font-medium text-white transition hover:bg-white/[0.075]"
              onClick={() => {
                if (step === 'options') onClose()
                else if (step === 'targets') setStep('options')
                else if (step === 'confirm') setStep('targets')
              }}
              type="button"
            >
              Back
            </button>
            <button
              className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition ${
                (step === 'options' && anyOptionSelected) || (step === 'targets' && canContinueTargets) || step === 'confirm'
                  ? 'bg-[#e7a35f] text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(234,154,92,0.16)] hover:bg-[#efad6c]'
                  : 'bg-white/[0.08] text-white/35'
              }`}
              disabled={step === 'options' ? !anyOptionSelected : step === 'targets' ? !canContinueTargets : false}
              onClick={() => {
                if (step === 'options') setStep('targets')
                else if (step === 'targets') setStep('confirm')
                else if (step === 'confirm') runDryRun()
              }}
              type="button"
            >
              {step === 'confirm' ? 'Run dry-run' : 'Continue'}
              {step !== 'confirm' && <ArrowRight size={15} />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
