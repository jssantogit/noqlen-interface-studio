import { useState } from 'react'
import { ChevronRight, Disc3, Folder, Gem, Music2, Search, Settings, Tags, UsersRound } from 'lucide-react'
import type { AriaAlbum, AriaArtist, AriaPlaylist, AriaTrack } from '../ariaMockData'
import { ariaAlbums, ariaArtists, ariaPlaylists, ariaQueue } from '../ariaMockData'

type LibraryCategoryId = 'songs' | 'albums' | 'artists' | 'genres' | 'folders' | 'compilations' | 'playlists' | 'recent' | 'search'

const categories: { id: LibraryCategoryId; label: string; count: string; icon: typeof Music2 }[] = [
  { id: 'songs', label: 'Songs', count: '1,200', icon: Music2 },
  { id: 'albums', label: 'Albums', count: '245', icon: Disc3 },
  { id: 'artists', label: 'Artists', count: '168', icon: UsersRound },
  { id: 'genres', label: 'Genres', count: '32', icon: Tags },
  { id: 'folders', label: 'Folders', count: '48', icon: Folder },
  { id: 'compilations', label: 'Compilations', count: '12', icon: Gem },
]

const playlistArt = ['aria-art-blue', 'aria-art-dune', 'aria-art-record']
const recentArt = ['aria-art-tree', 'aria-art-violet', 'aria-art-mountain']
const mockGenres = ['Ambient', 'Classical', 'Progressive Metal', 'Electronic', 'Jazz']
const mockFolders = ['Local Library Preview', 'Imported Archive', 'Focus Collections']
const mockCompilations = ['Piano Sketches', 'Late Night Edits', 'Collected Singles']

