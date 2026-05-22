import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { AriaTabId } from './ariaInteractionMap'
import type { AriaAlbum, AriaArtist, AriaPlaylist, AriaTrack } from './ariaMockData'
import { ariaAlbums, ariaArtists, ariaPlaylists, ariaQueue, nowPlaying } from './ariaMockData'
import { AriaAlbumDetail } from './components/AriaAlbumDetail'
import { AriaArtistDetail } from './components/AriaArtistDetail'
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

const playbackQueue = [nowPlaying, ...ariaQueue]

export function AriaPreview() {
  const [activeTab, setActiveTab] = useState<AriaTabId>('listen')
  const [playbackOverlay, setPlaybackOverlay] = useState<AriaPlaybackOverlay | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off')
  const [isFavorite, setIsFavorite] = useState(false)
  const [detailStack, setDetailStack] = useState<AriaDetailScreen[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
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

  const handleNavigateToExplore = useCallback(() => {
    setActiveTab('explore')
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

  const handleBackFromDetail = useCallback(() => {
    setDetailStack((stack) => stack.length > 1 ? stack.slice(0, -1) : [])
  }, [])

  const screens: Record<AriaTabId, React.ReactNode> = {
    listen: (
      <AriaListenHome
        onOpenAlbum={handleOpenAlbum}
        onOpenArtist={handleOpenArtist}
        onOpenPlaylist={handleOpenPlaylist}
        onOpenTrack={handleOpenTrack}
        onNavigateToExplore={handleNavigateToExplore}
        onPlay={handlePlay}
        onShowToast={showToast}
      />
    ),
    library: <AriaLibrary onOpenAlbum={handleOpenAlbum} onOpenArtist={handleOpenArtist} onOpenPlaylist={handleOpenPlaylist} onShowToast={showToast} />,
    playlists: <AriaPlaylists onOpenPlaylist={handleOpenPlaylist} onShowToast={showToast} />,
    explore: <AriaExplore onOpenAlbum={handleOpenAlbum} onOpenArtist={handleOpenArtist} onOpenPlaylist={handleOpenPlaylist} onOpenTrack={handleOpenTrack} onShowToast={showToast} />,
  }

  const detailContent = detailScreen?.type === 'album'
    ? <AriaAlbumDetail album={detailScreen.album} onBack={handleBackFromDetail} onOpenTrack={handleOpenTrack} onShowToast={showToast} />
    : detailScreen?.type === 'artist'
      ? <AriaArtistDetail artist={detailScreen.artist} onBack={handleBackFromDetail} onOpenAlbum={handleOpenAlbum} onOpenTrack={handleOpenTrack} onShowToast={showToast} />
      : detailScreen?.type === 'track'
        ? <AriaTrackDetails track={detailScreen.track} onBack={handleBackFromDetail} onShowToast={showToast} />
        : detailScreen?.type === 'playlist'
          ? <AriaPlaylistDetail playlist={detailScreen.playlist} onBack={handleBackFromDetail} onOpenTrack={handleOpenTrack} onShowToast={showToast} />
          : null

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
