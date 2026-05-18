/**
 * Aria Interaction Map — Static Metadata
 *
 * This file exports static metadata only: screen lists, nav items,
 * interaction IDs, implementation statuses, mock-only notes and batch
 * groupings. No runtime behavior, no backend, no real audio.
 */

export type AriaScreenId =
  | 'listen'
  | 'library'
  | 'playlists'
  | 'explore'
  | 'albumDetail'
  | 'artistDetail'
  | 'trackDetails'
  | 'playlistDetail'
  | 'nowPlaying'
  | 'lyrics'
  | 'metadataReview'

export type AriaTabId = 'listen' | 'library' | 'playlists' | 'explore'

export type AriaInteractionStatus =
  | 'not_implemented'
  | 'partial'
  | 'implemented'
  | 'deferred'

export type AriaInteraction = {
  id: string
  name: string
  screen: AriaScreenId | 'global'
  status: AriaInteractionStatus
  batch: number
  mockOnly: boolean
  notes?: string
}

export const ariaTabs: { id: AriaTabId; label: string; iconName: string }[] = [
  { id: 'listen', label: 'Listen', iconName: 'Home' },
  { id: 'library', label: 'Library', iconName: 'Library' },
  { id: 'playlists', label: 'Playlists', iconName: 'ListMusic' },
  { id: 'explore', label: 'Explore', iconName: 'Compass' },
]

export const ariaScreens: { id: AriaScreenId; label: string; type: 'tab' | 'detail' | 'overlay' }[] = [
  { id: 'listen', label: 'Listen', type: 'tab' },
  { id: 'library', label: 'Library', type: 'tab' },
  { id: 'playlists', label: 'Playlists', type: 'tab' },
  { id: 'explore', label: 'Explore', type: 'tab' },
  { id: 'albumDetail', label: 'Album Detail', type: 'detail' },
  { id: 'artistDetail', label: 'Artist Detail', type: 'detail' },
  { id: 'trackDetails', label: 'Track Details', type: 'detail' },
  { id: 'playlistDetail', label: 'Playlist Detail', type: 'detail' },
  { id: 'nowPlaying', label: 'Now Playing', type: 'overlay' },
  { id: 'lyrics', label: 'Lyrics', type: 'overlay' },
  { id: 'metadataReview', label: 'Metadata Review', type: 'detail' },
]

