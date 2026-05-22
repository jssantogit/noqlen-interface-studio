import { useState } from 'react'
import type { ReactNode } from 'react'
import { Disc3, ListMusic, Mic2, Music2, Radio, Search, Shapes } from 'lucide-react'
import type { AriaAlbum, AriaArtist, AriaPlaylist, AriaTrack } from '../ariaMockData'
import { ariaAlbums, ariaArtists, ariaPlaylists, ariaQueue } from '../ariaMockData'

type ExploreMode = 'search' | 'genres' | 'albums' | 'artists' | 'radios' | 'songs' | 'playlists' | 'recent'

const categories = [
  { id: 'genres', label: 'Genres', icon: Shapes, art: 'aria-art-waves' },
  { id: 'albums', label: 'Albums', icon: Disc3, art: 'aria-art-stack' },
  { id: 'artists', label: 'Artists', icon: Mic2, art: 'aria-art-portrait' },
  { id: 'radios', label: 'Radio', icon: Radio, art: 'aria-art-radio' },
  { id: 'songs', label: 'Songs', icon: Music2, art: 'aria-art-lines' },
  { id: 'playlists', label: 'Playlists', icon: ListMusic, art: 'aria-art-playlist' },
]

const recentlyExplored = [
  { id: 'rx-1', label: 'Genres', art: 'aria-art-orb' },
  { id: 'rx-2', label: 'Artist', art: 'aria-art-violin' },
  { id: 'rx-3', label: 'Albums', art: 'aria-art-stack' },
  { id: 'rx-4', label: 'Recently Added', art: 'aria-art-clock' },
]
const exploreGenres = ['Ambient', 'Classical', 'Progressive Metal', 'Electronic', 'Jazz']
const exploreRadios = ['Local Mix Radio', 'Focus Radio', 'Discovery Radio']

