import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, HardDrive, Server } from 'lucide-react'
import type { AriaTabId } from './ariaInteractionMap'
import type { AriaAlbum, AriaArtist, AriaPlaylist, AriaTrack } from './ariaMockData'
import { ariaAlbums, ariaArtistTopSongs, ariaArtists, ariaPlaylists, ariaQueue, nowPlaying } from './ariaMockData'
import { AriaAlbumDetail } from './components/AriaAlbumDetail'
import { AriaArtistDetail } from './components/AriaArtistDetail'
import { AriaBottomSheet } from './components/AriaBottomSheet'
import { AriaBottomNav } from './components/AriaBottomNav'
import { AriaExplore } from './components/AriaExplore'
import { AriaLibrary } from './components/AriaLibrary'
import { AriaListenHome } from './components/AriaListenHome'
import { AriaLyrics } from './components/AriaLyrics'
import { AriaMiniPlayer } from './components/AriaMiniPlayer'
import { AriaNowPlaying } from './components/AriaNowPlaying'
import { AriaPlaylistDetail } from './components/AriaPlaylistDetail'
import { AriaPlaylists } from './components/AriaPlaylists'
import { AriaQueue } from './components/AriaQueue'
import { AriaTrackDetails } from './components/AriaTrackDetails'

type AriaDetailScreen =
  | { type: 'album'; album: AriaAlbum }
  | { type: 'artist'; artist: AriaArtist }
  | { type: 'track'; track: AriaTrack }
  | { type: 'playlist'; playlist: AriaPlaylist }

type AriaPlaybackOverlay = 'nowPlaying' | 'lyrics' | 'queue'
type LibraryCategoryId = 'songs' | 'albums' | 'artists' | 'genres' | 'folders' | 'compilations' | 'playlists' | 'recent' | 'search'
type ExploreMode = 'search' | 'genres' | 'albums' | 'artists' | 'radios' | 'songs' | 'playlists' | 'recent'
type AriaSheet =
  | { type: 'source' }
  | { type: 'settings' }
  | { type: 'libraryCategory'; category: LibraryCategoryId }
  | { type: 'exploreMode'; mode: ExploreMode }
  | { type: 'albumOptions'; album: AriaAlbum }
  | { type: 'artistOptions'; artist: AriaArtist }
  | { type: 'playlistOptions'; playlist: AriaPlaylist }
  | { type: 'trackOptions'; track: AriaTrack }
  | { type: 'artistTopSongs'; artist: AriaArtist }
  | { type: 'addTrackToPlaylist'; track: AriaTrack }
  | null

type ActiveSource = {
  type: 'local' | 'server'
  name: string
  status: string
  detail: string
}

const playbackQueue = [nowPlaying, ...ariaQueue]
const activeSource: ActiveSource = {
  type: 'local',
  name: 'Local library',
  status: 'Active local source',
  detail: 'Device storage preview',
}
const mockGenres = ['Ambient', 'Classical', 'Progressive Metal', 'Electronic', 'Jazz']
const mockFolders = ['Local Library', 'Imported Archive', 'Focus Collections']
const mockCompilations = ['Piano Sketches', 'Late Night Edits', 'Collected Singles']
const mockRadios = ['Local Mix Radio', 'Focus Radio', 'Discovery Radio']

