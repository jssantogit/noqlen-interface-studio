/**
 * Forge Mock State — deterministic preview states for Studio QA.
 *
 * No real backend behavior. No persistence. Local React state only.
 */

export type ForgeMockScenario =
  | 'normal'
  | 'homeNoIssues'
  | 'homeProvidersUnavailable'
  | 'homeMissingCredentials'
  | 'homeEnrichCompleted'
  | 'reviewEmpty'
  | 'reviewAllApplied'
  | 'reviewProviderUnavailable'
  | 'reviewMissingCredentials'
  | 'reviewConflictHeavy'
  | 'reviewNoResultsFilter'
  | 'libraryEmpty'
  | 'libraryNoSearchResults'
  | 'libraryMissingArtwork'
  | 'libraryMetadataIncomplete'
  | 'libraryEditorSaveFailed'
  | 'activityEmpty'
  | 'activityFilterNoResults'
  | 'activityFailedItem'
  | 'activityWarningItem'
  | 'settingsUnsavedChanges'
  | 'settingsMissingCredentials'
  | 'settingsInvalidCredential'
  | 'settingsProviderDisabled'
  | 'settingsProviderUnavailable'
  | 'settingsUpdateAvailable'
  | 'settingsUpdateFailed'
  | 'enrichNoOptions'
  | 'enrichNoTarget'
  | 'enrichOverwriteWarning'
  | 'enrichProtectedWarning'
  | 'enrichDryRunNoChanges'
  | 'enrichDryRunFailed'
  | 'enrichRewriteFailed'
  | 'appOffline'

export interface ForgeMockState {
  scenario: ForgeMockScenario
  // Derived flags for convenience (computed from scenario)
  homeState: 'normal' | 'noIssues' | 'providersUnavailable' | 'missingCredentials' | 'enrichCompleted'
  reviewState: 'normal' | 'empty' | 'allApplied' | 'providerUnavailable' | 'missingCredentials' | 'conflictHeavy' | 'noResultsFilter'
  libraryState: 'normal' | 'empty' | 'noSearchResults' | 'missingArtwork' | 'metadataIncomplete' | 'editorSaveFailed'
  activityState: 'normal' | 'empty' | 'filterNoResults' | 'failedItem' | 'warningItem'
  settingsState: 'normal' | 'unsavedChanges' | 'missingCredentials' | 'invalidCredential' | 'providerDisabled' | 'providerUnavailable' | 'updateAvailable' | 'updateFailed'
  enrichState: 'normal' | 'noOptions' | 'noTarget' | 'overwriteWarning' | 'protectedWarning' | 'dryRunNoChanges' | 'dryRunFailed' | 'rewriteFailed'
  appOffline: boolean
}

const scenarioMap: Record<ForgeMockScenario, Partial<ForgeMockState>> = {
  normal: {},
  homeNoIssues: { homeState: 'noIssues' },
  homeProvidersUnavailable: { homeState: 'providersUnavailable' },
  homeMissingCredentials: { homeState: 'missingCredentials' },
  homeEnrichCompleted: { homeState: 'enrichCompleted' },
  reviewEmpty: { reviewState: 'empty' },
  reviewAllApplied: { reviewState: 'allApplied' },
  reviewProviderUnavailable: { reviewState: 'providerUnavailable' },
  reviewMissingCredentials: { reviewState: 'missingCredentials' },
  reviewConflictHeavy: { reviewState: 'conflictHeavy' },
  reviewNoResultsFilter: { reviewState: 'noResultsFilter' },
  libraryEmpty: { libraryState: 'empty' },
  libraryNoSearchResults: { libraryState: 'noSearchResults' },
  libraryMissingArtwork: { libraryState: 'missingArtwork' },
  libraryMetadataIncomplete: { libraryState: 'metadataIncomplete' },
  libraryEditorSaveFailed: { libraryState: 'editorSaveFailed' },
  activityEmpty: { activityState: 'empty' },
  activityFilterNoResults: { activityState: 'filterNoResults' },
  activityFailedItem: { activityState: 'failedItem' },
  activityWarningItem: { activityState: 'warningItem' },
  settingsUnsavedChanges: { settingsState: 'unsavedChanges' },
  settingsMissingCredentials: { settingsState: 'missingCredentials' },
  settingsInvalidCredential: { settingsState: 'invalidCredential' },
  settingsProviderDisabled: { settingsState: 'providerDisabled' },
  settingsProviderUnavailable: { settingsState: 'providerUnavailable' },
  settingsUpdateAvailable: { settingsState: 'updateAvailable' },
  settingsUpdateFailed: { settingsState: 'updateFailed' },
  enrichNoOptions: { enrichState: 'noOptions' },
  enrichNoTarget: { enrichState: 'noTarget' },
  enrichOverwriteWarning: { enrichState: 'overwriteWarning' },
  enrichProtectedWarning: { enrichState: 'protectedWarning' },
  enrichDryRunNoChanges: { enrichState: 'dryRunNoChanges' },
  enrichDryRunFailed: { enrichState: 'dryRunFailed' },
  enrichRewriteFailed: { enrichState: 'rewriteFailed' },
  appOffline: { appOffline: true },
}

