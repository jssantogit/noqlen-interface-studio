import { useState, type ReactNode } from 'react'
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Database,
  HardDrive,
  Headphones,
  Info,
  Library as LibraryIcon,
  ListFilter,
  Music2,
  Palette,
  PlayCircle,
  RadioTower,
  Shield,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  UserCog,
  Volume2,
  Wifi,
  Wrench,
} from 'lucide-react'
import { AriaBottomSheet } from './AriaBottomSheet'

type ActiveSource = {
  type: 'local' | 'server'
  name: string
  status: string
  detail: string
}

type SettingsPage =
  | 'root'
  | 'interface'
  | 'sources'
  | 'library'
  | 'playback'
  | 'audioQuality'
  | 'streamingNetwork'
  | 'offlineStorage'
  | 'profilesBackup'
  | 'androidExternal'
  | 'advanced'
  | 'about'

type SegmentOption<T extends string> = {
  label: string
  value: T
}

type CategoryWeight = 'primary' | 'secondary' | 'system'

const pageTitles: Record<SettingsPage, string> = {
  root: 'Aria Settings',
  interface: 'Interface',
  sources: 'Sources & Providers',
  library: 'Library',
  playback: 'Playback',
  audioQuality: 'Audio Output & Quality',
  streamingNetwork: 'Streaming & Network',
  offlineStorage: 'Offline, Cache & Storage',
  profilesBackup: 'Profiles & Backup',
  androidExternal: 'Android & External Control',
  advanced: 'Advanced',
  about: 'About',
}

