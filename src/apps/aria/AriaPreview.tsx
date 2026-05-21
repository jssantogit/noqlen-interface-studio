import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { AriaTabId } from './ariaInteractionMap'
import { AriaBottomNav } from './components/AriaBottomNav'
import { AriaExplore } from './components/AriaExplore'
import { AriaLibrary } from './components/AriaLibrary'
import { AriaListenHome } from './components/AriaListenHome'
import { AriaMiniPlayer } from './components/AriaMiniPlayer'
import { AriaNowPlaying } from './components/AriaNowPlaying'
import { AriaPlaylists } from './components/AriaPlaylists'

export function AriaPreview() {
  const [activeTab, setActiveTab] = useState<AriaTabId>('listen')
  const [playerExpanded, setPlayerExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off')
  const [isFavorite, setIsFavorite] = useState(false)
  const [toast, setToast] = useState<{ message: string } | null>(null)

  const showToast = useCallback((message: string) => {
    setToast({ message })
    setTimeout(() => setToast(null), 2200)
  }, [])

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const handleNext = useCallback(() => {
    showToast('Next track (mock)')
  }, [showToast])

  const handlePrevious = useCallback(() => {
    showToast('Previous track (mock)')
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
    setPlayerExpanded(false)
  }, [])

  const handleExpandPlayer = useCallback(() => {
    setPlayerExpanded(true)
  }, [])

  const handleCollapsePlayer = useCallback(() => {
    setPlayerExpanded(false)
  }, [])

  const handleNavigateToExplore = useCallback(() => {
    setActiveTab('explore')
  }, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    showToast('Playback started (mock)')
  }, [showToast])

  const screens: Record<AriaTabId, React.ReactNode> = {
    listen: (
      <AriaListenHome
        onNavigateToExplore={handleNavigateToExplore}
        onPlay={handlePlay}
        onShowToast={showToast}
      />
    ),
    library: <AriaLibrary onShowToast={showToast} />,
    playlists: <AriaPlaylists onShowToast={showToast} />,
    explore: <AriaExplore onShowToast={showToast} />,
  }

  const showMiniPlayer = !playerExpanded

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
            key={activeTab}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {screens[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mini player */}
      {showMiniPlayer && (
        <AriaMiniPlayer
          isPlaying={isPlaying}
          onExpand={handleExpandPlayer}
          onNext={handleNext}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
        />
      )}

      {/* Bottom navigation */}
      <AriaBottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Now Playing overlay */}
      <AnimatePresence>
        {playerExpanded && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 z-40"
            exit={{ opacity: 0, y: '10%' }}
            initial={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <AriaNowPlaying
              isFavorite={isFavorite}
              isPlaying={isPlaying}
              isShuffled={isShuffled}
              onCollapse={handleCollapsePlayer}
              onNext={handleNext}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onToggleFavorite={handleToggleFavorite}
              onToggleRepeat={handleToggleRepeat}
              onToggleShuffle={handleToggleShuffle}
              repeatMode={repeatMode}
            />
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