export const ariaInteractions: AriaInteraction[] = [
  // Global
  { id: 'GL-1', name: 'Bottom Navigation', screen: 'global', status: 'implemented', batch: 1, mockOnly: true },
  { id: 'GL-2', name: 'Mini Player Expand', screen: 'global', status: 'implemented', batch: 1, mockOnly: true, notes: 'Tapping mini player opens full Now Playing overlay' },
  { id: 'GL-3', name: 'Now Playing Collapse', screen: 'global', status: 'implemented', batch: 1, mockOnly: true, notes: 'Chevron down collapses back to mini player' },
  { id: 'GL-4', name: 'Play / Pause', screen: 'global', status: 'implemented', batch: 1, mockOnly: true, notes: 'Visual toggle only; no real audio' },
  { id: 'GL-5', name: 'Next Track', screen: 'global', status: 'partial', batch: 1, mockOnly: true, notes: 'Shows toast; no queue cycling yet' },
  { id: 'GL-6', name: 'Previous Track', screen: 'global', status: 'partial', batch: 1, mockOnly: true, notes: 'Shows toast; no queue cycling yet' },
  { id: 'GL-7', name: 'Seek / Progress Bar', screen: 'global', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'GL-8', name: 'Shuffle Toggle', screen: 'global', status: 'implemented', batch: 1, mockOnly: true, notes: 'Visual toggle with toast feedback' },
  { id: 'GL-9', name: 'Repeat Toggle', screen: 'global', status: 'implemented', batch: 1, mockOnly: true, notes: 'Cycles off/all/one with toast feedback' },
  { id: 'GL-10', name: 'Like / Favorite', screen: 'global', status: 'implemented', batch: 1, mockOnly: true, notes: 'Visual heart toggle with toast feedback' },
  { id: 'GL-11', name: 'Toast', screen: 'global', status: 'implemented', batch: 1, mockOnly: true },
  { id: 'GL-12', name: 'Confirm Dialog', screen: 'global', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'GL-13', name: 'Bottom Sheet', screen: 'global', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'GL-14', name: 'Back Navigation', screen: 'global', status: 'not_implemented', batch: 2, mockOnly: true },

  // Listen (Home)
  { id: 'LS-1', name: 'Recent Listen Shelf', screen: 'listen', status: 'implemented', batch: 1, mockOnly: true, notes: 'Horizontal scroll shelf with static mock albums' },
  { id: 'LS-2', name: 'Featured Playlist Card', screen: 'listen', status: 'implemented', batch: 1, mockOnly: true, notes: 'Static featured playlist grid' },
  { id: 'LS-3', name: 'Quick Resume Row', screen: 'listen', status: 'implemented', batch: 1, mockOnly: true, notes: 'Static quick resume rows' },
  { id: 'LS-4', name: 'Home Search Affordance', screen: 'listen', status: 'implemented', batch: 1, mockOnly: true, notes: 'Tapping search navigates to Explore tab' },

  // Library
  { id: 'LB-1', name: 'Category Tabs', screen: 'library', status: 'not_implemented', batch: 3, mockOnly: true },
  { id: 'LB-2', name: 'Album Row Tap', screen: 'library', status: 'not_implemented', batch: 4, mockOnly: true },
  { id: 'LB-3', name: 'Artist Row Tap', screen: 'library', status: 'not_implemented', batch: 4, mockOnly: true },
  { id: 'LB-4', name: 'Song Row Tap', screen: 'library', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'LB-5', name: 'Library Search', screen: 'library', status: 'not_implemented', batch: 3, mockOnly: true },
  { id: 'LB-6', name: 'Library Sort / Filter', screen: 'library', status: 'not_implemented', batch: 3, mockOnly: true },

  // Playlists
  { id: 'PL-1', name: 'Playlist Row Tap', screen: 'playlists', status: 'not_implemented', batch: 4, mockOnly: true },
  { id: 'PL-2', name: 'Create Playlist', screen: 'playlists', status: 'not_implemented', batch: 4, mockOnly: true },
  { id: 'PL-3', name: 'Playlist Detail Play', screen: 'playlistDetail', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'PL-4', name: 'Playlist Detail Shuffle', screen: 'playlistDetail', status: 'not_implemented', batch: 2, mockOnly: true },

  // Explore (Search)
  { id: 'EX-1', name: 'Search Input', screen: 'explore', status: 'not_implemented', batch: 6, mockOnly: true },
  { id: 'EX-2', name: 'Search Filter Chips', screen: 'explore', status: 'not_implemented', batch: 6, mockOnly: true },
  { id: 'EX-3', name: 'Search Result Tap', screen: 'explore', status: 'not_implemented', batch: 6, mockOnly: true },
  { id: 'EX-4', name: 'Recent Searches', screen: 'explore', status: 'not_implemented', batch: 6, mockOnly: true },

  // Album Detail
  { id: 'AD-1', name: 'Play Album', screen: 'albumDetail', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'AD-2', name: 'Shuffle Album', screen: 'albumDetail', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'AD-3', name: 'More Menu on Album', screen: 'albumDetail', status: 'not_implemented', batch: 4, mockOnly: true },
  { id: 'AD-4', name: 'Track Row Tap in Album', screen: 'albumDetail', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'AD-5', name: 'Track More Menu in Album', screen: 'albumDetail', status: 'not_implemented', batch: 4, mockOnly: true },

  // Artist Detail
  { id: 'AR-1', name: 'Play Top Tracks', screen: 'artistDetail', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'AR-2', name: 'Album Tap in Discography', screen: 'artistDetail', status: 'not_implemented', batch: 4, mockOnly: true },
  { id: 'AR-3', name: 'More Menu on Artist', screen: 'artistDetail', status: 'not_implemented', batch: 4, mockOnly: true },

  // Track Details
  { id: 'TD-1', name: 'Favorite Action', screen: 'trackDetails', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'TD-2', name: 'Add to Playlist', screen: 'trackDetails', status: 'not_implemented', batch: 4, mockOnly: true },
  { id: 'TD-3', name: 'Add to Queue', screen: 'trackDetails', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'TD-4', name: 'Show in Folder', screen: 'trackDetails', status: 'not_implemented', batch: 4, mockOnly: true },
  { id: 'TD-5', name: 'Edit Metadata', screen: 'trackDetails', status: 'not_implemented', batch: 4, mockOnly: true, notes: 'Deferred to later batch if needed' },
  { id: 'TD-6', name: 'Metadata Row Info', screen: 'trackDetails', status: 'not_implemented', batch: 4, mockOnly: true },

  // Queue / Now Playing
  { id: 'QP-1', name: 'Reorder Queue', screen: 'nowPlaying', status: 'not_implemented', batch: 5, mockOnly: true, notes: 'Visual affordance first; full drag optional' },
  { id: 'QP-2', name: 'Remove from Queue', screen: 'nowPlaying', status: 'not_implemented', batch: 5, mockOnly: true },
  { id: 'QP-3', name: 'Save as Playlist', screen: 'nowPlaying', status: 'not_implemented', batch: 5, mockOnly: true },
  { id: 'QP-4', name: 'Clear Queue', screen: 'nowPlaying', status: 'not_implemented', batch: 5, mockOnly: true },
  { id: 'QP-5', name: 'Queue Shuffle Action', screen: 'nowPlaying', status: 'not_implemented', batch: 5, mockOnly: true },
  { id: 'QP-6', name: 'Queue Repeat Action', screen: 'nowPlaying', status: 'not_implemented', batch: 5, mockOnly: true },

  // Lyrics
  { id: 'LY-1', name: 'Open Lyrics', screen: 'lyrics', status: 'not_implemented', batch: 5, mockOnly: true },
  { id: 'LY-2', name: 'Close Lyrics', screen: 'lyrics', status: 'not_implemented', batch: 5, mockOnly: true },

  // Metadata Review
  { id: 'MR-1', name: 'Review Safe Fixes', screen: 'metadataReview', status: 'not_implemented', batch: 7, mockOnly: true },
  { id: 'MR-2', name: 'Issue Category Tap', screen: 'metadataReview', status: 'not_implemented', batch: 7, mockOnly: true },
  { id: 'MR-3', name: 'Review Fixes CTA', screen: 'metadataReview', status: 'not_implemented', batch: 7, mockOnly: true },

  // Mini Player
  { id: 'MP-1', name: 'Mini Player Play/Pause', screen: 'global', status: 'not_implemented', batch: 2, mockOnly: true },
  { id: 'MP-2', name: 'Mini Player Next/Previous', screen: 'global', status: 'not_implemented', batch: 2, mockOnly: true },
]

