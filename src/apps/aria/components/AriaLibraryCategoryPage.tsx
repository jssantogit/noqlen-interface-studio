import { ChevronLeft, ChevronRight, Disc3, Folder, Gem, Music2, Tags, UsersRound } from 'lucide-react'
import type { AriaAlbum, AriaArtist, AriaPlaylist, AriaTrack } from '../ariaMockData'
import { ariaAlbums, ariaArtists, ariaPlaylists, ariaQueue } from '../ariaMockData'

export type AriaLibraryPageCategoryId = 'songs' | 'albums' | 'artists' | 'genres' | 'folders' | 'compilations' | 'recent'

const categoryMeta: Record<AriaLibraryPageCategoryId, { title: string; subtitle: string; icon: typeof Music2 }> = {
  songs: { title: 'Songs', subtitle: 'Local library tracks', icon: Music2 },
  albums: { title: 'Albums', subtitle: 'Albums in your library', icon: Disc3 },
  artists: { title: 'Artists', subtitle: 'Library artist index', icon: UsersRound },
  genres: { title: 'Genres', subtitle: 'Browse by listening mood', icon: Tags },
  folders: { title: 'Folders', subtitle: 'Folder previews without filesystem access', icon: Folder },
  compilations: { title: 'Compilations', subtitle: 'Curated local collections', icon: Gem },
  recent: { title: 'Recently Added', subtitle: 'Latest additions to the library', icon: Disc3 },
}

const mockGenres = ['Ambient', 'Classical', 'Progressive Metal', 'Electronic', 'Jazz']
const mockFolders = ['Local Library', 'Imported Archive', 'Focus Collections']
const mockCompilations = ['Piano Sketches', 'Late Night Edits', 'Collected Singles']

export function AriaLibraryCategoryPage({
  category,
  onBack,
  onOpenAlbum,
  onOpenArtist,
  onOpenPlaylist,
  onOpenTrack,
  onShowToast,
}: {
  category: AriaLibraryPageCategoryId
  onBack: () => void
  onOpenAlbum: (album: AriaAlbum) => void
  onOpenArtist: (artist: AriaArtist) => void
  onOpenPlaylist: (playlist: AriaPlaylist) => void
  onOpenTrack: (track: AriaTrack) => void
  onShowToast: (message: string) => void
}) {
  const meta = categoryMeta[category]
  const Icon = meta.icon

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <header className="flex items-start gap-3 pt-1">
        <button
          aria-label="Back"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#fff3e4] transition hover:bg-white/[0.05]"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft size={30} strokeWidth={1.8} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[#f0a13d]">
            <Icon size={20} strokeWidth={1.6} />
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#f0a13d]">Library</p>
          </div>
          <h1 className="mt-2 font-serif text-[42px] leading-[0.95] text-[#fff3e4]">{meta.title}</h1>
          <p className="mt-2 text-[15px] text-[#b9b1a7]">{meta.subtitle}</p>
        </div>
      </header>

      <section className="mt-5 space-y-2">
        {category === 'songs' ? ariaQueue.map((track) => (
          <TrackPageRow key={track.id} track={track} onClick={() => onOpenTrack(track)} />
        )) : category === 'albums' ? ariaAlbums.map((album) => (
          <AlbumPageRow key={album.id} album={album} onClick={() => onOpenAlbum(album)} />
        )) : category === 'artists' ? ariaArtists.map((artist) => (
          <ArtistPageRow key={artist.id} artist={artist} onClick={() => onOpenArtist(artist)} />
        )) : category === 'genres' ? mockGenres.map((genre) => (
          <SimplePageRow key={genre} title={genre} subtitle="Genre" onClick={() => onShowToast(`Open ${genre} genre (mock)`)} />
        )) : category === 'folders' ? mockFolders.map((folder) => (
          <SimplePageRow key={folder} title={folder} subtitle="Mock folder view - no filesystem access" onClick={() => onShowToast(`Open ${folder} folder (mock - no filesystem access)`)} />
        )) : category === 'compilations' ? mockCompilations.map((compilation) => (
          <SimplePageRow key={compilation} title={compilation} subtitle="Compilation" onClick={() => onShowToast(`Open ${compilation} compilation (mock)`)} />
        )) : (
          <>
            {ariaAlbums.slice(0, 4).map((album) => <AlbumPageRow key={album.id} album={album} onClick={() => onOpenAlbum(album)} />)}
            {ariaPlaylists.slice(0, 1).map((playlist) => <PlaylistPageRow key={playlist.id} playlist={playlist} onClick={() => onOpenPlaylist(playlist)} />)}
          </>
        )}
      </section>

      <div className="h-8" />
    </div>
  )
}

function TrackPageRow({ onClick, track }: { onClick: () => void; track: AriaTrack }) {
  return <PageRow title={track.title} subtitle={`${track.artist} · ${track.album}`} trailing={track.duration} onClick={onClick} />
}

function AlbumPageRow({ album, onClick }: { album: AriaAlbum; onClick: () => void }) {
  return <PageRow title={album.title} subtitle={`${album.artist} · ${album.year} · ${album.format}`} trailing={album.duration} onClick={onClick} />
}

function ArtistPageRow({ artist, onClick }: { artist: AriaArtist; onClick: () => void }) {
  return <PageRow title={artist.name} subtitle={artist.genre} trailing={artist.location} onClick={onClick} />
}

function PlaylistPageRow({ onClick, playlist }: { onClick: () => void; playlist: AriaPlaylist }) {
  return <PageRow title={playlist.title} subtitle={`${playlist.trackCount} tracks · ${playlist.duration}`} onClick={onClick} />
}

function SimplePageRow({ onClick, subtitle, title }: { onClick: () => void; subtitle: string; title: string }) {
  return <PageRow title={title} subtitle={subtitle} onClick={onClick} />
}

function PageRow({
  onClick,
  subtitle,
  title,
  trailing,
}: {
  onClick: () => void
  subtitle: string
  title: string
  trailing?: string
}) {
  return (
    <button
      className="flex w-full min-w-0 items-center gap-3 rounded-[17px] border border-white/[0.075] bg-white/[0.032] p-3 text-left transition hover:bg-white/[0.055]"
      onClick={onClick}
      type="button"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px] font-semibold text-[#fff3e4]">{title}</span>
        <span className="mt-1 block truncate text-[13px] text-[#b9b1a7]">{subtitle}</span>
      </span>
      {trailing ? <span className="shrink-0 text-[12px] text-[#b9b1a7]">{trailing}</span> : null}
      <ChevronRight className="shrink-0 text-[#f0a13d]" size={21} strokeWidth={1.7} />
    </button>
  )
}