export function AriaLibrary({
  onOpenAlbum,
  onOpenArtist,
  onOpenPlaylist,
  onOpenSettings,
  onOpenTrack,
  onNavigateToPlaylists,
  onShowToast,
}: {
  onOpenAlbum: (album: AriaAlbum) => void
  onOpenArtist: (artist: AriaArtist) => void
  onOpenPlaylist: (playlist: AriaPlaylist) => void
  onOpenSettings: () => void
  onOpenTrack: (track: AriaTrack) => void
  onNavigateToPlaylists: () => void
  onShowToast: (message: string) => void
}) {
  const [activeCategory, setActiveCategory] = useState<LibraryCategoryId | null>(null)

  const openCategory = (category: LibraryCategoryId) => {
    setActiveCategory(category)
    onShowToast(`${category === 'recent' ? 'Recently Added' : category[0].toUpperCase() + category.slice(1)} list (mock)`)
  }

  const renderCategoryPreview = () => {
    if (!activeCategory) return null

    const title = activeCategory === 'recent'
      ? 'Recently Added'
      : activeCategory === 'search'
        ? 'Library Search Preview'
        : `${activeCategory[0].toUpperCase()}${activeCategory.slice(1)} Preview`

    return (
      <section className="mt-4 rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[23px] leading-none text-[#fff3e4]">{title}</h2>
          <button
            className="text-[13px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => setActiveCategory(null)}
            type="button"
          >
            Close
          </button>
        </div>

        {activeCategory === 'albums' || activeCategory === 'recent' ? (
          <div className="mt-3 space-y-1">
            {ariaAlbums.map((album) => (
              <button className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-white/[0.045]" key={album.id} onClick={() => onOpenAlbum(album)} type="button">
                <span className="aria-art aria-art-tiny aria-art-stack shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold text-[#f5ecdf]">{album.title}</span>
                  <span className="mt-0.5 block truncate text-[12px] text-[#b9b1a7]">{album.artist} · {album.year}</span>
                </span>
                <ChevronRight size={18} className="text-[#ffb05d]" />
              </button>
            ))}
          </div>
        ) : activeCategory === 'artists' ? (
          <div className="mt-3 space-y-1">
            {ariaArtists.map((artist) => (
              <button className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-white/[0.045]" key={artist.id} onClick={() => onOpenArtist(artist)} type="button">
                <span className="aria-art aria-art-tiny aria-art-portrait shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold text-[#f5ecdf]">{artist.name}</span>
                  <span className="mt-0.5 block truncate text-[12px] text-[#b9b1a7]">{artist.genre}</span>
                </span>
                <ChevronRight size={18} className="text-[#ffb05d]" />
              </button>
            ))}
          </div>
        ) : activeCategory === 'songs' || activeCategory === 'search' ? (
          <div className="mt-3 space-y-1">
            {(activeCategory === 'search' ? ariaQueue.slice(0, 4) : ariaQueue).map((track) => (
              <button className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-white/[0.045]" key={track.id} onClick={() => onOpenTrack(track)} type="button">
                <span className="aria-art aria-art-tiny aria-art-lines shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold text-[#f5ecdf]">{track.title}</span>
                  <span className="mt-0.5 block truncate text-[12px] text-[#b9b1a7]">{track.artist} · {track.album}</span>
                </span>
                <span className="text-[12px] text-[#b9b1a7]">{track.duration}</span>
              </button>
            ))}
          </div>
        ) : activeCategory === 'genres' ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {mockGenres.map((genre) => <button className="rounded-2xl border border-white/[0.075] bg-white/[0.035] px-3 py-2 text-left text-[14px] text-[#f5ecdf] transition hover:bg-white/[0.055]" key={genre} onClick={() => onShowToast(`Open ${genre} genre (mock)`)} type="button">{genre}</button>)}
          </div>
        ) : activeCategory === 'folders' ? (
          <div className="mt-3 space-y-1">
            {mockFolders.map((folder) => <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[14px] text-[#f5ecdf] transition hover:bg-white/[0.045]" key={folder} onClick={() => onShowToast(`Open ${folder} folder (mock - no filesystem access)`)} type="button"><span>{folder}</span><ChevronRight size={17} className="text-[#ffb05d]" /></button>)}
          </div>
        ) : activeCategory === 'compilations' ? (
          <div className="mt-3 space-y-1">
            {mockCompilations.map((compilation) => <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[14px] text-[#f5ecdf] transition hover:bg-white/[0.045]" key={compilation} onClick={() => onShowToast(`Open ${compilation} compilation (mock)`)} type="button"><span>{compilation}</span><ChevronRight size={17} className="text-[#ffb05d]" /></button>)}
          </div>
        ) : (
          <div className="mt-3 space-y-1">
            {ariaPlaylists.map((playlist) => <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[14px] text-[#f5ecdf] transition hover:bg-white/[0.045]" key={playlist.id} onClick={() => onOpenPlaylist(playlist)} type="button"><span>{playlist.title}</span><ChevronRight size={17} className="text-[#ffb05d]" /></button>)}
          </div>
        )}
      </section>
    )
  }

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-6 text-[#f5ecdf]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[46px] leading-[0.95] text-[#fff3e4]">Library</h1>
          <p className="mt-2 text-[19px] text-[#f3b073]">Local library</p>
        </div>
        <div className="flex items-center gap-4 pt-1 text-[#f0a13d]">
          <button
            aria-label="Aria settings"
            className="grid h-10 w-10 place-items-center rounded-full text-[#ffd28b] transition hover:bg-white/[0.04]"
            onClick={onOpenSettings}
            type="button"
          >
            <Settings size={28} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Library search"
            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/[0.04]"
            onClick={() => {
              setActiveCategory('search')
              onShowToast('Library search preview (mock)')
            }}
            type="button"
          >
            <Search size={30} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <section className="mt-5 space-y-1.5">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              className="group flex w-full items-center gap-4 rounded-[16px] px-1 py-1 text-left transition hover:bg-white/[0.035]"
              key={cat.id}
              onClick={() => openCategory(cat.id)}
              type="button"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center text-[#ffad26]">
                <Icon size={25} strokeWidth={1.55} />
              </span>
              <span className="flex-1 text-[19px] leading-none text-[#fff3e4]">{cat.label}</span>
              <span className="text-[17px] tabular-nums text-[#b5aa9d]">{cat.count}</span>
              <ChevronRight size={24} className="text-[#ffb05d] transition group-hover:translate-x-0.5" strokeWidth={1.7} />
            </button>
          )
        })}
      </section>

      {renderCategoryPreview()}

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[27px] leading-none text-[#fff3e4]">My Playlists</h2>
          <button
            className="text-[19px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={onNavigateToPlaylists}
            type="button"
          >
            See all
          </button>
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-3.5">
          {ariaPlaylists.map((playlist, index) => (
            <button
              className="overflow-hidden rounded-[14px] border border-white/[0.075] bg-white/[0.035] text-left shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition hover:bg-white/[0.055]"
              key={playlist.id}
              onClick={() => onOpenPlaylist(playlist)}
              type="button"
            >
              <div className={`aria-art aria-art-card ${playlistArt[index % playlistArt.length]}`} />
                <div className="p-2.5">
                  <h3 className="truncate text-[15px] font-medium leading-tight text-[#fff3e4]">{playlist.title}</h3>
                  <p className="mt-1 text-[13px] text-[#b9b1a7]">{playlist.trackCount} Tracks</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[27px] leading-none text-[#fff3e4]">Recently Added</h2>
          <button
            className="text-[19px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => openCategory('recent')}
            type="button"
          >
            See all
          </button>
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-3.5">
          {ariaAlbums.slice(0, 3).map((album, index) => (
            <button
              className="overflow-hidden rounded-[14px] text-left transition hover:opacity-90"
              key={album.id}
              onClick={() => onOpenAlbum(album)}
              type="button"
            >
              <div className={`aria-art aria-art-poster ${recentArt[index % recentArt.length]}`} />
            </button>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}