export const ariaBatchLabels: Record<number, string> = {
  1: 'Visual Baseline & Navigation Shell',
  2: 'Playback Core Interactions',
  3: 'Library Browsing',
  4: 'Artist/Album/Song/Playlist Detail',
  5: 'Lyrics & Queue',
  6: 'Search & Explore',
  7: 'Metadata Review & Library Health',
  8: 'Aria State Coverage',
  9: 'Aria Completion Audit',
}

export const ariaMockOnlyRules: string[] = [
  'No real audio playback.',
  'No real music file access.',
  'No folder scanning.',
  'No local library reading.',
  'No album art fetching.',
  'No lyric fetching.',
  'No streaming API calls.',
  'No backend calls.',
  'No Navidrome calls.',
  'No Forge Core calls.',
  'No fetch/axios for app behavior.',
  'No FileReader.',
  'No fs.',
  'No child_process.',
  'No filesystem access.',
  'No secrets, auth, or analytics.',
  'No real playback engine.',
]

export function getInteractionsByBatch(batch: number): AriaInteraction[] {
  return ariaInteractions.filter((i) => i.batch === batch)
}

export function getInteractionsByScreen(screen: AriaScreenId | 'global'): AriaInteraction[] {
  return ariaInteractions.filter((i) => i.screen === screen)
}

export function getInteractionStatusSummary(): Record<AriaInteractionStatus, number> {
  return ariaInteractions.reduce(
    (acc, i) => {
      acc[i.status] = (acc[i.status] || 0) + 1
      return acc
    },
    {} as Record<AriaInteractionStatus, number>,
  )
}
