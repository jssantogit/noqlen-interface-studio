import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Eye,
  EyeOff,
  Globe,
  Image,
  KeyRound,
  Languages,
  RotateCcw,
  Save,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Volume2,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ForgeMockState, ForgeMockScenario } from '../forgeMockState'
import { ForgeBottomSheet } from './ForgeBottomSheet'
import {
  defaultForgeSettingsState,
  forgeSettingsCatalog,
  type ForgeProviderConfig,
  type ForgeRewriteRule,
  type ForgeSettingsState,
} from '../forgeSettingsCatalog'
import { ForgeConfirmDialog } from './ForgeConfirmDialog'
import { ForgeMockStatePanel } from './ForgeMockStatePanel'
import { ForgeProgressSheet } from './ForgeProgressSheet'
import { ForgeStateNotice } from './ForgeStateNotice'

type SettingsCategory =
  | 'Metadata Providers'
  | 'API Keys'
  | 'Tags & Metadata'
  | 'Artwork'
  | 'Lyrics'
  | 'Audio'
  | 'Safety & Review'
  | 'App Updates'
  | 'Advanced'

const categoryOrder: SettingsCategory[] = [
  'Metadata Providers',
  'API Keys',
  'Tags & Metadata',
  'Artwork',
  'Lyrics',
  'Audio',
  'Safety & Review',
  'App Updates',
  'Advanced',
]

const categoryIcons: Record<SettingsCategory, ReactNode> = {
  'Metadata Providers': <Globe size={16} />,
  'API Keys': <KeyRound size={16} />,
  'Tags & Metadata': <TagsIcon />,
  Artwork: <Image size={16} />,
  Lyrics: <Languages size={16} />,
  Audio: <Volume2 size={16} />,
  'Safety & Review': <ShieldCheck size={16} />,
  'App Updates': <Zap size={16} />,
  Advanced: <Wrench size={16} />,
}

function TagsIcon() {
  return (
    <svg height="16" viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  )
}

const providerTestSteps: Record<string, string[]> = {
  MusicBrainz: ['Preparing mock lookup', 'Checking identity rules', 'Mock provider reachable'],
  Discogs: ['Checking masked token', 'Testing catalog enrichment', 'Mock provider ready'],
  AcoustID: ['Checking identifier settings', 'Fingerprint test skipped in Studio mock'],
  Deezer: ['Checking fallback settings', 'Mock fallback provider ready'],
  iTunes: ['Checking storefront settings', 'Mock storefront ready'],
  'Last.fm': ['Checking tag source', 'Mock tags available'],
  LRCLIB: ['Checking lyrics source', 'Mock lyrics provider ready'],
  Genius: ['Checking advanced lyrics settings', 'Mock provider ready'],
  Musixmatch: ['Checking translation settings', 'Mock provider ready'],
  AudD: ['Checking audio recognition settings', 'Mock provider ready'],
}

