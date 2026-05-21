import { ChevronDown, GripVertical, ListX, MoreHorizontal, Repeat, Save, Shuffle } from 'lucide-react'
import { ariaQueue, nowPlaying } from '../ariaMockData'

export function AriaQueue({
  isShuffled,
  onBack,
  onCollapse,
  onShowToast,
  onToggleRepeat,
  onToggleShuffle,
  repeatMode,
}: {
  isShuffled: boolean
  onBack: () => void
  onCollapse: () => void
  onShowToast: (message: string) => void
  onToggleRepeat: () => void
  onToggleShuffle: () => void
  repeatMode: 'off' | 'all' | 'one'
}) {
  const repeatLabel = repeatMode === 'off' ? 'Repeat off' : repeatMode === 'all' ? 'Repeat all' : 'Repeat one'

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
            onClick={() => onShowToast('Current track is playing (mock)')}
            type="button"
          >
            <div className="aria-art aria-art-small h-16 w-16 shrink-0 rounded-[18px] shadow-[0_12px_26px_rgba(0,0,0,0.34)]" />
            <div className="min-w-0">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-serif text-[21px] leading-tight text-[#fff3e4]">{nowPlaying.title}</p>
                  <p className="mt-1 truncate text-sm text-[#f0a13d]">{nowPlaying.artist}</p>
                </div>
                <span className="mt-1 shrink-0 rounded-full border border-white/[0.07] bg-black/20 px-2 py-1 text-[11px] text-[#d8cbbd]">{nowPlaying.duration}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f0a13d] shadow-[0_0_12px_rgba(240,161,61,0.65)]" />
                <span className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.12]">
                  <span className="block h-full w-[38%] rounded-full bg-[#f0a13d]" />
                </span>
              </div>
            </div>
          </button>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <QueueAction active={isShuffled} icon={<Shuffle size={18} />} label="Shuffle" onClick={onToggleShuffle} />
          <QueueAction active={repeatMode !== 'off'} icon={<Repeat size={18} />} label={repeatLabel} onClick={onToggleRepeat} />
          <QueueAction icon={<Save size={18} />} label="Save as playlist" onClick={() => onShowToast('Save queue as playlist (mock)')} />
          <QueueAction icon={<ListX size={18} />} label="Clear" onClick={() => onShowToast('Clear queue confirmation (mock)')} />
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#777d82]">Up Next</p>
              <h2 className="mt-1 font-serif text-2xl text-[#fff3e4]">Next in queue</h2>
            </div>
            <span className="text-xs text-[#9c9186]">{ariaQueue.length} tracks</span>
          </div>

          <div className="space-y-2.5">
            {ariaQueue.map((track, index) => (
              <div
                className="grid min-w-0 grid-cols-[2rem_3rem_1fr_2.5rem_2rem] items-center gap-3 rounded-[18px] border border-white/[0.055] bg-white/[0.035] px-2.5 py-2.5"
                key={track.id}
              >
                <button
                  aria-label={`Reorder ${track.title}`}
                  className="grid h-8 w-8 place-items-center rounded-full text-[#777d82] transition hover:bg-white/[0.07] hover:text-[#eadac4]"
                  onClick={() => onShowToast('Reorder handle is visual only')}
                  type="button"
                >
                  <GripVertical size={17} />
                </button>
                <div className="aria-art aria-art-micro shrink-0" />
                <button
                  aria-label={`Queue item ${index + 1}: ${track.title}`}
                  className="min-w-0 text-left"
                  onClick={() => onShowToast(`${track.title} selected (mock)`)}
                  type="button"
                >
                  <p className="truncate text-sm font-medium text-[#f5ecdf]">{track.title}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[#8f8880]">{track.artist}</p>
                </button>
                <span className="text-right text-[11px] text-[#8f8880]">{track.duration}</span>
                <button
                  aria-label={`More actions for ${track.title}`}
                  className="grid h-8 w-8 place-items-center rounded-full text-[#9c9186] transition hover:bg-white/[0.07] hover:text-white"
                  onClick={() => onShowToast(`${track.title} actions (mock)`)}
                  type="button"
                >
                  <MoreHorizontal size={17} />
                </button>
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
  icon: React.ReactNode
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
