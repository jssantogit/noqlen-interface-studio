import type { ForgeTab } from './ForgePreview'

/**
 * Forge Interaction Map — static metadata only.
 *
 * This file exports lightweight lists of interaction groups, names and status.
 * No runtime complexity. No backend behavior. No side effects.
 */

export type InteractionStatus =
  | 'not-implemented'
  | 'partial'
  | 'implemented'
  | 'deferred'
  | 'needs-qa'

export interface InteractionEntry {
  id: string
  name: string
  screen: ForgeTab | 'global'
  status: InteractionStatus
}

export const forgeInteractions: InteractionEntry[] = [
  // Home
  { id: 'HN-1', name: 'Review Now', screen: 'home', status: 'implemented' },
  { id: 'HN-2', name: 'Missing Lyrics Card', screen: 'home', status: 'implemented' },
  { id: 'HN-3', name: 'Better Covers Card', screen: 'home', status: 'implemented' },
  { id: 'HN-4', name: 'Missing Genres Card', screen: 'home', status: 'implemented' },
  { id: 'HN-5', name: 'Settings Gear', screen: 'home', status: 'implemented' },
  { id: 'HN-6', name: 'Safety Note Card', screen: 'home', status: 'implemented' },

  // Review
  { id: 'RV-1', name: 'Fix Selected', screen: 'review', status: 'implemented' },
  { id: 'RV-2', name: 'Fix All', screen: 'review', status: 'implemented' },
  { id: 'RV-3', name: 'Ignore Selected', screen: 'review', status: 'implemented' },
  { id: 'RV-4', name: 'Item Checkbox', screen: 'review', status: 'implemented' },
  { id: 'RV-5', name: 'Group Expand/Collapse', screen: 'review', status: 'implemented' },
  { id: 'RV-6', name: 'Missing Lyrics Item Tap', screen: 'review', status: 'implemented' },
  { id: 'RV-7', name: 'Cover Item Tap', screen: 'review', status: 'implemented' },
  { id: 'RV-8', name: 'Genre Item Tap', screen: 'review', status: 'implemented' },
  { id: 'RV-9', name: 'Review Covers from Library', screen: 'review', status: 'not-implemented' },
  { id: 'RV-10', name: 'Status After Fix/Ignore', screen: 'review', status: 'implemented' },

  // Library
  { id: 'LB-1', name: 'Search', screen: 'library', status: 'partial' },
  { id: 'LB-2', name: 'Segmented Control', screen: 'library', status: 'implemented' },
  { id: 'LB-3', name: 'Artist Row Tap', screen: 'library', status: 'not-implemented' },
  { id: 'LB-4', name: 'Album Row Tap', screen: 'library', status: 'not-implemented' },
  { id: 'LB-5', name: 'Song Row Tap', screen: 'library', status: 'not-implemented' },
  { id: 'LB-6', name: 'Missing Metadata Badge Tap', screen: 'library', status: 'not-implemented' },
  { id: 'LB-7', name: 'Chevron Rows', screen: 'library', status: 'not-implemented' },
  { id: 'LB-8', name: 'Sort/Filter', screen: 'library', status: 'not-implemented' },

  // Activity
  { id: 'AC-1', name: 'Activity Card Tap', screen: 'activity', status: 'not-implemented' },
  { id: 'AC-2', name: 'Summary Button', screen: 'activity', status: 'not-implemented' },
  { id: 'AC-3', name: 'Review Button', screen: 'activity', status: 'not-implemented' },
  { id: 'AC-4', name: 'Today/Yesterday Grouping', screen: 'activity', status: 'implemented' },
  { id: 'AC-5', name: 'Activity Filters', screen: 'activity', status: 'not-implemented' },

  // Global
  { id: 'GL-1', name: 'Toast', screen: 'global', status: 'implemented' },
  { id: 'GL-2', name: 'Confirm Dialog', screen: 'global', status: 'implemented' },
  { id: 'GL-3', name: 'Bottom Sheet', screen: 'global', status: 'implemented' },
  { id: 'GL-4', name: 'Mock State Controls', screen: 'global', status: 'not-implemented' },
]

export const forgeInteractionBatches = [
  {
    name: 'Batch 1: Overlay Foundation + Home',
    interactions: ['GL-1', 'GL-2', 'GL-3', 'GL-4', 'HN-1', 'HN-2', 'HN-3', 'HN-4', 'HN-5', 'HN-6'],
  },
  {
    name: 'Batch 2: Review Queue Interactions',
    interactions: ['RV-1', 'RV-2', 'RV-3', 'RV-5', 'RV-10'],
  },
  {
    name: 'Batch 3: Review Item Detail Flows',
    interactions: ['RV-6', 'RV-7', 'RV-8', 'RV-9'],
  },
  {
    name: 'Batch 4: Library Interactions',
    interactions: ['LB-1', 'LB-3', 'LB-4', 'LB-5', 'LB-6', 'LB-7', 'LB-8'],
  },
  {
    name: 'Batch 5: Activity Interactions',
    interactions: ['AC-1', 'AC-2', 'AC-3', 'AC-5'],
  },
  {
    name: 'Batch 6: State Coverage',
    interactions: ['HN-1', 'RV-1', 'RV-2', 'RV-3', 'LB-1', 'AC-1', 'GL-4'],
  },
  {
    name: 'Batch 7: Completion Audit',
    interactions: forgeInteractions.map((i) => i.id),
  },
]