export function AriaSettingsSheet({
  activeSource,
  onClose,
  onOpenSource,
  onShowToast,
}: {
  activeSource: ActiveSource
  onClose: () => void
  onOpenSource: () => void
  onShowToast: (message: string) => void
}) {
  const [settingsPage, setSettingsPage] = useState<SettingsPage>('root')

  const [showSourceBadges, setShowSourceBadges] = useState(true)
  const [preferLosslessLabels, setPreferLosslessLabels] = useState(true)
  const [gapless, setGapless] = useState(false)
  const [loudnessNormalization, setLoudnessNormalization] = useState(false)
  const [crossfade, setCrossfade] = useState<'off' | 'short' | 'long'>('off')
  const [compactLists, setCompactLists] = useState(false)
  const [visualOnlyMode, setVisualOnlyMode] = useState(true)
  const [artworkEmphasis, setArtworkEmphasis] = useState<'balanced' | 'large' | 'minimal'>('balanced')

  const [showTechnicalLabels, setShowTechnicalLabels] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [showProviderReadiness, setShowProviderReadiness] = useState(true)
  const [showSourceCapabilities, setShowSourceCapabilities] = useState(true)
  const [showFolders, setShowFolders] = useState(true)
  const [showCompilations, setShowCompilations] = useState(true)
  const [hideEmptyCategories, setHideEmptyCategories] = useState(true)
  const [defaultSort, setDefaultSort] = useState<'recent' | 'title' | 'artist'>('recent')
  const [searchScope, setSearchScope] = useState<'library' | 'local' | 'metadata'>('library')
  const [defaultRepeat, setDefaultRepeat] = useState<'off' | 'one' | 'all'>('off')
  const [defaultShuffle, setDefaultShuffle] = useState<'off' | 'songs'>('off')
  const [resumePlayback, setResumePlayback] = useState(true)
  const [seekStep, setSeekStep] = useState<'10s' | '15s' | '30s'>('15s')
  const [queueBehavior, setQueueBehavior] = useState<'append' | 'playNext'>('append')
  const [unavailableMediaHandling, setUnavailableMediaHandling] = useState<'ask' | 'skip' | 'stop'>('ask')
  const [replayGainMode, setReplayGainMode] = useState<'off' | 'track' | 'album'>('off')
  const [preferBitPerfect, setPreferBitPerfect] = useState(false)
  const [preferUsbDac, setPreferUsbDac] = useState(false)
  const [preferExclusiveOutput, setPreferExclusiveOutput] = useState(false)
  const [sampleRateHandling, setSampleRateHandling] = useState<'native' | 'fixed' | 'auto'>('native')
  const [bitDepthHandling, setBitDepthHandling] = useState<'native' | 'fixed' | 'auto'>('native')
  const [fadeBehavior, setFadeBehavior] = useState<'off' | 'short' | 'smooth'>('off')
  const [formatPreference, setFormatPreference] = useState<'original' | 'lossless' | 'compatible'>('original')
  const [streamQuality, setStreamQuality] = useState<'auto' | 'high' | 'original'>('auto')
  const [bitrateLimit, setBitrateLimit] = useState<'none' | '320' | '256'>('none')
  const [qualityFallback, setQualityFallback] = useState<'auto' | 'ask' | 'strict'>('auto')
  const [dataSaver, setDataSaver] = useState(false)
  const [meteredNetworkBehavior, setMeteredNetworkBehavior] = useState<'ask' | 'limit' | 'allow'>('ask')
  const [transcodingPreference, setTranscodingPreference] = useState<'auto' | 'avoid' | 'always'>('auto')
  const [offlineQuality, setOfflineQuality] = useState<'original' | 'high' | 'balanced'>('high')
  const [cachePolicy, setCachePolicy] = useState<'manual' | 'balanced' | 'aggressive'>('balanced')
  const [preferOfflineMedia, setPreferOfflineMedia] = useState(true)
  const [requireCleanupConfirmation, setRequireCleanupConfirmation] = useState(true)
  const [storageBudget, setStorageBudget] = useState<'small' | 'medium' | 'large'>('medium')
  const [activeProfile, setActiveProfile] = useState<'default' | 'listening' | 'minimal'>('default')
  const [preferenceScope, setPreferenceScope] = useState<'global' | 'profile'>('global')
  const [backupScope, setBackupScope] = useState<'preferences' | 'visual' | 'all'>('preferences')
  const [restoreConflictBehavior, setRestoreConflictBehavior] = useState<'ask' | 'keepCurrent' | 'useBackup'>('ask')
  const [backupSafetyConfirmation, setBackupSafetyConfirmation] = useState(true)
  const [androidAutoVisibility, setAndroidAutoVisibility] = useState(false)
  const [mediaSessionControls, setMediaSessionControls] = useState(false)
  const [notificationControls, setNotificationControls] = useState(false)
  const [lockScreenControls, setLockScreenControls] = useState(false)
  const [headsetControls, setHeadsetControls] = useState(false)
  const [foregroundServiceBehavior, setForegroundServiceBehavior] = useState<'planned' | 'disabled'>('planned')
  const [strictMockMode, setStrictMockMode] = useState(true)
  const [mockFlowVisibility, setMockFlowVisibility] = useState(true)
  const [providerBoundaryWarnings, setProviderBoundaryWarnings] = useState(true)
  const [showCoreDiagnostics, setShowCoreDiagnostics] = useState(false)
  const [snapshotRedaction, setSnapshotRedaction] = useState<'safe' | 'minimal' | 'full'>('safe')
  const [automationSafety, setAutomationSafety] = useState<'strict' | 'balanced'>('strict')

  const toggleSetting = (label: string, checked: boolean, setChecked: (checked: boolean) => void) => {
    const next = !checked
    setChecked(next)
    onShowToast(`${label}: ${next ? 'On' : 'Off'} (mock)`)
  }

  const setSegment = <T extends string>(label: string, value: T, setValue: (value: T) => void) => {
    setValue(value)
    onShowToast(`${label}: ${formatValue(value)} (mock)`)
  }

  const pageContent = settingsPage === 'root' ? (
    <SettingsHub activeSource={activeSource} onOpenPage={setSettingsPage} />
  ) : (
    <div className="space-y-4">
      <SettingsPageHeader page={settingsPage} subtitle={getPageSubtitle(settingsPage)} onBack={() => setSettingsPage('root')} />

      {settingsPage === 'interface' ? (
        <>
          <SettingsGroup icon={<Palette size={14} />} title="Display">
            <ToggleSetting checked={compactLists} label="Compact lists" onToggle={() => toggleSetting('Compact lists', compactLists, setCompactLists)} />
            <SegmentedSetting label="Artwork emphasis" onChange={(value) => setSegment('Artwork emphasis', value, setArtworkEmphasis)} options={[{ label: 'Balanced', value: 'balanced' }, { label: 'Large', value: 'large' }, { label: 'Minimal', value: 'minimal' }]} value={artworkEmphasis} />
            <ToggleSetting checked={showTechnicalLabels} label="Show technical labels" onToggle={() => toggleSetting('Show technical labels', showTechnicalLabels, setShowTechnicalLabels)} />
          </SettingsGroup>
          <SettingsGroup icon={<Sparkles size={14} />} title="Simulator">
            <ToggleSetting checked={visualOnlyMode} label="Visual-only mode" onToggle={() => toggleSetting('Visual-only mode', visualOnlyMode, setVisualOnlyMode)} />
            <ToggleSetting checked={reduceMotion} label="Reduce motion" onToggle={() => toggleSetting('Reduce motion', reduceMotion, setReduceMotion)} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'sources' ? (
        <>
          <SourceStatusCard activeSource={activeSource} onOpenSource={onOpenSource} />
          <SettingsGroup icon={<HardDrive size={14} />} title="Visibility">
            <ToggleSetting checked={showSourceBadges} label="Show source badges" onToggle={() => toggleSetting('Show source badges', showSourceBadges, setShowSourceBadges)} />
            <ToggleSetting checked={showProviderReadiness} label="Show provider readiness" onToggle={() => toggleSetting('Show provider readiness', showProviderReadiness, setShowProviderReadiness)} />
            <ToggleSetting checked={showSourceCapabilities} label="Show source capabilities" onToggle={() => toggleSetting('Show source capabilities', showSourceCapabilities, setShowSourceCapabilities)} />
          </SettingsGroup>
          <NoticeCard title="Provider boundary" items={['Provider integration is mock-only.', 'No real login, auth, network discovery or provider mutation.']} />
        </>
      ) : null}

      {settingsPage === 'library' ? (
        <>
          <SettingsGroup icon={<LibraryIcon size={14} />} title="Display">
            <ToggleSetting checked={preferLosslessLabels} label="Prefer lossless labels" onToggle={() => toggleSetting('Prefer lossless labels', preferLosslessLabels, setPreferLosslessLabels)} />
            <ToggleSetting checked={showFolders} label="Show folders" onToggle={() => toggleSetting('Show folders', showFolders, setShowFolders)} />
            <ToggleSetting checked={showCompilations} label="Show compilations" onToggle={() => toggleSetting('Show compilations', showCompilations, setShowCompilations)} />
            <ToggleSetting checked={hideEmptyCategories} label="Hide empty categories" onToggle={() => toggleSetting('Hide empty categories', hideEmptyCategories, setHideEmptyCategories)} />
          </SettingsGroup>
          <SettingsGroup icon={<ListFilter size={14} />} title="Browsing">
            <SegmentedSetting label="Default sort" onChange={(value) => setSegment('Default sort', value, setDefaultSort)} options={[{ label: 'Recent', value: 'recent' }, { label: 'Title', value: 'title' }, { label: 'Artist', value: 'artist' }]} value={defaultSort} />
            <SegmentedSetting label="Search scope" onChange={(value) => setSegment('Search scope', value, setSearchScope)} options={[{ label: 'Library', value: 'library' }, { label: 'Local', value: 'local' }, { label: 'Metadata', value: 'metadata' }]} value={searchScope} />
          </SettingsGroup>
          <NoticeCard title="Library decisions" items={['Recently Added is tracks-only.', 'Favorites is a Library feature, not a setting.']} />
        </>
      ) : null}

      {settingsPage === 'playback' ? (
        <>
          <SettingsGroup icon={<PlayCircle size={14} />} title="Behavior">
            <ToggleSetting checked={resumePlayback} label="Resume playback" onToggle={() => toggleSetting('Resume playback', resumePlayback, setResumePlayback)} />
            <SegmentedSetting label="Default repeat" onChange={(value) => setSegment('Default repeat', value, setDefaultRepeat)} options={[{ label: 'Off', value: 'off' }, { label: 'One', value: 'one' }, { label: 'All', value: 'all' }]} value={defaultRepeat} />
            <SegmentedSetting label="Default shuffle" onChange={(value) => setSegment('Default shuffle', value, setDefaultShuffle)} options={[{ label: 'Off', value: 'off' }, { label: 'Songs', value: 'songs' }]} value={defaultShuffle} />
          </SettingsGroup>
          <SettingsGroup icon={<ListFilter size={14} />} title="Queue">
            <SegmentedSetting label="Queue behavior" onChange={(value) => setSegment('Queue behavior', value, setQueueBehavior)} options={[{ label: 'Append', value: 'append' }, { label: 'Play Next', value: 'playNext' }]} value={queueBehavior} />
            <SegmentedSetting label="Seek step" onChange={(value) => setSegment('Seek step', value, setSeekStep)} options={[{ label: '10s', value: '10s' }, { label: '15s', value: '15s' }, { label: '30s', value: '30s' }]} value={seekStep} />
            <SegmentedSetting label="Unavailable media" onChange={(value) => setSegment('Unavailable media', value, setUnavailableMediaHandling)} options={[{ label: 'Ask', value: 'ask' }, { label: 'Skip', value: 'skip' }, { label: 'Stop', value: 'stop' }]} value={unavailableMediaHandling} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'audioQuality' ? (
        <>
          <SettingsGroup icon={<Volume2 size={14} />} title="Playback quality">
            <ToggleSetting checked={gapless} label="Gapless playback" onToggle={() => toggleSetting('Gapless playback', gapless, setGapless)} />
            <ToggleSetting checked={loudnessNormalization} label="Loudness normalization" onToggle={() => toggleSetting('Loudness normalization', loudnessNormalization, setLoudnessNormalization)} />
            <SegmentedSetting label="ReplayGain mode" onChange={(value) => setSegment('ReplayGain mode', value, setReplayGainMode)} options={[{ label: 'Off', value: 'off' }, { label: 'Track', value: 'track' }, { label: 'Album', value: 'album' }]} value={replayGainMode} />
            <SegmentedSetting label="Crossfade" onChange={(value) => setSegment('Crossfade', value, setCrossfade)} options={[{ label: 'Off', value: 'off' }, { label: 'Short', value: 'short' }, { label: 'Long', value: 'long' }]} value={crossfade} />
            <SegmentedSetting label="Fade behavior" onChange={(value) => setSegment('Fade behavior', value, setFadeBehavior)} options={[{ label: 'Off', value: 'off' }, { label: 'Short', value: 'short' }, { label: 'Smooth', value: 'smooth' }]} value={fadeBehavior} />
          </SettingsGroup>
          <SettingsGroup icon={<Headphones size={14} />} title="Output preference">
            <ToggleSetting checked={preferBitPerfect} label="Prefer bit-perfect" onToggle={() => toggleSetting('Prefer bit-perfect', preferBitPerfect, setPreferBitPerfect)} />
            <ToggleSetting checked={preferUsbDac} label="Prefer USB DAC when available" onToggle={() => toggleSetting('Prefer USB DAC when available', preferUsbDac, setPreferUsbDac)} />
            <ToggleSetting checked={preferExclusiveOutput} label="Prefer exclusive output" onToggle={() => toggleSetting('Prefer exclusive output', preferExclusiveOutput, setPreferExclusiveOutput)} />
          </SettingsGroup>
          <SettingsGroup icon={<SlidersHorizontal size={14} />} title="Format">
            <SegmentedSetting label="Sample-rate handling" onChange={(value) => setSegment('Sample-rate handling', value, setSampleRateHandling)} options={[{ label: 'Native', value: 'native' }, { label: 'Fixed', value: 'fixed' }, { label: 'Auto', value: 'auto' }]} value={sampleRateHandling} />
            <SegmentedSetting label="Bit-depth handling" onChange={(value) => setSegment('Bit-depth handling', value, setBitDepthHandling)} options={[{ label: 'Native', value: 'native' }, { label: 'Fixed', value: 'fixed' }, { label: 'Auto', value: 'auto' }]} value={bitDepthHandling} />
            <SegmentedSetting label="Format preference" onChange={(value) => setSegment('Format preference', value, setFormatPreference)} options={[{ label: 'Original', value: 'original' }, { label: 'Lossless', value: 'lossless' }, { label: 'Compatible', value: 'compatible' }]} value={formatPreference} />
          </SettingsGroup>
          <NoticeCard title="Desired policies" items={['These are desired/mock policies.', 'No real audio engine or output control is connected.']} />
        </>
      ) : null}

      {settingsPage === 'streamingNetwork' ? (
        <>
          <SettingsGroup icon={<Wifi size={14} />} title="Quality">
            <SegmentedSetting label="Stream quality" onChange={(value) => setSegment('Stream quality', value, setStreamQuality)} options={[{ label: 'Auto', value: 'auto' }, { label: 'High', value: 'high' }, { label: 'Original', value: 'original' }]} value={streamQuality} />
            <SegmentedSetting label="Bitrate limit" onChange={(value) => setSegment('Bitrate limit', value, setBitrateLimit)} options={[{ label: 'None', value: 'none' }, { label: '320', value: '320' }, { label: '256', value: '256' }]} value={bitrateLimit} />
            <SegmentedSetting label="Quality fallback" onChange={(value) => setSegment('Quality fallback', value, setQualityFallback)} options={[{ label: 'Auto', value: 'auto' }, { label: 'Ask', value: 'ask' }, { label: 'Strict', value: 'strict' }]} value={qualityFallback} />
            <SegmentedSetting label="Offline quality" onChange={(value) => setSegment('Offline quality', value, setOfflineQuality)} options={[{ label: 'Original', value: 'original' }, { label: 'High', value: 'high' }, { label: 'Balanced', value: 'balanced' }]} value={offlineQuality} />
          </SettingsGroup>
          <SettingsGroup icon={<SlidersHorizontal size={14} />} title="Network">
            <ToggleSetting checked={dataSaver} label="Data saver" onToggle={() => toggleSetting('Data saver', dataSaver, setDataSaver)} />
            <SegmentedSetting label="Metered network" onChange={(value) => setSegment('Metered network', value, setMeteredNetworkBehavior)} options={[{ label: 'Ask', value: 'ask' }, { label: 'Limit', value: 'limit' }, { label: 'Allow', value: 'allow' }]} value={meteredNetworkBehavior} />
            <SegmentedSetting label="Transcoding" onChange={(value) => setSegment('Transcoding', value, setTranscodingPreference)} options={[{ label: 'Auto', value: 'auto' }, { label: 'Avoid', value: 'avoid' }, { label: 'Always', value: 'always' }]} value={transcodingPreference} />
          </SettingsGroup>
          <NoticeCard title="Network boundary" items={['Streaming is not real in the current interface.', 'Network policy is mock-only.']} />
        </>
      ) : null}

      {settingsPage === 'offlineStorage' ? (
        <>
          <SettingsGroup icon={<Archive size={14} />} title="Offline">
            <ToggleSetting checked={preferOfflineMedia} label="Prefer offline media" onToggle={() => toggleSetting('Prefer offline media', preferOfflineMedia, setPreferOfflineMedia)} />
            <SegmentedSetting label="Cache policy" onChange={(value) => setSegment('Cache policy', value, setCachePolicy)} options={[{ label: 'Manual', value: 'manual' }, { label: 'Balanced', value: 'balanced' }, { label: 'Aggressive', value: 'aggressive' }]} value={cachePolicy} />
          </SettingsGroup>
          <SettingsGroup icon={<Database size={14} />} title="Storage">
            <SegmentedSetting label="Storage budget" onChange={(value) => setSegment('Storage budget', value, setStorageBudget)} options={[{ label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }]} value={storageBudget} />
            <ToggleSetting checked={requireCleanupConfirmation} label="Require cleanup confirmation" onToggle={() => toggleSetting('Require cleanup confirmation', requireCleanupConfirmation, setRequireCleanupConfirmation)} />
          </SettingsGroup>
          <NoticeCard title="Storage boundary" items={['No real download, delete or filesystem access.', 'No storage path is exposed.']} />
        </>
      ) : null}

      {settingsPage === 'profilesBackup' ? (
        <>
          <SettingsGroup icon={<UserCog size={14} />} title="Profiles">
            <SegmentedSetting label="Active profile" onChange={(value) => setSegment('Active profile', value, setActiveProfile)} options={[{ label: 'Default', value: 'default' }, { label: 'Listening', value: 'listening' }, { label: 'Minimal', value: 'minimal' }]} value={activeProfile} />
            <SegmentedSetting label="Preference scope" onChange={(value) => setSegment('Preference scope', value, setPreferenceScope)} options={[{ label: 'Global', value: 'global' }, { label: 'Profile', value: 'profile' }]} value={preferenceScope} />
          </SettingsGroup>
          <SettingsGroup icon={<Shield size={14} />} title="Backup">
            <SegmentedSetting label="Backup scope" onChange={(value) => setSegment('Backup scope', value, setBackupScope)} options={[{ label: 'Preferences', value: 'preferences' }, { label: 'Visual', value: 'visual' }, { label: 'All', value: 'all' }]} value={backupScope} />
            <SegmentedSetting label="Restore conflicts" onChange={(value) => setSegment('Restore conflicts', value, setRestoreConflictBehavior)} options={[{ label: 'Ask', value: 'ask' }, { label: 'Keep Current', value: 'keepCurrent' }, { label: 'Use Backup', value: 'useBackup' }]} value={restoreConflictBehavior} />
            <ToggleSetting checked={backupSafetyConfirmation} label="Backup safety confirmation" onToggle={() => toggleSetting('Backup safety confirmation', backupSafetyConfirmation, setBackupSafetyConfirmation)} />
          </SettingsGroup>
          <NoticeCard title="Backup boundary" items={['No real filesystem backup or restore.', 'No destructive operation.']} />
        </>
      ) : null}

      {settingsPage === 'androidExternal' ? (
        <>
          <NoticeCard title="Planned boundary" items={['Planned/mock-only.', 'No Android SDK integration or real media controls.']} muted />
          <SettingsGroup icon={<Smartphone size={14} />} title="External control" muted>
            <ToggleSetting checked={androidAutoVisibility} label="Android Auto visibility" onToggle={() => toggleSetting('Android Auto visibility', androidAutoVisibility, setAndroidAutoVisibility)} />
            <ToggleSetting checked={mediaSessionControls} label="MediaSession controls" onToggle={() => toggleSetting('MediaSession controls', mediaSessionControls, setMediaSessionControls)} />
            <ToggleSetting checked={notificationControls} label="Notification controls" onToggle={() => toggleSetting('Notification controls', notificationControls, setNotificationControls)} />
            <ToggleSetting checked={lockScreenControls} label="Lock-screen controls" onToggle={() => toggleSetting('Lock-screen controls', lockScreenControls, setLockScreenControls)} />
            <ToggleSetting checked={headsetControls} label="Headset/Bluetooth controls" onToggle={() => toggleSetting('Headset/Bluetooth controls', headsetControls, setHeadsetControls)} />
          </SettingsGroup>
          <SettingsGroup icon={<RadioTower size={14} />} title="Service" muted>
            <SegmentedSetting label="Foreground service" onChange={(value) => setSegment('Foreground service', value, setForegroundServiceBehavior)} options={[{ label: 'Planned', value: 'planned' }, { label: 'Disabled', value: 'disabled' }]} value={foregroundServiceBehavior} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'advanced' ? (
        <>
          <SettingsGroup icon={<Wrench size={14} />} title="Lab">
            <ToggleSetting checked={strictMockMode} label="Strict mock mode" onToggle={() => toggleSetting('Strict mock mode', strictMockMode, setStrictMockMode)} />
            <ToggleSetting checked={mockFlowVisibility} label="Mock flow visibility" onToggle={() => toggleSetting('Mock flow visibility', mockFlowVisibility, setMockFlowVisibility)} />
            <ToggleSetting checked={providerBoundaryWarnings} label="Provider boundary warnings" onToggle={() => toggleSetting('Provider boundary warnings', providerBoundaryWarnings, setProviderBoundaryWarnings)} />
            <ToggleSetting checked={showCoreDiagnostics} label="Show core diagnostics" onToggle={() => toggleSetting('Show core diagnostics', showCoreDiagnostics, setShowCoreDiagnostics)} />
          </SettingsGroup>
          <SettingsGroup icon={<Shield size={14} />} title="Safety">
            <SegmentedSetting label="Snapshot redaction" onChange={(value) => setSegment('Snapshot redaction', value, setSnapshotRedaction)} options={[{ label: 'Safe', value: 'safe' }, { label: 'Minimal', value: 'minimal' }, { label: 'Full', value: 'full' }]} value={snapshotRedaction} />
            <SegmentedSetting label="Automation safety" onChange={(value) => setSegment('Automation safety', value, setAutomationSafety)} options={[{ label: 'Strict', value: 'strict' }, { label: 'Balanced', value: 'balanced' }]} value={automationSafety} />
          </SettingsGroup>
          <NoticeCard title="Diagnostics boundary" items={['Do not show raw debug dumps.', 'Diagnostics are visual-only.']} />
        </>
      ) : null}

      {settingsPage === 'about' ? <AboutPage /> : null}
    </div>
  )

  return (
    <AriaBottomSheet onClose={onClose} subtitle={settingsPage === 'root' ? 'Core-mapped visual player preferences' : getPageSubtitle(settingsPage)} title={pageTitles[settingsPage]}>
      {pageContent}
    </AriaBottomSheet>
  )
}

function SettingsHub({ activeSource, onOpenPage }: { activeSource: ActiveSource; onOpenPage: (page: SettingsPage) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[21px] font-semibold tracking-[-0.03em] text-[#fff3e4]">Aria Settings</h2>
        <p className="mt-1 text-[12px] leading-5 text-[#b9b1a7]">Core-mapped visual player preferences</p>
      </div>
      <StatusStrip activeSource={activeSource} />
      <SettingsGroup title="Primary" compact>
        <SettingsCategoryCard icon={<Palette size={17} />} page="interface" status="Visual" subtitle="Display, artwork and simulator behavior." title="Interface" weight="primary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<HardDrive size={17} />} page="sources" status="Local" subtitle="Active source and provider readiness." title="Sources & Providers" weight="primary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<Music2 size={17} />} page="library" status="Tracks" subtitle="Browsing, labels and library display rules." title="Library" weight="primary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<PlayCircle size={17} />} page="playback" status="Mock" subtitle="Default playback and queue policies." title="Playback" weight="primary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<Headphones size={17} />} page="audioQuality" status="Desired" subtitle="Output and quality preference policies." title="Audio Output & Quality" weight="primary" onOpenPage={onOpenPage} />
      </SettingsGroup>
      <SettingsGroup title="Secondary" compact muted>
        <SettingsCategoryCard icon={<Wifi size={17} />} page="streamingNetwork" status="Planned" subtitle="Quality, network and transcoding policy." title="Streaming & Network" weight="secondary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<Archive size={17} />} page="offlineStorage" status="Policy" subtitle="Offline and cache policy previews." title="Offline, Cache & Storage" weight="secondary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<UserCog size={17} />} page="profilesBackup" status="Local" subtitle="Profiles, preference scope and backup policy." title="Profiles & Backup" weight="secondary" onOpenPage={onOpenPage} />
      </SettingsGroup>
      <SettingsGroup title="System / Lab" compact muted>
        <SettingsCategoryCard icon={<Smartphone size={17} />} page="androidExternal" status="Planned" subtitle="Android shell and external control boundaries." title="Android & External Control" weight="system" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<Wrench size={17} />} page="advanced" status="Lab" subtitle="Diagnostics and mock safety controls." title="Advanced" weight="system" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<Info size={17} />} page="about" status="Info" subtitle="Aria Core and interface status." title="About" weight="system" onOpenPage={onOpenPage} />
      </SettingsGroup>
    </div>
  )
}