export function buildMockState(scenario: ForgeMockScenario): ForgeMockState {
  const patch = scenarioMap[scenario] ?? {}
  return {
    scenario,
    homeState: patch.homeState ?? 'normal',
    reviewState: patch.reviewState ?? 'normal',
    libraryState: patch.libraryState ?? 'normal',
    activityState: patch.activityState ?? 'normal',
    settingsState: patch.settingsState ?? 'normal',
    enrichState: patch.enrichState ?? 'normal',
    appOffline: patch.appOffline ?? false,
  }
}

export const mockScenarioLabels: Record<ForgeMockScenario, string> = {
  normal: 'Normal (default)',
  homeNoIssues: 'Home — No issues found',
  homeProvidersUnavailable: 'Home — Providers unavailable',
  homeMissingCredentials: 'Home — Missing credentials',
  homeEnrichCompleted: 'Home — Recent enrich completed',
  reviewEmpty: 'Review — Empty queue',
  reviewAllApplied: 'Review — All fixes applied',
  reviewProviderUnavailable: 'Review — Provider unavailable',
  reviewMissingCredentials: 'Review — Missing credentials',
  reviewConflictHeavy: 'Review — Conflict-heavy queue',
  reviewNoResultsFilter: 'Review — No results after filter',
  libraryEmpty: 'Library — Empty library',
  libraryNoSearchResults: 'Library — No search results',
  libraryMissingArtwork: 'Library — Missing artwork',
  libraryMetadataIncomplete: 'Library — Metadata incomplete',
  libraryEditorSaveFailed: 'Library — Editor save failed',
  activityEmpty: 'Activity — Empty activity',
  activityFilterNoResults: 'Activity — Filter no results',
  activityFailedItem: 'Activity — Failed item',
  activityWarningItem: 'Activity — Warning item',
  settingsUnsavedChanges: 'Settings — Unsaved changes',
  settingsMissingCredentials: 'Settings — Missing credentials',
  settingsInvalidCredential: 'Settings — Invalid credential',
  settingsProviderDisabled: 'Settings — Provider disabled',
  settingsProviderUnavailable: 'Settings — Provider unavailable',
  settingsUpdateAvailable: 'Settings — Update available',
  settingsUpdateFailed: 'Settings — Update failed',
  enrichNoOptions: 'Enrich — No options selected',
  enrichNoTarget: 'Enrich — No target selected',
  enrichOverwriteWarning: 'Enrich — Overwrite warning',
  enrichProtectedWarning: 'Enrich — Protected field warning',
  enrichDryRunNoChanges: 'Enrich — Dry-run no changes',
  enrichDryRunFailed: 'Enrich — Dry-run failed',
  enrichRewriteFailed: 'Enrich — Rewrite failed',
  appOffline: 'App — Offline mock',
}

export const mockScenarioGroups = [
  {
    label: 'Home',
    scenarios: [
      'homeNoIssues',
      'homeProvidersUnavailable',
      'homeMissingCredentials',
      'homeEnrichCompleted',
    ] as ForgeMockScenario[],
  },
  {
    label: 'Review',
    scenarios: [
      'reviewEmpty',
      'reviewAllApplied',
      'reviewProviderUnavailable',
      'reviewMissingCredentials',
      'reviewConflictHeavy',
      'reviewNoResultsFilter',
    ] as ForgeMockScenario[],
  },
  {
    label: 'Library',
    scenarios: [
      'libraryEmpty',
      'libraryNoSearchResults',
      'libraryMissingArtwork',
      'libraryMetadataIncomplete',
      'libraryEditorSaveFailed',
    ] as ForgeMockScenario[],
  },
  {
    label: 'Activity',
    scenarios: [
      'activityEmpty',
      'activityFilterNoResults',
      'activityFailedItem',
      'activityWarningItem',
    ] as ForgeMockScenario[],
  },
  {
    label: 'Settings',
    scenarios: [
      'settingsUnsavedChanges',
      'settingsMissingCredentials',
      'settingsInvalidCredential',
      'settingsProviderDisabled',
      'settingsProviderUnavailable',
      'settingsUpdateAvailable',
      'settingsUpdateFailed',
    ] as ForgeMockScenario[],
  },
  {
    label: 'Enrich Mode',
    scenarios: [
      'enrichNoOptions',
      'enrichNoTarget',
      'enrichOverwriteWarning',
      'enrichProtectedWarning',
      'enrichDryRunNoChanges',
      'enrichDryRunFailed',
      'enrichRewriteFailed',
    ] as ForgeMockScenario[],
  },
  {
    label: 'Global',
    scenarios: ['appOffline'] as ForgeMockScenario[],
  },
]
