import { useState } from 'react'
import type { AnchorSetupDraft, AnchorSetupStep } from '../../anchorSetupState'
import { anchorSetupLibraryOptions } from '../../anchorSetupState'
import { AnchorSetupLibrary } from './AnchorSetupLibrary'
import { AnchorSetupNavidrome } from './AnchorSetupNavidrome'
import { AnchorSetupPermissions } from './AnchorSetupPermissions'
import { AnchorSetupProgress } from './AnchorSetupProgress'
import { AnchorSetupReview } from './AnchorSetupReview'
import { AnchorSetupServer } from './AnchorSetupServer'
import { AnchorSetupWelcome } from './AnchorSetupWelcome'

export function AnchorSetupFlow({
  draft,
  onChangeDraft,
  onComplete,
  onOpenNavidromeSettings,
}: {
  draft: AnchorSetupDraft
  onChangeDraft: (draft: AnchorSetupDraft) => void
  onComplete: () => void
  onOpenNavidromeSettings?: () => void
}) {
  const goTo = (step: AnchorSetupStep) => {
    onChangeDraft({ ...draft, step })
  }

  const stepOrder: AnchorSetupStep[] = ['welcome', 'permissions', 'library', 'server', 'navidrome', 'review']
  const currentIndex = stepOrder.indexOf(draft.step)
  const goBack = () => {
    if (currentIndex > 0) goTo(stepOrder[currentIndex - 1])
  }

  const [availabilityStatus, setAvailabilityStatus] = useState<'idle' | 'checking' | 'available' | 'warning'>('idle')
  const dryRunPassed = true

  const handleAcknowledge = (id: string) => {
    onChangeDraft({
      ...draft,
      permissions: draft.permissions.map((p) => (p.id === id ? { ...p, acknowledged: !p.acknowledged } : p)),
    })
  }

  const handleSelectLibrary = (path: string) => {
    onChangeDraft({
      ...draft,
      libraryPath: path,
      navidromeDraft: {
        ...draft.navidromeDraft,
        MusicFolder: path,
      },
    })
  }

  const handleSelectServerType = (type: 'navidrome' | 'jellyfin' | 'emby') => {
    onChangeDraft({ ...draft, serverType: type })
  }

  const handleCheckAvailability = () => {
    setAvailabilityStatus('checking')
    setTimeout(() => {
      setAvailabilityStatus('available')
    }, 800)
  }

  const handleNavidromeChange = (key: string, value: string | number | boolean) => {
    onChangeDraft({
      ...draft,
      navidromeDraft: { ...draft.navidromeDraft, [key]: value },
    })
  }

  const handlePreviewToml = () => {
    // TOML preview is computed in the review component from the draft
  }

  const tomlPreview = `[server]
MusicFolder = "${draft.navidromeDraft.MusicFolder}"
DataFolder = "${draft.navidromeDraft.DataFolder}"
Port = ${draft.navidromeDraft.Port}
LogLevel = "${draft.navidromeDraft.LogLevel}"

[scanner]
Schedule = "${draft.navidromeDraft.ScannerSchedule}"

[features]
EnableDownloads = ${draft.navidromeDraft.EnableDownloads}
EnableSharing = ${draft.navidromeDraft.EnableSharing}
EnableLogRedacting = ${draft.navidromeDraft.EnableLogRedacting}`

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden">
      {draft.step !== 'welcome' && draft.step !== 'complete' ? <AnchorSetupProgress step={draft.step} /> : null}
      <div className="anchor-scrollbar-soft min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
        {draft.step === 'welcome' ? (
          <AnchorSetupWelcome
            onPreviewConfigured={onComplete}
            onStartSetup={() => goTo('permissions')}
          />
        ) : draft.step === 'permissions' ? (
          <AnchorSetupPermissions
            onAcknowledge={handleAcknowledge}
            onBack={goBack}
            onContinue={() => goTo('library')}
            permissions={draft.permissions}
          />
        ) : draft.step === 'library' ? (
          <AnchorSetupLibrary
            onBack={goBack}
            onContinue={() => goTo('server')}
            onSelect={handleSelectLibrary}
            options={anchorSetupLibraryOptions}
            selectedPath={draft.libraryPath}
          />
        ) : draft.step === 'server' ? (
          <AnchorSetupServer
            availabilityStatus={availabilityStatus}
            onBack={goBack}
            onCheckAvailability={handleCheckAvailability}
            onContinue={() => goTo('navidrome')}
            onSelectType={handleSelectServerType}
            serverAddress={draft.serverAddress}
            serverDataFolder={draft.serverDataFolder}
            serverPort={draft.serverPort}
            serverType={draft.serverType}
          />
        ) : draft.step === 'navidrome' ? (
          <AnchorSetupNavidrome
            draft={draft.navidromeDraft}
            onBack={goBack}
            onChange={handleNavidromeChange}
            onContinue={() => goTo('review')}
            onOpenAdvanced={() => {
              onOpenNavidromeSettings?.()
            }}
          />
        ) : draft.step === 'review' ? (
          <AnchorSetupReview
            dryRunPassed={dryRunPassed}
            libraryPath={draft.libraryPath}
            onBack={goBack}
            onFinish={() => {
              onComplete()
            }}
            onPreviewToml={handlePreviewToml}
            permissionsAcknowledged={draft.permissions.filter((p) => p.required).every((p) => p.acknowledged)}
            scannerSchedule={draft.navidromeDraft.ScannerSchedule}
            serverAddress={draft.serverAddress}
            serverPort={draft.serverPort}
            serverType={draft.serverType === 'navidrome' ? 'Navidrome' : draft.serverType}
            tomlPreview={tomlPreview}
          />
        ) : null}
      </div>
    </div>
  )
}
