import { useState, type ReactNode } from 'react'
import { ChevronDown, GripVertical, ListX, MoreHorizontal, Repeat, Save, Shuffle } from 'lucide-react'
import type { AriaTrack } from '../ariaMockData'

export function AriaQueue({
  currentTrack,
  isShuffled,
  onBack,
  onClearQueue,
  onCollapse,
  onMoveTrackDown,
  onMoveTrackNext,
  onRemoveTrack,
  onSelectTrack,
  onShowToast,
  onToggleRepeat,
  onToggleShuffle,
  progress,
  queueTracks,
  repeatMode,
}: {
  currentTrack: AriaTrack
  isShuffled: boolean
  onBack: () => void
  onClearQueue: () => void
  onCollapse: () => void
  onMoveTrackDown: (trackId: string) => void
  onMoveTrackNext: (trackId: string) => void
  onRemoveTrack: (trackId: string) => void
  onSelectTrack: (trackId: string) => void
  onShowToast: (message: string) => void
  onToggleRepeat: () => void
  onToggleShuffle: () => void
  progress: number
  queueTracks: AriaTrack[]
  repeatMode: 'off' | 'all' | 'one'
}) {
  const repeatLabel = repeatMode === 'off' ? 'Repeat off' : repeatMode === 'all' ? 'Repeat all' : 'Repeat one'
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null)
  const [confirmClear, setConfirmClear] = useState(false)
  const progressStyle = `${progress}%`

  return (
    <div className="absolute inset-0 z-40 flex min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_76%_16%,rgba(240,161,61,0.15),transparent_30%),radial-gradient(circle_at_24%_82%,rgba(54,88,112,0.14),transparent_36%),linear-gradient(180deg,#071018_0%,#05090e_56%,#030609_100%)] text-[#f5ecdf]">
      <header className="flex items-center justify-between px-5 pt-5">
        <button
          aria-label="Return to Now Playing"
          className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
          onClick={onBack}
          type="button"
        >
          <ChevronDown className="rotate-90" size={22} />
        </button>
        <div className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#f5ecdf]">Queue</p>
          <p className="mt-1 text-[11px] text-[#777d82]">Up Next</p>
        </div>
        <button
          aria-label="Close queue overlay"
          className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
          onClick={onCollapse}
          type="button"
        >
          <ChevronDown size={22} />
        </button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pb-5 pt-6">
        <section className="rounded-[26px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(240,161,61,0.075)_48%,rgba(255,255,255,0.035))] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.32)]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b8178]">Now Playing</p>
            <span className="rounded-full bg-[#f0a13d]/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ffbd65]">Live</span>
          </div>
          <button
            aria-label="Show current track feedback"
            className="mt-3 grid w-full min-w-0 grid-cols-[4rem_1fr] items-center gap-3 rounded-[20px] text-left transition hover:bg-white/[0.04]"
            onClick={() => onShowToast(`${currentTrack.title} is playing`)}
            type="button"
          >
            <div className="aria-art aria-art-small h-16 w-16 shrink-0 rounded-[18px] shadow-[0_12px_26px_rgba(0,0,0,0.34)]" />
            <div className="min-w-0">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-serif text-[21px] leading-tight text-[#fff3e4]">{currentTrack.title}</p>
                  <p className="mt-1 truncate text-sm text-[#f0a13d]">{currentTrack.artist}</p>
                </div>
                <span className="mt-1 shrink-0 rounded-full border border-white/[0.07] bg-black/20 px-2 py-1 text-[11px] text-[#d8cbbd]">{currentTrack.duration}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f0a13d] shadow-[0_0_12px_rgba(240,161,61,0.65)]" />
                <span className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.12]">
                  <span className="block h-full rounded-full bg-[#f0a13d]" style={{ width: progressStyle }} />
                </span>
              </div>
            </div>
          </button>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <QueueAction active={isShuffled} icon={<Shuffle size={18} />} label="Shuffle" onClick={onToggleShuffle} />
          <QueueAction active={repeatMode !== 'off'} icon={<Repeat size={18} />} label={repeatLabel} onClick={onToggleRepeat} />
          <QueueAction icon={<Save size={18} />} label="Save as playlist" onClick={() => onShowToast('Save queue as playlist')} />
          <QueueAction icon={<ListX size={18} />} label="Clear" onClick={() => setConfirmClear((visible) => !visible)} />
        </section>

        {confirmClear ? (
          <section className="mt-3 rounded-[20px] border border-[#f0a13d]/20 bg-[#f0a13d]/10 p-3">
            <p className="text-[12px] font-medium text-[#ffddb1]">Clear upcoming tracks?</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="rounded-full border border-white/[0.08] px-3 py-2 text-[12px] font-semibold text-[#eadac4]" onClick={() => setConfirmClear(false)} type="button">
                Keep queue
              </button>
              <button
                className="rounded-full bg-[#f0a13d] px-3 py-2 text-[12px] font-bold text-[#1b1108]"
                onClick={() => {
                  onClearQueue()
                  setConfirmClear(false)
                }}
                type="button"
              >
                Clear
              </button>
            </div>
          </section>
        ) : null}

        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#777d82]">Up Next</p>
              <h2 className="mt-1 font-serif text-2xl text-[#fff3e4]">Next in queue</h2>
            </div>
            <span className="text-xs text-[#9c9186]">{queueTracks.length} tracks</span>
          </div>

          <div className="space-y-2.5">
            {queueTracks.length === 0 ? (
              <div className="rounded-[22px] border border-white/[0.055] bg-white/[0.035] px-4 py-5 text-center">
                <p className="font-serif text-xl text-[#fff3e4]">Queue is clear</p>
                <p className="mt-1 text-[12px] text-[#8f8880]">Only the current track remains.</p>
              </div>
            ) : queueTracks.map((track, index) => (
              <div className="relative" key={track.id}>
                <div className="grid min-w-0 grid-cols-[2rem_3rem_1fr_2.5rem_2rem] items-center gap-3 rounded-[18px] border border-white/[0.055] bg-white/[0.035] px-2.5 py-2.5">
                  <button
                    aria-label={`Move ${track.title} down`}
                    className="grid h-8 w-8 place-items-center rounded-full text-[#777d82] transition hover:bg-white/[0.07] hover:text-[#eadac4]"
                    onClick={() => onMoveTrackDown(track.id)}
                    type="button"
                  >
                    <GripVertical size={17} />
                  </button>
                  <div className="aria-art aria-art-micro shrink-0" />
                  <button
                    aria-label={`Play queue item ${index + 1}: ${track.title}`}
                    className="min-w-0 text-left"
                    onClick={() => onSelectTrack(track.id)}
                    type="button"
                  >
                    <p className="truncate text-sm font-medium text-[#f5ecdf]">{track.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-[#8f8880]">{track.artist}</p>
                  </button>
                  <span className="text-right text-[11px] text-[#8f8880]">{track.duration}</span>
                  <button
                    aria-label={`More actions for ${track.title}`}
                    className="grid h-8 w-8 place-items-center rounded-full text-[#9c9186] transition hover:bg-white/[0.07] hover:text-white"
                    onClick={() => setActiveTrackId((activeId) => activeId === track.id ? null : track.id)}
                    type="button"
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </div>
                {activeTrackId === track.id ? (
                  <div className="absolute right-2 top-12 z-10 w-40 overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#101820]/95 p-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.38)] backdrop-blur-md">
                    <QueueOption
                      label="Play next"
                      onClick={() => {
                        onMoveTrackNext(track.id)
                        setActiveTrackId(null)
                      }}
                    />
                    <QueueOption label="Track details" onClick={() => onShowToast(`${track.title} details`)} />
                    <QueueOption
                      label="Remove"
                      onClick={() => {
                        onRemoveTrack(track.id)
                        setActiveTrackId(null)
                      }}
                      tone="danger"
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function QueueAction({
  active = false,
  icon,
  label,
  onClick,
}: {
  active?: boolean
  icon: ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      aria-label={label}
      className={`flex items-center gap-2 rounded-2xl border px-3 py-3 text-left text-xs font-medium transition ${
        active
          ? 'border-[#f0a13d]/35 bg-[#f0a13d]/15 text-[#ffbd65]'
          : 'border-white/[0.06] bg-white/[0.04] text-[#d4c8ba] hover:bg-white/[0.07]'
      }`}
      onClick={onClick}
      type="button"
    >
      {icon}
      <span className="min-w-0 truncate">{label}</span>
    </button>
  )
}

function QueueOption({
  label,
  onClick,
  tone = 'normal',
}: {
  label: string
  onClick: () => void
  tone?: 'normal' | 'danger'
}) {
  return (
    <button
      className={`block w-full rounded-2xl px-3 py-2 text-left text-[12px] font-semibold transition hover:bg-white/[0.06] ${tone === 'danger' ? 'text-[#ff9b85]' : 'text-[#f5ecdf]'}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}