export function ForgeSettingsSheet({
  onClose,
  onSave,
  showToast,
  showConfirm,
  mockState,
  onSetMockScenario,
}: {
  onClose: () => void
  onSave: () => void
  showToast: (message: string, tone?: 'success' | 'info' | 'warning') => void
  showConfirm: (opts: {
    title: string
    description: string
    confirmLabel: string
    onConfirm: () => void
    tone?: 'amber' | 'danger'
  }) => void
  mockState: ForgeMockState
  onSetMockScenario: (scenario: ForgeMockScenario) => void
}) {
  const [state, setState] = useState<ForgeSettingsState>({ ...defaultForgeSettingsState })
  const [activeCategory, setActiveCategory] = useState<SettingsCategory | null>(null)
  const [providerDetail, setProviderDetail] = useState<ForgeProviderConfig | null>(null)
  const [progressFlow, setProgressFlow] = useState<{
    title: string
    steps: string[]
    onComplete: () => void
  } | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [unsaved, setUnsaved] = useState(false)
  const [plannedSheetOpen, setPlannedSheetOpen] = useState<string | null>(null)
  const [updateCheckCount, setUpdateCheckCount] = useState(0)

  const updateSetting = useCallback((id: string, value: unknown) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, [id]: value },
    }))
    setUnsaved(true)
  }, [])

  const toggleProvider = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      providers: prev.providers.map((p) =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      ),
    }))
    setUnsaved(true)
  }, [])

  const updateRule = useCallback((id: string, patch: Partial<ForgeRewriteRule>) => {
    setState((prev) => ({
      ...prev,
      rewriteRules: prev.rewriteRules.map((r) =>
        r.id === id ? { ...r, ...patch } : r
      ),
    }))
    setUnsaved(true)
  }, [])

  const addRule = useCallback(() => {
    setState((prev) => ({
      ...prev,
      rewriteRules: [
        ...prev.rewriteRules,
        { id: `rr-${Date.now()}`, field: 'genre', from: '', to: '' },
      ],
    }))
    setUnsaved(true)
  }, [])

  const deleteRule = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      rewriteRules: prev.rewriteRules.filter((r) => r.id !== id),
    }))
    setUnsaved(true)
  }, [])

  const handleSave = useCallback(() => {
    if (!unsaved) {
      showToast('No settings changes to save', 'info')
      return
    }
    setProgressFlow({
      title: 'Saving settings',
      steps: ['Preparing settings', 'Applying mock preferences'],
      onComplete: () => {
        setProgressFlow(null)
        setUnsaved(false)
        onSave()
      },
    })
  }, [unsaved, onSave, showToast])

  const handleReset = useCallback(() => {
    setShowResetConfirm(false)
    setProgressFlow({
      title: 'Resetting settings',
      steps: ['Preparing reset', 'Restoring defaults'],
      onComplete: () => {
        setProgressFlow(null)
        setState({ ...defaultForgeSettingsState })
        setUnsaved(false)
        showToast('Settings reset to defaults', 'info')
      },
    })
  }, [showToast])

  const handleClose = useCallback(() => {
    if (unsaved || mockState.settingsState === 'unsavedChanges') {
      showConfirm({
        title: 'Unsaved changes',
        description: 'You have unsaved settings. Discard changes?',
        confirmLabel: 'Discard',
        onConfirm: onClose,
        tone: 'amber',
      })
    } else {
      onClose()
    }
  }, [mockState.settingsState, unsaved, onClose, showConfirm])

  const handleTestProvider = useCallback((providerName: string) => {
    const steps = providerTestSteps[providerName] || ['Preparing mock request', 'Simulating provider response']
    setProgressFlow({
      title: `Testing ${providerName}`,
      steps,
      onComplete: () => {
        setProgressFlow(null)
        showToast(`${providerName} mock test completed`, 'success')
      },
    })
  }, [showToast])

  const handleCheckUpdate = useCallback(() => {
    setUpdateCheckCount((c) => c + 1)
    setState((prev) => ({ ...prev, updateStatus: 'checking' }))
    setProgressFlow({
      title: 'Checking for updates',
      steps: ['Checking update channel', 'Comparing versions', 'Verifying mock package'],
      onComplete: () => {
        setProgressFlow(null)
        const count = updateCheckCount + 1
        if (state.updateChannel === 'stable') {
          setState((prev) => ({
            ...prev,
            updateStatus: 'up_to_date',
            lastCheckedUpdate: 'Today',
          }))
          showToast('Forge is up to date', 'success')
        } else if (state.updateChannel === 'nightly') {
          if (count % 3 === 0) {
            setState((prev) => ({
              ...prev,
              updateStatus: 'available',
              availableVersion: '0.1.1',
              lastCheckedUpdate: 'Today',
              updateReleaseNotes: [
                'Metadata provider improvements',
                'Review settings',
                'Bug fixes',
              ],
            }))
            showToast('Update available in mock preview', 'info')
          } else if (count % 3 === 1) {
            setState((prev) => ({
              ...prev,
              updateStatus: 'up_to_date',
              lastCheckedUpdate: 'Today',
            }))
            showToast('Forge is up to date', 'success')
          } else {
            setState((prev) => ({
              ...prev,
              updateStatus: 'failed',
              lastCheckedUpdate: 'Today',
            }))
            showToast('Update check failed in mock preview', 'warning')
          }
        } else {
          setState((prev) => ({
            ...prev,
            updateStatus: 'available',
            availableVersion: '0.1.1',
            lastCheckedUpdate: 'Today',
            updateReleaseNotes: [
              'Metadata provider improvements',
              'Review settings',
              'Bug fixes',
            ],
          }))
          showToast('Update available in mock preview', 'info')
        }
      },
    })
  }, [state.updateChannel, updateCheckCount, showToast])

  const handleDownloadUpdate = useCallback(() => {
    setState((prev) => ({ ...prev, updateStatus: 'downloading' }))
    setProgressFlow({
      title: 'Downloading update',
      steps: ['Preparing update', 'Downloading mock package', 'Verifying mock package'],
      onComplete: () => {
        setProgressFlow(null)
        setState((prev) => ({ ...prev, updateStatus: 'ready' }))
        showToast('Update ready in mock preview', 'success')
      },
    })
  }, [showToast])

  const handleInstallUpdate = useCallback(() => {
    setProgressFlow({
      title: 'Installing update',
      steps: ['Preparing install', 'Applying mock update'],
      onComplete: () => {
        setProgressFlow(null)
        setState((prev) => ({
          ...prev,
          updateStatus: 'idle',
          availableVersion: null,
          updateReleaseNotes: [],
        }))
        showToast('Update installed in mock preview. Restart to apply.', 'success')
      },
    })
  }, [showToast])

  const updateCredential = useCallback((key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      credentials: { ...prev.credentials, [key]: value },
    }))
    setUnsaved(true)
  }, [])

  const resetCredentials = useCallback(() => {
    setState((prev) => ({
      ...prev,
      credentials: { ...defaultForgeSettingsState.credentials },
    }))
    setUnsaved(true)
    showToast('Credentials reset to defaults', 'info')
  }, [showToast])

  const saveCredentials = useCallback(() => {
    if (!unsaved) {
      showToast('No credential changes to save', 'info')
      return
    }
    setProgressFlow({
      title: 'Saving credentials',
      steps: ['Preparing credential update', 'Applying mock preferences'],
      onComplete: () => {
        setProgressFlow(null)
        setUnsaved(false)
        showToast('Credentials saved in mock preview', 'success')
      },
    })
  }, [unsaved, showToast])

  const categoriesWithSettings = useMemo(() => {
    const map: Record<string, typeof forgeSettingsCatalog> = {}
    forgeSettingsCatalog.forEach((s) => {
      if (!map[s.category]) map[s.category] = []
      map[s.category].push(s)
    })
    return map
  }, [])

  const effectiveState = useMemo<ForgeSettingsState>(() => {
    if (mockState.settingsState === 'missingCredentials') {
      return {
        ...state,
        credentials: { ...state.credentials, lastfm_api_key: '', discogs_token: '', acoustid_api_key: '' },
      }
    }
    if (mockState.settingsState === 'providerDisabled') {
      return {
        ...state,
        providers: state.providers.map((p) =>
          p.id === 'discogs' || p.id === 'lastfm' ? { ...p, enabled: false } : p,
        ),
      }
    }
    if (mockState.settingsState === 'updateAvailable') {
      return {
        ...state,
        updateStatus: 'available',
        availableVersion: '0.1.1',
        lastCheckedUpdate: 'Today',
        updateReleaseNotes: ['Metadata provider improvements', 'Review settings', 'Bug fixes'],
      }
    }
    if (mockState.settingsState === 'updateFailed') {
      return { ...state, updateStatus: 'failed', lastCheckedUpdate: 'Today' }
    }
    return state
  }, [mockState.settingsState, state])

  const effectiveUnsaved = unsaved || mockState.settingsState === 'unsavedChanges'

  if (progressFlow) {
    return (
      <ForgeProgressSheet
        flow={{
          title: progressFlow.title,
          steps: progressFlow.steps,
          completeMessage: 'Completed',
          onComplete: progressFlow.onComplete,
        }}
        onClose={() => setProgressFlow(null)}
      />
    )
  }

  if (plannedSheetOpen) {
    return (
      <ForgeBottomSheet
        onClose={() => setPlannedSheetOpen(null)}
        subtitle="This control will be configured in the next Forge block."
        title="Planned for Enrich Mode"
      >
        <div className="space-y-4">
          <p className="text-xs leading-5 text-orange-100/60">
            {plannedSheetOpen}
          </p>
          <button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:bg-[#efad6c]"
            onClick={() => setPlannedSheetOpen(null)}
            type="button"
          >
            Got it
          </button>
        </div>
      </ForgeBottomSheet>
    )
  }

  if (providerDetail) {
    return (
      <ForgeBottomSheet
        onClose={() => setProviderDetail(null)}
        subtitle={`${providerDetail.role} · ${providerDetail.enabled ? 'Enabled' : 'Disabled'}`}
        title={providerDetail.name}
      >
        <div className="space-y-4">
          <p className="text-xs leading-5 text-orange-100/60">
            {providerDetail.description}
          </p>
          <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
            <div className="mb-2 text-xs font-semibold text-white">Fields</div>
            <div className="flex flex-wrap gap-1.5">
              {providerDetail.fields.map((f) => (
                <span
                  className="rounded-md bg-white/[0.06] px-2 py-1 text-[11px] text-slate-200/80"
                  key={f}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
          {providerDetail.hasCredential && (
            <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
              <div className="mb-2 text-xs font-semibold text-white">Credential</div>
              <div className="text-xs text-orange-100/60">
                {providerDetail.credentialLabel}
                {providerDetail.credentialEnv ? (
                  <span className="ml-1 text-[10px] text-orange-100/40">
                    ({providerDetail.credentialEnv})
                  </span>
                ) : null}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {providerDetail.actions.map((action) => (
              <button
                className="flex h-10 w-full items-center justify-between rounded-xl bg-white/[0.04] px-3 text-left text-xs font-medium text-slate-200 transition hover:bg-white/[0.07]"
                key={action}
                onClick={() => {
                  if (action.includes('Test')) {
                    handleTestProvider(providerDetail.name)
                  } else {
                    showToast(`${action} opened in mock preview`, 'info')
                  }
                }}
                type="button"
              >
                {action}
                <ChevronRight className="text-orange-100/40" size={14} />
              </button>
            ))}
          </div>
        </div>
      </ForgeBottomSheet>
    )
  }

  if (activeCategory) {
    return (
      <ForgeBottomSheet
        onClose={() => {
          if (unsaved || mockState.settingsState === 'unsavedChanges') {
            showConfirm({
              title: 'Unsaved changes',
              description: 'You have unsaved settings. Discard changes?',
              confirmLabel: 'Discard',
              onConfirm: () => setActiveCategory(null),
              tone: 'amber',
            })
          } else {
            setActiveCategory(null)
          }
        }}
        subtitle={activeCategory === 'API Keys' ? 'Manage mock credentials for metadata providers.' : 'Tap a setting to change its value.'}
        title={activeCategory}
      >
        <div className="space-y-4 pb-2">
          {mockState.settingsState === 'missingCredentials' && (
            <ForgeStateNotice
              message="Some providers need API credentials before they can be tested."
              title="Credentials missing"
              variant="warning"
            />
          )}
          {mockState.settingsState === 'invalidCredential' && (
            <ForgeStateNotice
              message="One or more credentials failed local validation in this mock preview."
              title="Invalid credential"
              variant="error"
            />
          )}
          {mockState.settingsState === 'providerUnavailable' && (
            <ForgeStateNotice
              message="Provider test returned a mock failure. No network request was sent."
              title="Provider unavailable"
              variant="warning"
            />
          )}
          {mockState.settingsState === 'unsavedChanges' && (
            <ForgeStateNotice
              message="You have unsaved changes in this mock preview. Save or discard before leaving."
              title="Unsaved changes"
              variant="info"
            />
          )}
          {activeCategory === 'Metadata Providers' && (
            <MetadataProvidersPanel
              providers={effectiveState.providers}
              credentials={effectiveState.credentials}
              onToggle={toggleProvider}
              onOpenDetail={setProviderDetail}
              onTest={handleTestProvider}
            />
          )}
          {activeCategory === 'API Keys' && (
            <ApiKeysPanel
              providers={effectiveState.providers}
              credentials={effectiveState.credentials}
              onChange={updateCredential}
              onTest={handleTestProvider}
              onReset={resetCredentials}
              onSave={saveCredentials}
            />
          )}
          {activeCategory === 'Tags & Metadata' && (
            <TagsMetadataPanel
              settings={effectiveState.settings}
              rewriteRules={effectiveState.rewriteRules}
              onChange={updateSetting}
              onUpdateRule={updateRule}
              onAddRule={addRule}
              onDeleteRule={deleteRule}
            />
          )}
          {activeCategory === 'Artwork' && (
            <GenericSettingsPanel
              category="Artwork"
              settings={effectiveState.settings}
              onChange={updateSetting}
            />
          )}
          {activeCategory === 'Lyrics' && (
            <GenericSettingsPanel
              category="Lyrics"
              settings={effectiveState.settings}
              onChange={updateSetting}
            />
          )}
          {activeCategory === 'Audio' && (
            <GenericSettingsPanel
              category="Audio"
              settings={effectiveState.settings}
              onChange={updateSetting}
            />
          )}
          {activeCategory === 'Safety & Review' && (
            <SafetyReviewPanel
              settings={effectiveState.settings}
              onChange={updateSetting}
            />
          )}
          {activeCategory === 'App Updates' && (
            <AppUpdatesPanel
              state={effectiveState}
              onChange={(patch) => setState((prev) => ({ ...prev, ...patch }))}
              onCheck={handleCheckUpdate}
              onDownload={handleDownloadUpdate}
              onInstall={handleInstallUpdate}
            />
          )}
          {activeCategory === 'Advanced' && (
            <AdvancedPanel
              activeScenario={mockState.scenario}
              settings={effectiveState.settings}
              onChange={updateSetting}
              onPlanned={(label) => setPlannedSheetOpen(label)}
              onSetMockScenario={onSetMockScenario}
            />
          )}
          <button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-slate-300 transition hover:bg-white/[0.06]"
            onClick={() => {
              if (unsaved || mockState.settingsState === 'unsavedChanges') {
                showConfirm({
                  title: 'Unsaved changes',
                  description: 'You have unsaved settings. Discard changes?',
                  confirmLabel: 'Discard',
                  onConfirm: () => setActiveCategory(null),
                  tone: 'amber',
                })
              } else {
                setActiveCategory(null)
              }
            }}
            type="button"
          >
            <ArrowLeft size={14} />
            Back to categories
          </button>
          <div className="flex gap-2 pt-1">
            <button
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]"
              onClick={handleSave}
              type="button"
            >
              <Save size={15} />
              Save settings
            </button>
            <button
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
              onClick={() =>
                showConfirm({
                  title: 'Reset settings?',
                  description: 'This will restore all settings to their default values.',
                  confirmLabel: 'Reset',
                  onConfirm: () => setShowResetConfirm(true),
                  tone: 'danger',
                })
              }
              type="button"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
          {effectiveUnsaved && (
            <p className="text-center text-[11px] text-orange-100/50">
              You have unsaved changes.
            </p>
          )}
        </div>
      </ForgeBottomSheet>
    )
  }

  return (
    <>
      <ForgeBottomSheet
        onClose={handleClose}
        subtitle="Metadata, providers, review behavior, and app updates."
        title="Forge Settings"
      >
        <div className="space-y-3 pb-2">
          {categoryOrder.map((cat) => {
            const count = categoriesWithSettings[cat]?.length ?? 0
            return (
              <button
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5 text-left transition hover:bg-white/[0.055]"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-orange-300">{categoryIcons[cat]}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{cat}</div>
                    <div className="text-[11px] text-orange-100/50">
                      {cat === 'Metadata Providers'
                        ? `${effectiveState.providers.filter((p) => p.enabled).length} active`
                        : cat === 'API Keys'
                          ? `${Object.values(effectiveState.credentials).filter((v) => (v as string)?.length > 0).length} set`
                          : cat === 'App Updates'
                            ? effectiveState.lastCheckedUpdate
                              ? `Last checked: ${effectiveState.lastCheckedUpdate}`
                              : 'Never checked'
                            : `${count} option${count !== 1 ? 's' : ''}`}
                    </div>
                  </div>
                </div>
                <ChevronRight className="shrink-0 text-orange-100/40" size={16} />
              </button>
            )
          })}

          <div className="flex gap-2 pt-1">
            <button
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]"
              onClick={handleSave}
              type="button"
            >
              <Save size={15} />
              Save settings
            </button>
            <button
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
              onClick={() =>
                showConfirm({
                  title: 'Reset settings?',
                  description: 'This will restore all settings to their default values.',
                  confirmLabel: 'Reset',
                  onConfirm: () => setShowResetConfirm(true),
                  tone: 'danger',
                })
              }
              type="button"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>

          {effectiveUnsaved && (
            <p className="text-center text-[11px] text-orange-100/50">
              You have unsaved changes.
            </p>
          )}
        </div>
      </ForgeBottomSheet>

      {showResetConfirm && (
        <ForgeConfirmDialog
          confirmLabel="Reset"
          description="All settings will be restored to defaults."
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={handleReset}
          tone="danger"
          title="Reset settings?"
        />
      )}
    </>
  )
}

function MetadataProvidersPanel({
  providers,
  credentials,
  onToggle,
  onOpenDetail,
  onTest,
}: {
  providers: ForgeProviderConfig[]
  credentials: Record<string, string>
  onToggle: (id: string) => void
  onOpenDetail: (p: ForgeProviderConfig) => void
  onTest: (name: string) => void
}) {
  return (
    <div className="space-y-3">
      {providers.map((provider) => {
        const credSet = provider.credentialKey && (credentials[provider.credentialKey] as string)?.length > 0
        return (
          <div
            className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5"
            key={provider.id}
          >
            <div className="mb-2.5 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-white">{provider.name}</div>
                  {provider.hasCredential && (
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${credSet ? 'bg-emerald-400' : 'bg-orange-100/30'}`}
                      title={credSet ? 'Credential set' : 'Credential empty'}
                    />
                  )}
                </div>
                <div className="text-[11px] text-orange-100/50">{provider.role}</div>
              </div>
              <button
                aria-pressed={provider.enabled}
                className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${
                  provider.enabled ? 'bg-[#e7a35f]' : 'bg-white/14'
                }`}
                onClick={() => onToggle(provider.id)}
                type="button"
              >
                <span
                  className={`h-4 w-4 rounded-full bg-[#071014] transition ${
                    provider.enabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="mb-2.5 flex flex-wrap gap-1">
              {provider.fields.slice(0, 4).map((f) => (
                <span
                  className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-slate-200/70"
                  key={f}
                >
                  {f}
                </span>
              ))}
              {provider.fields.length > 4 && (
                <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-slate-200/50">
                  +{provider.fields.length - 4}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                className="flex h-8 flex-1 items-center justify-center rounded-lg bg-white/[0.05] text-[11px] font-medium text-slate-300 transition hover:bg-white/[0.08]"
                onClick={() => onOpenDetail(provider)}
                type="button"
              >
                Configure
              </button>
              <button
                className="flex h-8 flex-1 items-center justify-center rounded-lg bg-white/[0.05] text-[11px] font-medium text-slate-300 transition hover:bg-white/[0.08]"
                onClick={() => onTest(provider.name)}
                type="button"
              >
                Test mock
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ApiKeysPanel({
  providers,
  credentials,
  onChange,
  onTest,
  onReset,
  onSave,
}: {
  providers: ForgeProviderConfig[]
  credentials: Record<string, string>
  onChange: (key: string, value: string) => void
  onTest: (name: string) => void
  onReset: () => void
  onSave: () => void
}) {
  const credProviders = providers.filter((p) => p.hasCredential && p.credentialKey)

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <KeyRound className="text-orange-300" size={16} />
            Provider credentials
          </div>
          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] text-slate-200/70">
            Mock-only
          </span>
        </div>
        <p className="mb-3 text-[11px] leading-4 text-orange-100/50">
          Credentials are stored in local preview state only. No real secrets are persisted.
        </p>
        <div className="space-y-2">
          {credProviders.map((provider) => (
            <div
              className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-2.5 py-2"
              key={provider.id}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-slate-200/90">{provider.credentialLabel}</div>
                {provider.credentialEnv && (
                  <div className="text-[10px] text-orange-100/40">{provider.credentialEnv}</div>
                )}
              </div>
              <CredentialInput
                value={credentials[provider.credentialKey!] as string}
                onChange={(val) => onChange(provider.credentialKey!, val)}
                onTest={() => onTest(provider.name)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:bg-[#efad6c]"
          onClick={onSave}
          type="button"
        >
          <Save size={14} />
          Save credentials
        </button>
        <button
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
          onClick={onReset}
          type="button"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>
    </div>
  )
}

function CredentialInput({
  value,
  onChange,
  onTest,
}: {
  value: string
  onChange: (val: string) => void
  onTest: () => void
}) {
  const [visible, setVisible] = useState(false)
  const hasValue = (value as string)?.length > 0

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5">
      <input
        className="h-7 min-w-0 flex-1 rounded-md bg-white/[0.06] px-2 text-[11px] text-slate-200 outline-none placeholder:text-slate-500"
        placeholder="••••••••"
        type={visible ? 'text' : 'password'}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-white/[0.06] hover:text-slate-200"
        onClick={() => setVisible((v) => !v)}
        type="button"
      >
        {visible ? <EyeOff size={13} /> : <Eye size={13} />}
      </button>
      {hasValue && (
        <button
          className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-white/[0.06] hover:text-red-300"
          onClick={() => onChange('')}
          type="button"
        >
          <X size={13} />
        </button>
      )}
      <button
        className="flex h-7 shrink-0 items-center rounded-md bg-white/[0.05] px-2 text-[10px] font-medium text-slate-300 transition hover:bg-white/[0.08]"
        onClick={onTest}
        type="button"
      >
        Test
      </button>
    </div>
  )
}

function TagsMetadataPanel({
  settings,
  rewriteRules,
  onChange,
  onUpdateRule,
  onAddRule,
  onDeleteRule,
}: {
  settings: Record<string, unknown>
  rewriteRules: ForgeRewriteRule[]
  onChange: (id: string, value: unknown) => void
  onUpdateRule: (id: string, patch: Partial<ForgeRewriteRule>) => void
  onAddRule: () => void
  onDeleteRule: (id: string) => void
}) {
  const ids = forgeSettingsCatalog
    .filter((s) => s.category === 'Tags & Metadata')
    .map((s) => s.id)

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-white">
          <SlidersHorizontal className="text-orange-300" size={16} />
          Metadata behavior
        </div>
        <div className="space-y-1">
          {ids.map((id) => (
            <SettingRow key={id} settingId={id} value={settings[id]} onChange={onChange} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="text-orange-300" size={16} />
            Rewrite rules
          </div>
          <button
            className="flex h-7 items-center gap-1 rounded-lg bg-[#e7a35f]/15 px-2 text-[11px] font-medium text-orange-300 transition hover:bg-[#e7a35f]/25"
            onClick={onAddRule}
            type="button"
          >
            Add rule
          </button>
        </div>
        <div className="space-y-2">
          {rewriteRules.map((rule) => (
            <div
              className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-2.5 py-2"
              key={rule.id}
            >
              <select
                className="h-7 rounded-md bg-white/[0.06] px-1.5 text-[11px] text-slate-200 outline-none"
                value={rule.field}
                onChange={(e) =>
                  onUpdateRule(rule.id, { field: e.target.value as ForgeRewriteRule['field'] })
                }
              >
                <option value="genre">Genre</option>
                <option value="style">Style</option>
                <option value="label">Label</option>
                <option value="artist">Artist</option>
                <option value="albumartist">Album Artist</option>
              </select>
              <input
                className="h-7 min-w-0 flex-1 rounded-md bg-white/[0.06] px-2 text-[11px] text-slate-200 outline-none placeholder:text-slate-500"
                placeholder="From"
                value={rule.from}
                onChange={(e) => onUpdateRule(rule.id, { from: e.target.value })}
              />
              <span className="text-[11px] text-orange-100/40">→</span>
              <input
                className="h-7 min-w-0 flex-1 rounded-md bg-white/[0.06] px-2 text-[11px] text-slate-200 outline-none placeholder:text-slate-500"
                placeholder="To"
                value={rule.to}
                onChange={(e) => onUpdateRule(rule.id, { to: e.target.value })}
              />
              <button
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-white/[0.06] hover:text-red-300"
                onClick={() => onDeleteRule(rule.id)}
                type="button"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          {rewriteRules.length === 0 && (
            <p className="py-2 text-center text-[11px] text-orange-100/40">
              No rewrite rules. Add one above.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function SafetyReviewPanel({
  settings,
  onChange,
}: {
  settings: Record<string, unknown>
  onChange: (id: string, value: unknown) => void
}) {
  const ids = forgeSettingsCatalog
    .filter((s) => s.category === 'Safety & Review')
    .map((s) => s.id)

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-white">
          <ShieldCheck className="text-orange-300" size={16} />
          Safety
        </div>
        <div className="space-y-1">
          {ids.map((id) => (
            <SettingRow key={id} settingId={id} value={settings[id]} onChange={onChange} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AppUpdatesPanel({
  state,
  onChange,
  onCheck,
  onDownload,
  onInstall,
}: {
  state: ForgeSettingsState
  onChange: (patch: Partial<ForgeSettingsState>) => void
  onCheck: () => void
  onDownload: () => void
  onInstall: () => void
}) {
  const [notesExpanded, setNotesExpanded] = useState(true)

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Settings2 className="text-orange-300" size={16} />
          Current version
        </div>
        <div className="space-y-1.5 text-xs text-orange-100/70">
          <div className="flex justify-between">
            <span>App</span>
            <span className="text-slate-200">Forge Studio Preview</span>
          </div>
          <div className="flex justify-between">
            <span>Version</span>
            <span className="text-slate-200">0.1.0</span>
          </div>
          <div className="flex justify-between">
            <span>Core compatibility</span>
            <span className="text-slate-200">Forge Core 0.1.0</span>
          </div>
          <div className="flex justify-between">
            <span>Last checked</span>
            <span className="text-slate-200">
              {state.lastCheckedUpdate ?? 'Never'}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-3 text-sm font-semibold text-white">Update channel</div>
        <div className="flex gap-2">
          {(['stable', 'beta', 'nightly'] as const).map((ch) => (
            <button
              className={`flex h-8 flex-1 items-center justify-center rounded-lg text-[11px] font-medium transition ${
                state.updateChannel === ch
                  ? 'bg-[#e7a35f] text-[#211508]'
                  : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.08]'
              }`}
              key={ch}
              onClick={() => onChange({ updateChannel: ch })}
              type="button"
            >
              {ch.charAt(0).toUpperCase() + ch.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {state.updateStatus === 'available' && state.availableVersion && (
        <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
          <div className="mb-2 text-sm font-semibold text-white">
            Update available
          </div>
          <div className="mb-2 text-xs text-orange-100/70">
            New version: <span className="text-slate-200">{state.availableVersion}</span>
          </div>
          <button
            className="mb-2 flex w-full items-center justify-between text-xs text-orange-100/60"
            onClick={() => setNotesExpanded((v) => !v)}
            type="button"
          >
            <span>Release notes</span>
            <ChevronDown
              className={`shrink-0 text-orange-100/40 transition ${notesExpanded ? 'rotate-180' : ''}`}
              size={14}
            />
          </button>
          {notesExpanded && (
            <div className="mb-3 space-y-1">
              {state.updateReleaseNotes.map((note, i) => (
                <div className="flex items-start gap-2 text-xs text-orange-100/60" key={i}>
                  <Check className="mt-0.5 shrink-0 text-emerald-400/70" size={12} />
                  {note}
                </div>
              ))}
            </div>
          )}
          <button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:bg-[#efad6c]"
            onClick={onDownload}
            type="button"
          >
            <Download size={15} />
            Download update
          </button>
        </div>
      )}

      {state.updateStatus === 'failed' && (
        <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
          <div className="mb-2 text-sm font-semibold text-red-300">
            Update check failed
          </div>
          <p className="mb-3 text-xs text-orange-100/60">
            Mock failure state. No network error occurred.
          </p>
          <button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
            onClick={onCheck}
            type="button"
          >
            <RotateCcw size={15} />
            Retry check
          </button>
        </div>
      )}

      {state.updateStatus === 'ready' && (
        <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
          <div className="mb-2 text-sm font-semibold text-emerald-300">
            Update ready
          </div>
          <p className="mb-3 text-xs text-orange-100/60">
            Studio preview only. No update was downloaded or installed.
          </p>
          <button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:bg-[#efad6c]"
            onClick={onInstall}
            type="button"
          >
            <RotateCcw size={15} />
            Restart app
          </button>
        </div>
      )}

      {state.updateStatus !== 'downloading' && state.updateStatus !== 'checking' && (
        <button
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
          onClick={onCheck}
          type="button"
        >
          <Clock size={15} />
          Check for updates
        </button>
      )}
    </div>
  )
}

function AdvancedPanel({
  settings,
  onChange,
  onPlanned,
  activeScenario,
  onSetMockScenario,
}: {
  settings: Record<string, unknown>
  onChange: (id: string, value: unknown) => void
  onPlanned: (label: string) => void
  activeScenario: string
  onSetMockScenario: (scenario: ForgeMockScenario) => void
}) {
  const items = forgeSettingsCatalog.filter((s) => s.category === 'Advanced')
  const enrichIds = items.filter((s) => s.id.startsWith('advanced.enrich_')).map((s) => s.id)
  const otherIds = items.filter((s) => !s.id.startsWith('advanced.enrich_')).map((s) => s.id)

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-white">
          <Wrench className="text-orange-300" size={16} />
          Advanced
        </div>
        <div className="space-y-1">
          {otherIds.map((id) => (
            <SettingRow key={id} settingId={id} value={settings[id]} onChange={onChange} />
          ))}
        </div>
      </div>

      <ForgeMockStatePanel activeScenario={activeScenario as ForgeMockScenario} onChange={onSetMockScenario} />

      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-white">
          <Sparkles className="text-orange-300" size={16} />
          Enrich presets
        </div>
        <p className="mb-2 text-[11px] text-orange-100/50">
          Planned for the next Forge block. Controls are disabled in preview.
        </p>
        <div className="space-y-1">
          {enrichIds.map((id) => (
            <DeferredSettingRow
              key={id}
              settingId={id}
              value={settings[id]}
              onClick={() => onPlanned(forgeSettingsCatalog.find((s) => s.id === id)?.appLabel || id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function DeferredSettingRow({
  settingId,
  value,
  onClick,
}: {
  settingId: string
  value: unknown
  onClick: () => void
}) {
  const def = forgeSettingsCatalog.find((s) => s.id === settingId)
  if (!def) return null
  const enabled = Boolean(value ?? def.defaultValue)

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 opacity-50">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-200/60">{def.appLabel}</span>
          <span className="rounded bg-orange-300/10 px-1.5 py-0.5 text-[9px] font-semibold text-orange-300/80">
            Planned
          </span>
        </div>
        {def.notes && (
          <div className="mt-0.5 text-[10px] text-orange-100/30">{def.notes}</div>
        )}
      </div>
      <button
        aria-pressed={enabled}
        className="flex h-5 w-9 shrink-0 items-center rounded-full bg-white/14 p-0.5 cursor-not-allowed"
        onClick={onClick}
        type="button"
      >
        <span
          className={`h-4 w-4 rounded-full bg-[#071014] transition ${
            enabled ? 'translate-x-4 opacity-40' : 'translate-x-0 opacity-40'
          }`}
        />
      </button>
    </div>
  )
}

function GenericSettingsPanel({
  category,
  settings,
  onChange,
}: {
  category: string
  settings: Record<string, unknown>
  onChange: (id: string, value: unknown) => void
}) {
  const items = forgeSettingsCatalog.filter((s) => s.category === category)
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
        <div className="space-y-1">
          {items.map((s) => (
            <SettingRow key={s.id} settingId={s.id} value={settings[s.id]} onChange={onChange} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingRow({
  settingId,
  value,
  onChange,
}: {
  settingId: string
  value: unknown
  onChange: (id: string, value: unknown) => void
}) {
  const def = forgeSettingsCatalog.find((s) => s.id === settingId)
  if (!def) return null

  const currentValue = value ?? def.defaultValue

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 transition hover:bg-white/[0.03]">
      <div className="min-w-0">
        <div className="text-xs text-slate-200/88">{def.appLabel}</div>
        {def.notes && (
          <div className="mt-0.5 text-[10px] text-orange-100/40">{def.notes}</div>
        )}
      </div>
      <Control def={def} value={currentValue} onChange={(v) => onChange(def.id, v)} />
    </div>
  )
}

function Control({
  def,
  value,
  onChange,
}: {
  def: (typeof forgeSettingsCatalog)[number]
  value: unknown
  onChange: (v: unknown) => void
}) {
  const [visible, setVisible] = useState(false)

  if (def.type === 'boolean') {
    const enabled = Boolean(value)
    return (
      <button
        aria-pressed={enabled}
        className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${
          enabled ? 'bg-[#e7a35f]' : 'bg-white/14'
        }`}
        onClick={() => onChange(!enabled)}
        type="button"
      >
        <span
          className={`h-4 w-4 rounded-full bg-[#071014] transition ${
            enabled ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    )
  }

  if (def.type === 'select' && def.options) {
    return (
      <select
        className="h-7 rounded-md bg-white/[0.06] px-2 text-[11px] text-slate-200 outline-none"
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
      >
        {def.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }

  if (def.type === 'number') {
    return (
      <input
        className="h-7 w-20 rounded-md bg-white/[0.06] px-2 text-right text-[11px] text-slate-200 outline-none"
        type="number"
        value={Number(value)}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    )
  }

  if (def.type === 'text' || def.type === 'secret') {
    const isSecret = def.type === 'secret'
    return (
      <div className="flex items-center gap-1.5">
        <input
          className="h-7 min-w-0 flex-1 rounded-md bg-white/[0.06] px-2 text-[11px] text-slate-200 outline-none"
          type={isSecret && !visible ? 'password' : 'text'}
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
        />
        {isSecret && (
          <>
            <button
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-white/[0.06] hover:text-slate-200"
              onClick={() => setVisible((v) => !v)}
              type="button"
            >
              {visible ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
            {String(value ?? '').length > 0 && (
              <button
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-white/[0.06] hover:text-red-300"
                onClick={() => onChange('')}
                type="button"
              >
                <X size={13} />
              </button>
            )}
          </>
        )}
      </div>
    )
  }

  return null
}