export function AriaPreview() {
  const [activeTab, setActiveTab] = useState<AriaTabId>('listen')
  const [playbackOverlay, setPlaybackOverlay] = useState<AriaPlaybackOverlay | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off')
  const [isFavorite, setIsFavorite] = useState(false)
  const [detailStack, setDetailStack] = useState<AriaDetailScreen[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [activeSheet, setActiveSheet] = useState<AriaSheet>(null)
  const [toast, setToast] = useState<{ message: string } | null>(null)

  const detailScreen = detailStack.at(-1) ?? null
  const currentTrack = playbackQueue[currentTrackIndex] ?? nowPlaying

  const showToast = useCallback((message: string) => {
    setToast({ message })
    setTimeout(() => setToast(null), 2200)
  }, [])

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((currentIndex) => {
      const nextIndex = (currentIndex + 1) % playbackQueue.length
      showToast(`Playing next: ${playbackQueue[nextIndex].title} (mock)`)
      return nextIndex
    })
  }, [showToast])

  const handlePrevious = useCallback(() => {
    setCurrentTrackIndex((currentIndex) => {
      const nextIndex = (currentIndex - 1 + playbackQueue.length) % playbackQueue.length
      showToast(`Playing previous: ${playbackQueue[nextIndex].title} (mock)`)
      return nextIndex
    })
  }, [showToast])

  const handleToggleShuffle = useCallback(() => {
    setIsShuffled((prev) => !prev)
    showToast(isShuffled ? 'Shuffle off' : 'Shuffle on')
  }, [isShuffled, showToast])

  const handleToggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      const next = prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'
      const label = next === 'off' ? 'Repeat off' : next === 'all' ? 'Repeat all' : 'Repeat one'
      showToast(label)
      return next
    })
  }, [showToast])

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev)
    showToast(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }, [isFavorite, showToast])

  const handleTabChange = useCallback((tab: AriaTabId) => {
    setActiveTab(tab)
    setPlaybackOverlay(null)
    setDetailStack([])
  }, [])

  const handleExpandPlayer = useCallback(() => {
    setPlaybackOverlay('nowPlaying')
  }, [])

  const handleCollapsePlayer = useCallback(() => {
    setPlaybackOverlay(null)
  }, [])

  const handleOpenNowPlaying = useCallback(() => {
    setPlaybackOverlay('nowPlaying')
  }, [])

  const handleOpenLyrics = useCallback(() => {
    setPlaybackOverlay('lyrics')
  }, [])

  const handleOpenQueue = useCallback(() => {
    setPlaybackOverlay('queue')
  }, [])

  const handleOpenSettings = useCallback(() => {
    setActiveSheet({ type: 'settings' })
  }, [])

  const handleCloseSheet = useCallback(() => {
    setActiveSheet(null)
  }, [])

  const handleOpenSourceSheet = useCallback(() => {
    setActiveSheet({ type: 'source' })
  }, [])

  const handleOpenLibraryCategory = useCallback((category: LibraryCategoryId) => {
    setActiveSheet({ type: 'libraryCategory', category })
    const label = category === 'recent' ? 'Recently Added' : category[0].toUpperCase() + category.slice(1)
    showToast(`${label} list (mock)`)
  }, [showToast])

  const handleOpenExploreMode = useCallback((mode: ExploreMode, label: string) => {
    setActiveSheet({ type: 'exploreMode', mode })
    showToast(`${label} preview (mock)`)
  }, [showToast])

  const handleNavigateToExplore = useCallback(() => {
    setActiveTab('explore')
    setDetailStack([])
  }, [])

  const handleNavigateToLibrary = useCallback(() => {
    setActiveTab('library')
    setDetailStack([])
  }, [])

  const handleNavigateToPlaylists = useCallback(() => {
    setActiveTab('playlists')
    setDetailStack([])
  }, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    showToast('Playback started (mock)')
  }, [showToast])

  const pushDetail = useCallback((screen: AriaDetailScreen) => {
    setPlaybackOverlay(null)
    setDetailStack((stack) => [...stack, screen])
  }, [])

  const handleOpenAlbum = useCallback((album: AriaAlbum = ariaAlbums[0]) => {
    pushDetail({ type: 'album', album })
  }, [pushDetail])

  const handleOpenArtist = useCallback((artist: AriaArtist = ariaArtists[0]) => {
    pushDetail({ type: 'artist', artist })
  }, [pushDetail])

  const handleOpenTrack = useCallback((track: AriaTrack = currentTrack) => {
    pushDetail({ type: 'track', track })
  }, [currentTrack, pushDetail])

  const handleOpenPlaylist = useCallback((playlist: AriaPlaylist = ariaPlaylists[0]) => {
    pushDetail({ type: 'playlist', playlist })
  }, [pushDetail])

  const openAlbumFromSheet = useCallback((album: AriaAlbum) => {
    setActiveSheet(null)
    handleOpenAlbum(album)
  }, [handleOpenAlbum])

  const openArtistFromSheet = useCallback((artist: AriaArtist) => {
    setActiveSheet(null)
    handleOpenArtist(artist)
  }, [handleOpenArtist])

  const openTrackFromSheet = useCallback((track: AriaTrack) => {
    setActiveSheet(null)
    handleOpenTrack(track)
  }, [handleOpenTrack])

  const openPlaylistFromSheet = useCallback((playlist: AriaPlaylist) => {
    setActiveSheet(null)
    handleOpenPlaylist(playlist)
  }, [handleOpenPlaylist])

  const handleOpenAlbumOptions = useCallback((album: AriaAlbum) => {
    setActiveSheet({ type: 'albumOptions', album })
  }, [])

  const handleOpenArtistOptions = useCallback((artist: AriaArtist) => {
    setActiveSheet({ type: 'artistOptions', artist })
  }, [])

  const handleOpenPlaylistOptions = useCallback((playlist: AriaPlaylist) => {
    setActiveSheet({ type: 'playlistOptions', playlist })
  }, [])

  const handleOpenTrackOptions = useCallback((track: AriaTrack) => {
    setActiveSheet({ type: 'trackOptions', track })
  }, [])

  const handleOpenArtistTopSongs = useCallback((artist: AriaArtist) => {
    setActiveSheet({ type: 'artistTopSongs', artist })
  }, [])

  const handleOpenAddTrackToPlaylist = useCallback((track: AriaTrack) => {
    setActiveSheet({ type: 'addTrackToPlaylist', track })
  }, [])

  const handleAddTrackToQueue = useCallback((track: AriaTrack) => {
    showToast(`Added ${track.title} to mock queue`)
  }, [showToast])

  const handleOpenArtistByName = useCallback((artistName: string) => {
    const artist = ariaArtists.find((item) => item.name === artistName)

    if (!artist) {
      showToast('Artist profile unavailable in mock data')
      return
    }

    handleOpenArtist(artist)
  }, [handleOpenArtist, showToast])

  const openArtistByNameFromSheet = useCallback((artistName: string) => {
    const artist = ariaArtists.find((item) => item.name === artistName)

    if (!artist) {
      setActiveSheet(null)
      showToast('Artist unavailable in mock data')
      return
    }

    openArtistFromSheet(artist)
  }, [openArtistFromSheet, showToast])

  const openAlbumByTitleFromSheet = useCallback((albumTitle: string) => {
    const album = ariaAlbums.find((item) => item.title === albumTitle)

    if (!album) {
      setActiveSheet(null)
      showToast('Album unavailable in mock data')
      return
    }

    openAlbumFromSheet(album)
  }, [openAlbumFromSheet, showToast])

  const closeSheetWithToast = useCallback((message: string) => {
    setActiveSheet(null)
    showToast(message)
  }, [showToast])

  const handleBackFromDetail = useCallback(() => {
    setDetailStack((stack) => stack.length > 1 ? stack.slice(0, -1) : [])
  }, [])

  const screens: Record<AriaTabId, React.ReactNode> = {
    listen: (
      <AriaListenHome
        onOpenAlbum={handleOpenAlbum}
        onNavigateToLibrary={handleNavigateToLibrary}
        onOpenTrack={handleOpenTrack}
        onNavigateToExplore={handleNavigateToExplore}
        onNavigateToPlaylists={handleNavigateToPlaylists}
        onOpenSourceSheet={handleOpenSourceSheet}
        onPlay={handlePlay}
        onShowToast={showToast}
      />
    ),
    library: <AriaLibrary onNavigateToPlaylists={handleNavigateToPlaylists} onOpenAlbum={handleOpenAlbum} onOpenLibraryCategory={handleOpenLibraryCategory} onOpenPlaylist={handleOpenPlaylist} onOpenSettings={handleOpenSettings} onShowToast={showToast} />,
    playlists: <AriaPlaylists onOpenPlaylist={handleOpenPlaylist} onShowToast={showToast} />,
    explore: <AriaExplore onOpenExploreMode={handleOpenExploreMode} onShowToast={showToast} />,
  }

  const detailContent = detailScreen?.type === 'album'
    ? <AriaAlbumDetail album={detailScreen.album} onBack={handleBackFromDetail} onOpenAlbumOptions={handleOpenAlbumOptions} onOpenArtistByName={handleOpenArtistByName} onOpenTrack={handleOpenTrack} onOpenTrackOptions={handleOpenTrackOptions} onShowToast={showToast} />
    : detailScreen?.type === 'artist'
      ? <AriaArtistDetail artist={detailScreen.artist} onBack={handleBackFromDetail} onOpenAlbum={handleOpenAlbum} onOpenArtistOptions={handleOpenArtistOptions} onOpenArtistTopSongs={handleOpenArtistTopSongs} onOpenTrack={handleOpenTrack} onOpenTrackOptions={handleOpenTrackOptions} onShowToast={showToast} />
      : detailScreen?.type === 'track'
        ? <AriaTrackDetails track={detailScreen.track} onAddTrackToQueue={handleAddTrackToQueue} onBack={handleBackFromDetail} onOpenAddTrackToPlaylist={handleOpenAddTrackToPlaylist} onOpenTrackOptions={handleOpenTrackOptions} onShowToast={showToast} />
        : detailScreen?.type === 'playlist'
          ? <AriaPlaylistDetail playlist={detailScreen.playlist} onBack={handleBackFromDetail} onOpenPlaylistOptions={handleOpenPlaylistOptions} onOpenTrack={handleOpenTrack} onOpenTrackOptions={handleOpenTrackOptions} onShowToast={showToast} />
          : null

  const renderSheetContent = () => {
    const SourceIcon = activeSource.type === 'local' ? HardDrive : Server

    if (activeSheet?.type === 'source') {
      return (
        <AriaBottomSheet onClose={handleCloseSheet} subtitle="Currently active library source." title="Source">
          <div className="space-y-3">
            <div className="rounded-[18px] border border-white/[0.075] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-3">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0a13d]/15 text-[#f0a13d]">
                  <SourceIcon size={20} strokeWidth={1.6} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] font-semibold text-[#fff3e4]">{activeSource.name}</p>
                  <p className="mt-1 text-[12px] text-[#65e985]">{activeSource.status}</p>
                  <p className="mt-1 text-[12px] text-[#b9b1a7]">{activeSource.detail}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  className="rounded-full bg-gradient-to-b from-[#ffbd63] to-[#f09a35] px-3 py-2 text-[13px] font-bold text-[#1a1008] transition active:scale-[0.98]"
                  onClick={() => showToast(activeSource.type === 'server' ? 'Server sync started (mock)' : 'Local library refreshed (mock)')}
                  type="button"
                >
                  {activeSource.type === 'server' ? 'Sync' : 'Refresh'}
                </button>
                <button
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[13px] font-semibold text-[#f0a13d] transition hover:bg-white/[0.07]"
                  onClick={() => setActiveSheet({ type: 'settings' })}
                  type="button"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'settings') {
      return (
        <AriaBottomSheet onClose={handleCloseSheet} subtitle="Display-only preferences for the Aria mock." title="Aria Settings">
          <div className="space-y-3">
            <SettingsSection title="Library Source">
              <SettingsRow label="Active source" value="Local library" onClick={() => showToast('Source settings preview (mock)')} />
              <SettingsRow label="Mode" value="Local preview" onClick={() => showToast('Local source mode preview (mock)')} />
            </SettingsSection>
            <SettingsSection title="Playback">
              <SettingsRow label="Gapless playback" value="Preview only" onClick={() => showToast('Gapless playback preview only (mock)')} />
              <SettingsRow label="Loudness normalization" value="Preview only" onClick={() => showToast('Loudness normalization preview only (mock)')} />
            </SettingsSection>
            <SettingsSection title="Interface">
              <SettingsRow label="Compact player" value="Preview only" onClick={() => showToast('Compact player preference preview (mock)')} />
              <SettingsRow label="Visual-only mode" value="Enabled" onClick={() => showToast('Visual-only mode enabled (mock)')} />
            </SettingsSection>
            <SettingsSection title="About">
              <SettingsRow label="Mock-only simulator" value="No backend connected" onClick={() => showToast('Aria is mock-only - no backend connected')} />
            </SettingsSection>
          </div>
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'libraryCategory') {
      const category = activeSheet.category
      const title = category === 'recent' ? 'Recently Added' : category === 'search' ? 'Search' : category[0].toUpperCase() + category.slice(1)
      return (
        <AriaBottomSheet onClose={handleCloseSheet} title={title}>
          {category === 'albums' || category === 'recent' ? (
            <SheetList>
              {ariaAlbums.map((album) => <SheetRow key={album.id} title={album.title} subtitle={`${album.artist} · ${album.year}`} onClick={() => openAlbumFromSheet(album)} />)}
            </SheetList>
          ) : category === 'artists' ? (
            <SheetList>
              {ariaArtists.map((artist) => <SheetRow key={artist.id} title={artist.name} subtitle={artist.genre} onClick={() => openArtistFromSheet(artist)} />)}
            </SheetList>
          ) : category === 'songs' || category === 'search' ? (
            <SheetList>
              {(category === 'search' ? ariaQueue.slice(0, 4) : ariaQueue).map((track) => <SheetRow key={track.id} title={track.title} subtitle={`${track.artist} · ${track.album}`} trailing={track.duration} onClick={() => openTrackFromSheet(track)} />)}
            </SheetList>
          ) : category === 'genres' ? (
            <SheetGrid>{mockGenres.map((genre) => <SheetChip key={genre} label={genre} onClick={() => showToast(`Open ${genre} genre (mock)`)} />)}</SheetGrid>
          ) : category === 'folders' ? (
            <SheetList>{mockFolders.map((folder) => <SheetRow key={folder} title={folder} subtitle="Mock folder view - no filesystem access" onClick={() => showToast(`Open ${folder} folder (mock - no filesystem access)`)} />)}</SheetList>
          ) : category === 'compilations' ? (
            <SheetList>{mockCompilations.map((compilation) => <SheetRow key={compilation} title={compilation} subtitle="Compilation" onClick={() => showToast(`Open ${compilation} compilation (mock)`)} />)}</SheetList>
          ) : (
            <SheetList>{ariaPlaylists.map((playlist) => <SheetRow key={playlist.id} title={playlist.title} subtitle={`${playlist.trackCount} tracks`} onClick={() => openPlaylistFromSheet(playlist)} />)}</SheetList>
          )}
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'exploreMode') {
      const mode = activeSheet.mode
      const title = mode === 'radios' ? 'Radio' : mode === 'recent' ? 'Recently Explored' : mode[0].toUpperCase() + mode.slice(1)
      return (
        <AriaBottomSheet onClose={handleCloseSheet} title={title}>
          {mode === 'search' ? (
            <div className="space-y-3">
              <SheetGroup title="Albums">{ariaAlbums.slice(0, 2).map((album) => <SheetRow key={album.id} title={album.title} subtitle={album.artist} onClick={() => openAlbumFromSheet(album)} />)}</SheetGroup>
              <SheetGroup title="Artists">{ariaArtists.slice(0, 2).map((artist) => <SheetRow key={artist.id} title={artist.name} subtitle={artist.genre} onClick={() => openArtistFromSheet(artist)} />)}</SheetGroup>
              <SheetGroup title="Tracks">{ariaQueue.slice(0, 2).map((track) => <SheetRow key={track.id} title={track.title} subtitle={track.artist} onClick={() => openTrackFromSheet(track)} />)}</SheetGroup>
              <SheetGroup title="Playlists">{ariaPlaylists.slice(0, 2).map((playlist) => <SheetRow key={playlist.id} title={playlist.title} subtitle={`${playlist.trackCount} tracks`} onClick={() => openPlaylistFromSheet(playlist)} />)}</SheetGroup>
            </div>
          ) : mode === 'genres' ? (
            <SheetGrid>{mockGenres.map((genre) => <SheetChip key={genre} label={genre} onClick={() => showToast(`Open ${genre} genre (mock)`)} />)}</SheetGrid>
          ) : mode === 'albums' || mode === 'recent' ? (
            <SheetList>{ariaAlbums.map((album) => <SheetRow key={album.id} title={album.title} subtitle={`${album.artist} · ${album.year}`} onClick={() => openAlbumFromSheet(album)} />)}</SheetList>
          ) : mode === 'artists' ? (
            <SheetList>{ariaArtists.map((artist) => <SheetRow key={artist.id} title={artist.name} subtitle={artist.genre} onClick={() => openArtistFromSheet(artist)} />)}</SheetList>
          ) : mode === 'radios' ? (
            <SheetList>{mockRadios.map((radio) => <SheetRow key={radio} title={radio} subtitle="Mock radio station" onClick={() => showToast(`${radio} (mock)`)} />)}</SheetList>
          ) : mode === 'songs' ? (
            <SheetList>{ariaQueue.map((track) => <SheetRow key={track.id} title={track.title} subtitle={`${track.artist} · ${track.album}`} onClick={() => openTrackFromSheet(track)} />)}</SheetList>
          ) : (
            <SheetList>{ariaPlaylists.map((playlist) => <SheetRow key={playlist.id} title={playlist.title} subtitle={`${playlist.trackCount} tracks`} onClick={() => openPlaylistFromSheet(playlist)} />)}</SheetList>
          )}
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'albumOptions') {
      const { album } = activeSheet

      return (
        <AriaBottomSheet onClose={handleCloseSheet} subtitle={`Actions for ${album.title}`} title="Album Options">
          <SheetList>
            <SheetRow title="Play album" subtitle="Start local mock playback feedback" onClick={() => closeSheetWithToast(`Playing ${album.title} (mock)`)} />
            <SheetRow title="Shuffle album" subtitle="Shuffle feedback only" onClick={() => closeSheetWithToast(`Shuffling ${album.title} (mock)`)} />
            <SheetRow title="View artist" subtitle={album.artist} onClick={() => openArtistByNameFromSheet(album.artist)} />
            <SheetRow title="Add album to playlist" subtitle="Open playlist picker preview" onClick={() => closeSheetWithToast(`Added ${album.title} to playlist picker (mock)`)} />
            <SheetRow title="Add album to queue" subtitle="Mock queue feedback only" onClick={() => closeSheetWithToast(`Added ${album.title} to mock queue`)} />
            <SheetRow title="Show album source" subtitle="No library connection used" onClick={() => closeSheetWithToast(`Source: ${album.source} (mock)`)} />
          </SheetList>
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'artistOptions') {
      const { artist } = activeSheet
      const latest = ariaAlbums.find((album) => album.artist === artist.name) ?? ariaAlbums[0]

      return (
        <AriaBottomSheet onClose={handleCloseSheet} subtitle={artist.name} title="Artist Options">
          <SheetList>
            <SheetRow title="Play top songs" subtitle="Start local mock playback feedback" onClick={() => closeSheetWithToast(`Playing top songs by ${artist.name} (mock)`)} />
            <SheetRow title="Shuffle artist" subtitle="Shuffle feedback only" onClick={() => closeSheetWithToast(`Shuffling ${artist.name} (mock)`)} />
            <SheetRow title="View latest release" subtitle={latest.title} onClick={() => openAlbumFromSheet(latest)} />
            <SheetRow title="Add artist to favorites" subtitle="Local mock favorite feedback" onClick={() => closeSheetWithToast(`Added ${artist.name} to favorites (mock)`)} />
            <SheetRow title="Start artist radio" subtitle="No real radio started" onClick={() => closeSheetWithToast(`Starting ${artist.name} radio (mock)`)} />
            <SheetRow title="Show artist info" subtitle="Profile information preview" onClick={() => closeSheetWithToast(`${artist.name} profile info (mock)`)} />
          </SheetList>
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'playlistOptions') {
      const { playlist } = activeSheet

      return (
        <AriaBottomSheet onClose={handleCloseSheet} subtitle={playlist.title} title="Playlist Options">
          <SheetList>
            <SheetRow title="Play playlist" subtitle="Start local mock playback feedback" onClick={() => closeSheetWithToast(`Playing ${playlist.title} (mock)`)} />
            <SheetRow title="Shuffle playlist" subtitle="Shuffle feedback only" onClick={() => closeSheetWithToast(`Shuffling ${playlist.title} (mock)`)} />
            <SheetRow title="Rename playlist" subtitle="Preview only" onClick={() => closeSheetWithToast(`Rename ${playlist.title} (mock)`)} />
            <SheetRow title="Duplicate playlist" subtitle="No playlist is created" onClick={() => closeSheetWithToast(`Duplicated ${playlist.title} (mock)`)} />
            <SheetRow title="Export preview" subtitle="No file is created" onClick={() => closeSheetWithToast('Export preview only - no file created (mock)')} />
            <SheetRow title="Delete preview" subtitle="No playlist is deleted" onClick={() => closeSheetWithToast(`Delete confirmation preview for ${playlist.title} (mock)`)} />
          </SheetList>
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'trackOptions') {
      const { track } = activeSheet

      return (
        <AriaBottomSheet onClose={handleCloseSheet} subtitle={track.title} title="Track Options">
          <SheetList>
            <SheetRow title="View details" subtitle={`${track.artist} · ${track.album}`} onClick={() => openTrackFromSheet(track)} />
            <SheetRow title="Add to playlist" subtitle="Choose a mock playlist" onClick={() => setActiveSheet({ type: 'addTrackToPlaylist', track })} />
            <SheetRow title="Add to queue" subtitle="Mock queue feedback only" onClick={() => closeSheetWithToast(`Added ${track.title} to mock queue`)} />
            <SheetRow title="Favorite" subtitle="Favorite feedback only" onClick={() => closeSheetWithToast(`Added ${track.title} to favorites (mock)`)} />
            <SheetRow title="Show in folder" subtitle="No filesystem access" onClick={() => closeSheetWithToast(`Folder location preview for ${track.title} (mock - no file access)`)} />
            <SheetRow title="Go to album" subtitle={track.album} onClick={() => openAlbumByTitleFromSheet(track.album)} />
            <SheetRow title="Go to artist" subtitle={track.artist} onClick={() => openArtistByNameFromSheet(track.artist)} />
          </SheetList>
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'artistTopSongs') {
      const { artist } = activeSheet

      return (
        <AriaBottomSheet onClose={handleCloseSheet} subtitle={artist.name} title="Top Songs">
          <SheetList>
            {ariaArtistTopSongs.map((track) => (
              <SheetRow key={track.id} title={track.title} subtitle={`${track.artist} · ${track.album}`} trailing={track.duration} onClick={() => openTrackFromSheet(track)} />
            ))}
          </SheetList>
        </AriaBottomSheet>
      )
    }

    if (activeSheet?.type === 'addTrackToPlaylist') {
      const { track } = activeSheet

      return (
        <AriaBottomSheet onClose={handleCloseSheet} subtitle={track.title} title="Add to Playlist">
          <SheetList>
            {ariaPlaylists.map((playlist) => (
              <SheetRow key={playlist.id} title={playlist.title} subtitle={`${playlist.trackCount} tracks · ${playlist.duration}`} onClick={() => closeSheetWithToast(`Added ${track.title} to ${playlist.title} (mock)`)} />
            ))}
          </SheetList>
        </AriaBottomSheet>
      )
    }

    return null
  }

  const showMiniPlayer = playbackOverlay === null

  return (
    <div className="relative flex h-full min-h-full min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_82%_18%,rgba(235,139,41,0.11),transparent_32%),radial-gradient(circle_at_16%_74%,rgba(222,129,34,0.09),transparent_34%),radial-gradient(circle_at_18%_10%,rgba(60,100,130,0.10),transparent_31%),linear-gradient(180deg,#061019_0%,#05090e_52%,#030609_100%)] text-[#f5ecdf]">
      {/* Scrollable content */}
      <div
        className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden ${
          showMiniPlayer ? 'pb-[11.25rem]' : 'pb-[5.75rem]'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 12 }}
            key={detailScreen ? `${activeTab}-${detailStack.length}-${detailScreen.type}` : activeTab}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {detailContent ?? screens[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mini player */}
      {showMiniPlayer && (
        <AriaMiniPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onExpand={handleExpandPlayer}
          onNext={handleNext}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
        />
      )}

      {/* Bottom navigation */}
      {playbackOverlay === null && <AriaBottomNav activeTab={activeTab} onTabChange={handleTabChange} />}

      {/* Playback overlay */}
      <AnimatePresence>
        {playbackOverlay && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 z-40"
            exit={{ opacity: 0, y: '10%' }}
            initial={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {playbackOverlay === 'nowPlaying' ? (
              <AriaNowPlaying
                isFavorite={isFavorite}
                isPlaying={isPlaying}
                isShuffled={isShuffled}
                onCollapse={handleCollapsePlayer}
                onNext={handleNext}
                onOpenLyrics={handleOpenLyrics}
                onOpenQueue={handleOpenQueue}
                onPlayPause={handlePlayPause}
                onPrevious={handlePrevious}
                onShowToast={showToast}
                onToggleFavorite={handleToggleFavorite}
                onToggleRepeat={handleToggleRepeat}
                onToggleShuffle={handleToggleShuffle}
                repeatMode={repeatMode}
              />
            ) : playbackOverlay === 'lyrics' ? (
              <AriaLyrics
                isPlaying={isPlaying}
                onBack={handleOpenNowPlaying}
                onCollapse={handleCollapsePlayer}
                onNext={handleNext}
                onOpenQueue={handleOpenQueue}
                onPlayPause={handlePlayPause}
                onPrevious={handlePrevious}
                onShowToast={showToast}
              />
            ) : (
              <AriaQueue
                isShuffled={isShuffled}
                onBack={handleOpenNowPlaying}
                onCollapse={handleCollapsePlayer}
                onShowToast={showToast}
                onToggleRepeat={handleToggleRepeat}
                onToggleShuffle={handleToggleShuffle}
                repeatMode={repeatMode}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{activeSheet && renderSheetContent()}</AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 right-0 top-3 z-50 flex justify-center px-5"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-full bg-[#1a1d24] px-4 py-2 text-xs font-medium text-white shadow-[0_0.5rem_1rem_rgba(0,0,0,0.35)] ring-1 ring-white/[0.08]">
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SettingsSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f0a13d]">{title}</h3>
      <div className="mt-1 overflow-hidden rounded-[15px] border border-white/[0.075] bg-white/[0.035]">
        {children}
      </div>
    </div>
  )
}

function SettingsRow({ label, onClick, value }: { label: string; onClick: () => void; value: string }) {
  return (
    <button
      className="flex w-full items-center justify-between gap-3 border-b border-white/[0.055] px-3 py-2 text-left last:border-b-0 transition hover:bg-white/[0.045]"
      onClick={onClick}
      type="button"
    >
      <span className="text-[13px] font-semibold text-[#f5ecdf]">{label}</span>
      <span className="text-right text-[12px] text-[#b9b1a7]">{value}</span>
    </button>
  )
}

function SheetList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>
}

function SheetGroup({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f0a13d]">{title}</h3>
      <div className="mt-1 space-y-1">{children}</div>
    </div>
  )
}

function SheetGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>
}

function SheetChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      className="rounded-2xl border border-white/[0.075] bg-white/[0.035] px-3 py-2 text-left text-[14px] text-[#f5ecdf] transition hover:bg-white/[0.055]"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

function SheetRow({
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
      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-white/[0.045]"
      onClick={onClick}
      type="button"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold text-[#f5ecdf]">{title}</span>
        <span className="mt-0.5 block truncate text-[12px] text-[#b9b1a7]">{subtitle}</span>
      </span>
      {trailing ? <span className="text-[12px] text-[#b9b1a7]">{trailing}</span> : null}
      <ChevronRight size={17} className="shrink-0 text-[#ffb05d]" />
    </button>
  )
}