export function AriaExplore({
  onOpenAlbum,
  onOpenArtist,
  onOpenPlaylist,
  onOpenTrack,
  onShowToast,
}: {
  onOpenAlbum: (album: AriaAlbum) => void
  onOpenArtist: (artist: AriaArtist) => void
  onOpenPlaylist: (playlist: AriaPlaylist) => void
  onOpenTrack: (track: AriaTrack) => void
  onShowToast: (message: string) => void
}) {
  const [activeExploreMode, setActiveExploreMode] = useState<ExploreMode | null>(null)

  const openMode = (mode: ExploreMode, label: string) => {
    setActiveExploreMode(mode)
    onShowToast(`${label} preview (mock)`)
  }

  const renderModePreview = () => {
    if (!activeExploreMode) return null

    const title = activeExploreMode === 'search'
      ? 'Search Preview'
      : activeExploreMode === 'radios'
        ? 'Radio Preview'
        : activeExploreMode === 'recent'
          ? 'Recently Explored'
          : `${activeExploreMode[0].toUpperCase()}${activeExploreMode.slice(1)} Preview`

    return (
      <section className="mt-4 rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[23px] leading-none text-[#fff3e4]">{title}</h2>
          <button className="text-[13px] text-[#f0a13d] transition hover:text-[#ffb958]" onClick={() => setActiveExploreMode(null)} type="button">Close</button>
        </div>

        {activeExploreMode === 'search' ? (
          <div className="mt-3 space-y-3">
            <PreviewGroup title="Albums">
              {ariaAlbums.slice(0, 2).map((album) => <PreviewRow key={album.id} title={album.title} subtitle={album.artist} onClick={() => onOpenAlbum(album)} />)}
            </PreviewGroup>
            <PreviewGroup title="Artists">
              {ariaArtists.slice(0, 2).map((artist) => <PreviewRow key={artist.id} title={artist.name} subtitle={artist.genre} onClick={() => onOpenArtist(artist)} />)}
            </PreviewGroup>
            <PreviewGroup title="Tracks">
              {ariaQueue.slice(0, 2).map((track) => <PreviewRow key={track.id} title={track.title} subtitle={track.artist} onClick={() => onOpenTrack(track)} />)}
            </PreviewGroup>
            <PreviewGroup title="Playlists">
              {ariaPlaylists.slice(0, 2).map((playlist) => <PreviewRow key={playlist.id} title={playlist.title} subtitle={`${playlist.trackCount} tracks`} onClick={() => onOpenPlaylist(playlist)} />)}
            </PreviewGroup>
          </div>
        ) : activeExploreMode === 'genres' ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {exploreGenres.map((genre) => <button className="rounded-2xl border border-white/[0.075] bg-white/[0.035] px-3 py-2 text-left text-[14px] text-[#f5ecdf] transition hover:bg-white/[0.055]" key={genre} onClick={() => onShowToast(`Open ${genre} genre (mock)`)} type="button">{genre}</button>)}
          </div>
        ) : activeExploreMode === 'albums' || activeExploreMode === 'recent' ? (
          <div className="mt-3 space-y-1">
            {ariaAlbums.map((album) => <PreviewRow key={album.id} title={album.title} subtitle={`${album.artist} · ${album.year}`} onClick={() => onOpenAlbum(album)} />)}
          </div>
        ) : activeExploreMode === 'artists' ? (
          <div className="mt-3 space-y-1">
            {ariaArtists.map((artist) => <PreviewRow key={artist.id} title={artist.name} subtitle={artist.genre} onClick={() => onOpenArtist(artist)} />)}
          </div>
        ) : activeExploreMode === 'radios' ? (
          <div className="mt-3 space-y-1">
            {exploreRadios.map((radio) => <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[14px] text-[#f5ecdf] transition hover:bg-white/[0.045]" key={radio} onClick={() => onShowToast(`${radio} (mock)`)} type="button"><span>{radio}</span><span className="text-[#ffb05d]">›</span></button>)}
          </div>
        ) : activeExploreMode === 'songs' ? (
          <div className="mt-3 space-y-1">
            {ariaQueue.map((track) => <PreviewRow key={track.id} title={track.title} subtitle={`${track.artist} · ${track.album}`} onClick={() => onOpenTrack(track)} />)}
          </div>
        ) : (
          <div className="mt-3 space-y-1">
            {ariaPlaylists.map((playlist) => <PreviewRow key={playlist.id} title={playlist.title} subtitle={`${playlist.trackCount} tracks`} onClick={() => onOpenPlaylist(playlist)} />)}
          </div>
        )}
      </section>
    )
  }

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-6 text-[#f5ecdf]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[58px] leading-[0.92] text-[#fff3e4]">Explore</h1>
          <p className="mt-3 text-[18px] text-[#c9beb1]">Browse your local library</p>
        </div>
        <button
          aria-label="Explore queue status"
          className="relative mt-2 grid h-10 w-10 place-items-center rounded-xl border border-white/[0.16] bg-white/[0.035] text-[#f7eadb]"
          onClick={() => onShowToast('Explore status (mock)')}
          type="button"
        >
          <ListMusic size={25} strokeWidth={1.5} />
          <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-[#f0a13d] shadow-[0_0_0_2px_#071017]" />
        </button>
      </div>

      <button
        className="mt-5 flex h-12 w-full items-center gap-3 rounded-[22px] border border-white/[0.085] bg-white/[0.04] px-5 text-left text-[16px] text-[#b9b1a7] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-white/[0.055]"
        onClick={() => openMode('search', 'Search')}
        type="button"
      >
        <Search size={22} className="shrink-0 text-[#cfc4b8]" strokeWidth={1.7} />
        Search artists, albums, genres...
      </button>

      <section className="mt-4 grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              className="aria-discovery-card group relative h-[110px] overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.035] p-4 text-left shadow-[0_14px_28px_rgba(0,0,0,0.28)] transition hover:border-white/[0.14]"
              onClick={() => openMode(cat.id as ExploreMode, cat.label)}
              type="button"
            >
              <div className={`aria-art aria-art-tile absolute inset-0 ${cat.art}`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_32%,rgba(2,5,9,0.74)_100%)]" />
              <Icon className="absolute right-4 top-4 text-[#f3b253]/70" size={22} strokeWidth={1.45} />
              <h3 className="absolute bottom-4 left-4 font-serif text-[26px] leading-none text-[#fff3e4] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                {cat.label}
              </h3>
            </button>
          )
        })}
      </section>

      {renderModePreview()}

      <section className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-semibold text-[#f0a13d]">Recently Explored</h2>
          <button
            className="text-[16px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => openMode('recent', 'Recently explored')}
            type="button"
          >
            See all
          </button>
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-2">
          {recentlyExplored.map((item) => (
            <button
              className="flex min-h-[52px] items-center gap-2 rounded-[15px] border border-white/[0.075] bg-white/[0.035] px-2 text-left transition hover:bg-white/[0.055]"
              key={item.id}
              onClick={() => {
                if (item.label === 'Artist') openMode('artists', 'Artists')
                else if (item.label === 'Albums') openMode('albums', 'Albums')
                else if (item.label === 'Genres') openMode('genres', 'Genres')
                else openMode('recent', 'Recently Added')
              }}
              type="button"
            >
              <span className={`aria-art aria-art-chip ${item.art}`} />
              <span className="text-[12px] leading-tight text-[#f5ecdf]">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}

function PreviewGroup({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f0a13d]">{title}</h3>
      <div className="mt-1 space-y-1">{children}</div>
    </div>
  )
}

function PreviewRow({ onClick, subtitle, title }: { onClick: () => void; subtitle: string; title: string }) {
  return (
    <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left transition hover:bg-white/[0.045]" onClick={onClick} type="button">
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-semibold text-[#f5ecdf]">{title}</span>
        <span className="mt-0.5 block truncate text-[12px] text-[#b9b1a7]">{subtitle}</span>
      </span>
      <span className="text-[#ffb05d]">›</span>
    </button>
  )
}