function SettingsCategoryCard({ icon, page, status, subtitle, title, weight, onOpenPage }: { icon: ReactNode; page: SettingsPage; status: string; subtitle: string; title: string; weight: CategoryWeight; onOpenPage: (page: SettingsPage) => void }) {
  const cardClass = weight === 'primary'
    ? 'border-[#f0a13d]/18 bg-[linear-gradient(145deg,rgba(240,161,61,0.09),rgba(255,255,255,0.035))]'
    : weight === 'secondary'
      ? 'border-white/[0.075] bg-white/[0.03]'
      : 'border-white/[0.055] bg-white/[0.022] opacity-90'
  const badgeClass = weight === 'primary' ? 'bg-[#f0a13d]/14 text-[#f0a13d]' : 'bg-white/[0.055] text-[#cdbfb3]'
  const chipClass = weight === 'primary' ? 'border-[#f0a13d]/18 bg-[#f0a13d]/10 text-[#f8bd76]' : 'border-white/[0.07] bg-white/[0.04] text-[#b9b1a7]'

  return (
    <button aria-label={`Open ${title} settings`} className={`flex w-full items-center gap-3 rounded-[18px] border px-3 py-2.5 text-left transition hover:bg-white/[0.055] active:scale-[0.99] ${cardClass}`} onClick={() => onOpenPage(page)} type="button">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl ${badgeClass}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-tight text-[#fff3e4]">{title}</span>
        <span className="mt-0.5 block truncate text-[11px] leading-4 text-[#b9b1a7]">{subtitle}</span>
      </span>
      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${chipClass}`}>{status}</span>
      <ChevronRight className="shrink-0 text-[#9b8e82]" size={15} />
    </button>
  )
}

function SettingsGroup({ children, compact = false, icon, muted = false, title }: { children: ReactNode; compact?: boolean; icon?: ReactNode; muted?: boolean; title: string }) {
  return (
    <section>
      <div className={`flex items-center gap-2 px-1 ${muted ? 'text-[#a99d91]' : 'text-[#f0a13d]'}`}>
        {icon ? <span className={`grid h-6 w-6 place-items-center rounded-full ${muted ? 'bg-white/[0.045]' : 'bg-[#f0a13d]/12'}`}>{icon}</span> : null}
        <h3 className="text-[11px] font-bold uppercase tracking-[0.24em]">{title}</h3>
      </div>
      <div className={`${compact ? 'mt-2 space-y-2' : 'mt-2 space-y-2.5'} rounded-[22px] border ${muted ? 'border-white/[0.055] bg-white/[0.022]' : 'border-white/[0.075] bg-white/[0.03]'} p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`}>
        {children}
      </div>
    </section>
  )
}

function SettingsPageHeader({ onBack, page, subtitle }: { onBack: () => void; page: SettingsPage; subtitle: string }) {
  return (
    <div>
      <button className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-[12px] font-semibold text-[#d7cabe] transition hover:bg-white/[0.07]" onClick={onBack} type="button">
        <ChevronLeft size={15} /> Settings
      </button>
      <h2 className="mt-3 text-[21px] font-semibold tracking-[-0.03em] text-[#fff3e4]">{pageTitles[page]}</h2>
      <p className="mt-1 text-[12px] leading-5 text-[#b9b1a7]">{subtitle}</p>
    </div>
  )
}

function StatusStrip({ activeSource }: { activeSource: ActiveSource }) {
  return (
    <section className="rounded-[18px] border border-[#f0a13d]/14 bg-[linear-gradient(145deg,rgba(240,161,61,0.08),rgba(255,255,255,0.025))] p-3">
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-[#f0a13d]/12 px-2.5 py-1 text-[11px] font-semibold text-[#f8bd76]">Active source: {activeSource.name}</span>
        <span className="rounded-full bg-white/[0.055] px-2.5 py-1 text-[11px] font-semibold text-[#d7cabe]">Visual mock</span>
        <span className="rounded-full bg-white/[0.055] px-2.5 py-1 text-[11px] font-semibold text-[#d7cabe]">Local state</span>
      </div>
    </section>
  )
}

function SourceStatusCard({ activeSource, onOpenSource }: { activeSource: ActiveSource; onOpenSource: () => void }) {
  return (
    <section className="rounded-[22px] border border-[#f0a13d]/16 bg-[radial-gradient(circle_at_0%_0%,rgba(240,161,61,0.15),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f0a13d]/15 text-[#f0a13d]">
          <HardDrive size={21} strokeWidth={1.7} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0a13d]">Active Source</p>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.055] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#d7cabe]">{activeSource.type}</span>
          </div>
          <h3 className="mt-1 truncate text-[17px] font-semibold text-[#fff3e4]">{activeSource.name}</h3>
          <p className="mt-0.5 text-[11px] font-semibold text-[#65e985]">{activeSource.status}</p>
          <p className="mt-1 text-[12px] leading-5 text-[#b9b1a7]">{activeSource.detail}</p>
        </div>
      </div>
      <ActionButton icon={<SlidersHorizontal size={15} />} label="Manage Source" onClick={onOpenSource} />
    </section>
  )
}

function ToggleSetting({ checked, label, onToggle }: { checked: boolean; label: string; onToggle: () => void }) {
  return (
    <button aria-pressed={checked} className="flex w-full items-center gap-3 rounded-[18px] bg-white/[0.035] px-3 py-2.5 text-left transition hover:bg-white/[0.055]" onClick={onToggle} type="button">
      <span className="min-w-0 flex-1 text-[14px] font-semibold leading-tight text-[#fff3e4]">{label}</span>
      <span aria-hidden="true" className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition ${checked ? 'bg-[#f0a13d]' : 'bg-white/[0.12]'}`}>
        <span className={`h-5 w-5 rounded-full bg-[#0d1218] shadow transition ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </span>
    </button>
  )
}

function SegmentedSetting<T extends string>({ label, onChange, options, value }: { label: string; onChange: (value: T) => void; options: SegmentOption<T>[]; value: T }) {
  return (
    <div className="rounded-[18px] bg-white/[0.035] p-3">
      <p className="text-[14px] font-semibold leading-tight text-[#fff3e4]">{label}</p>
      <div className="mt-2 grid gap-1 rounded-full bg-black/20 p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option) => {
          const active = option.value === value
          return (
            <button className={`rounded-full px-2 py-1.5 text-[11px] font-bold transition ${active ? 'bg-[#f0a13d] text-[#1b1109]' : 'text-[#c9beb2] hover:bg-white/[0.07]'}`} key={option.value} onClick={() => onChange(option.value)} type="button">
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function InfoCard({ children }: { children: ReactNode }) {
  return <section className="rounded-[20px] border border-white/[0.075] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-3.5">{children}</section>
}

function ActionButton({ icon, label, onClick }: { icon?: ReactNode; label: string; onClick: () => void }) {
  return (
    <button className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[13px] font-bold text-[#1b1109] shadow-[0_10px_20px_rgba(240,161,61,0.18)] transition active:scale-[0.98]" onClick={onClick} type="button">
      {icon} {label}
    </button>
  )
}

function NoticeCard({ items, muted = false, title }: { items: string[]; muted?: boolean; title: string }) {
  return (
    <InfoCard>
      <div className={`flex items-center gap-2 ${muted ? 'text-[#b9b1a7]' : 'text-[#f0a13d]'}`}>
        <span className={`grid h-7 w-7 place-items-center rounded-full ${muted ? 'bg-white/[0.045]' : 'bg-[#f0a13d]/12'}`}>
          <Info size={15} />
        </span>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em]">{title}</h3>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span className="rounded-full border border-white/[0.075] bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#cfc3b8]" key={item}>{item}</span>
        ))}
      </div>
    </InfoCard>
  )
}

function AboutPage() {
  const facts = ['Aria Interface Studio visual mock', 'Aria Core mapped settings', 'No real playback', 'No real streaming', 'No real provider auth', 'No real filesystem/cache mutation', 'No Android shell implementation', 'No persistence']

  return (
    <InfoCard>
      <div className="flex items-center gap-2 text-[#f0a13d]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f0a13d]/12">
          <Info size={15} />
        </span>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em]">Aria Core Status</h3>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-1.5">
        {facts.map((fact) => (
          <span className="rounded-2xl border border-white/[0.075] bg-white/[0.04] px-3 py-2 text-[12px] font-semibold text-[#d7cabe]" key={fact}>{fact}</span>
        ))}
      </div>
    </InfoCard>
  )
}

function getPageSubtitle(page: SettingsPage) {
  const subtitles: Record<SettingsPage, string> = {
    root: 'Core-mapped visual player preferences',
    interface: 'Visual behavior and display preferences.',
    sources: 'Active source, source visibility and provider readiness.',
    library: 'Browsing and display rules for the music library.',
    playback: 'Default playback behavior and queue policies.',
    audioQuality: 'Desired audio behavior and output policies.',
    streamingNetwork: 'Quality, transcoding and network policy preferences.',
    offlineStorage: 'Offline and cache policy previews.',
    profilesBackup: 'Profiles, preference scope and safe backup policy.',
    androidExternal: 'Planned Android shell and external media control boundaries.',
    advanced: 'Lab diagnostics and mock safety controls.',
    about: 'Aria Core and interface status.',
  }

  return subtitles[page]
}

function formatValue(value: string) {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (letter) => letter.toUpperCase())
}
