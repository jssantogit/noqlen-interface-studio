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
  Shield,
  SlidersHorizontal,
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
  | 'library'
  | 'playback'
  | 'offlineCache'
  | 'mediaSources'
  | 'backupRestore'
  | 'backupCreate'
  | 'backupRestoreFlow'
  | 'advanced'
  | 'about'

type SegmentOption<T extends string> = {
  label: string
  value: T
}

type CategoryWeight = 'primary' | 'secondary' | 'system'
type AccentColor = 'amber' | 'blue' | 'red' | 'green' | 'pink'

const pageTitles: Record<SettingsPage, string> = {
  root: 'Settings',
  interface: 'Interface',
  library: 'Library',
  playback: 'Playback',
  offlineCache: 'Offline & Cache',
  mediaSources: 'Media Sources',
  backupRestore: 'Backup & Restore',
  backupCreate: 'Create Backup',
  backupRestoreFlow: 'Restore Backup',
  advanced: 'Advanced',
  about: 'About',
}

const backupOptions = [
  { label: 'Settings' },
  { label: 'Media sources' },
  { label: 'Playlists' },
  { label: 'Playback history' },
  { label: 'Offline rules' },
] as const

const accentColorOptions: { label: string; swatch: string; value: AccentColor }[] = [
  { label: 'Amber', swatch: '#f0a13d', value: 'amber' },
  { label: 'Blue', swatch: '#60a5fa', value: 'blue' },
  { label: 'Red', swatch: '#fb7185', value: 'red' },
  { label: 'Green', swatch: '#4ade80', value: 'green' },
  { label: 'Pink', swatch: '#f472b6', value: 'pink' },
]

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

  const [appearance, setAppearance] = useState<'system' | 'dark' | 'light'>('system')
  const [accentColor, setAccentColor] = useState<AccentColor>('amber')
  const [dynamicColor, setDynamicColor] = useState<'off' | 'artwork' | 'system'>('off')
  const [startScreen, setStartScreen] = useState<'listen' | 'library' | 'playlists' | 'explore'>('listen')
  const [compactLists, setCompactLists] = useState(false)
  const [showLibraryShortcuts, setShowLibraryShortcuts] = useState(true)
  const [albumArtSize, setAlbumArtSize] = useState<'compact' | 'balanced' | 'large'>('balanced')
  const [showAudioQuality, setShowAudioQuality] = useState(true)
  const [showMusicSource, setShowMusicSource] = useState(true)
  const [miniPlayerStyle, setMiniPlayerStyle] = useState<'compact' | 'expanded'>('compact')
  const [showExtraTrackInfo, setShowExtraTrackInfo] = useState(false)

  const [showFolders, setShowFolders] = useState(true)
  const [showCompilations, setShowCompilations] = useState(true)
  const [hideEmptySections, setHideEmptySections] = useState(true)
  const [defaultSort, setDefaultSort] = useState<'recent' | 'title' | 'artist'>('recent')
  const [searchScope, setSearchScope] = useState<'library' | 'localFiles' | 'metadata'>('library')
  const [showFormatLabels, setShowFormatLabels] = useState(true)
  const [showSourceLabels, setShowSourceLabels] = useState(true)

  const [outputDevice, setOutputDevice] = useState<'phone' | 'usbDac' | 'remote'>('phone')
  const [preferUsbDac, setPreferUsbDac] = useState(false)
  const [preferExclusiveOutput, setPreferExclusiveOutput] = useState(false)
  const [resumePlayback, setResumePlayback] = useState(true)
  const [gapless, setGapless] = useState(false)
  const [volumeNormalization, setVolumeNormalization] = useState(false)
  const [replayGainMode, setReplayGainMode] = useState<'off' | 'track' | 'album'>('off')
  const [fadeIn, setFadeIn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [crossfade, setCrossfade] = useState<'off' | 'short' | 'long'>('off')
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off')
  const [shuffleStyle, setShuffleStyle] = useState<'standard' | 'fresh' | 'deep'>('standard')
  const [saveQueue, setSaveQueue] = useState(true)

  const [offlineMode, setOfflineMode] = useState<'manual' | 'automatic'>('manual')
  const [storageLimit, setStorageLimit] = useState<'small' | 'medium' | 'large'>('medium')
  const [downloadOnlyWifi, setDownloadOnlyWifi] = useState(true)
  const [downloadQuality, setDownloadQuality] = useState<'original' | 'high' | 'balanced'>('high')
  const [simultaneousDownloads, setSimultaneousDownloads] = useState<'1' | '2' | '3'>('2')
  const [playbackCacheSize, setPlaybackCacheSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [preloadNextTracks, setPreloadNextTracks] = useState(true)
  const [imageCache, setImageCache] = useState(true)
  const [highQualityArtwork, setHighQualityArtwork] = useState(true)

  const [backupIncludeSettings, setBackupIncludeSettings] = useState(true)
  const [backupIncludeSources, setBackupIncludeSources] = useState(true)
  const [backupIncludePlaylists, setBackupIncludePlaylists] = useState(true)
  const [backupIncludeHistory, setBackupIncludeHistory] = useState(false)
  const [backupIncludeOfflineRules, setBackupIncludeOfflineRules] = useState(true)
  const [restoreSettings, setRestoreSettings] = useState(true)
  const [restoreSources, setRestoreSources] = useState(true)
  const [restorePlaylists, setRestorePlaylists] = useState(true)
  const [restoreHistory, setRestoreHistory] = useState(false)
  const [restoreOfflineRules, setRestoreOfflineRules] = useState(true)

  const [debugMode, setDebugMode] = useState(false)
  const [wifiMetered, setWifiMetered] = useState(false)
  const [vpnMetered, setVpnMetered] = useState(true)

  const toggleSetting = (label: string, checked: boolean, setChecked: (checked: boolean) => void) => {
    const next = !checked
    setChecked(next)
    onShowToast(`${label}: ${next ? 'On' : 'Off'}`)
  }

  const setSegment = <T extends string>(label: string, value: T, setValue: (value: T) => void) => {
    setValue(value)
    onShowToast(`${label}: ${formatValue(value)}`)
  }

  const handleBackupToggle = (label: string, checked: boolean, setChecked: (checked: boolean) => void) => {
    setChecked(!checked)
    onShowToast(`${label}: ${!checked ? 'On' : 'Off'}`)
  }

  const pageContent = settingsPage === 'root' ? (
    <SettingsHub onOpenPage={setSettingsPage} />
  ) : (
    <div className="space-y-4">
      <SettingsPageHeader onBack={() => setSettingsPage(getBackPage(settingsPage))} />

      {settingsPage === 'interface' ? (
        <>
          <SettingsGroup icon={<Palette size={14} />} title="Theme">
            <SegmentedSetting label="Appearance" onChange={(value) => setSegment('Appearance', value, setAppearance)} options={[{ label: 'System', value: 'system' }, { label: 'Dark', value: 'dark' }, { label: 'Light', value: 'light' }]} value={appearance} />
            <AccentColorSetting onChange={(value) => setSegment('Accent color', value, setAccentColor)} value={accentColor} />
            <SegmentedSetting label="Dynamic color" onChange={(value) => setSegment('Dynamic color', value, setDynamicColor)} options={[{ label: 'Off', value: 'off' }, { label: 'Album artwork', value: 'artwork' }, { label: 'System colors', value: 'system' }]} value={dynamicColor} />
          </SettingsGroup>
          <SettingsGroup icon={<ListFilter size={14} />} title="Layout">
            <SegmentedSetting label="Start screen" onChange={(value) => setSegment('Start screen', value, setStartScreen)} options={[{ label: 'Listen', value: 'listen' }, { label: 'Library', value: 'library' }, { label: 'Playlists', value: 'playlists' }, { label: 'Explore', value: 'explore' }]} value={startScreen} />
            <ToggleSetting checked={compactLists} label="Use compact lists" onToggle={() => toggleSetting('Use compact lists', compactLists, setCompactLists)} />
            <ToggleSetting checked={showLibraryShortcuts} label="Show library shortcuts" onToggle={() => toggleSetting('Show library shortcuts', showLibraryShortcuts, setShowLibraryShortcuts)} />
          </SettingsGroup>
          <SettingsGroup icon={<Music2 size={14} />} title="Music display">
            <SegmentedSetting label="Album art size" onChange={(value) => setSegment('Album art size', value, setAlbumArtSize)} options={[{ label: 'Compact', value: 'compact' }, { label: 'Balanced', value: 'balanced' }, { label: 'Large', value: 'large' }]} value={albumArtSize} />
            <ToggleSetting checked={showAudioQuality} label="Show audio quality" onToggle={() => toggleSetting('Show audio quality', showAudioQuality, setShowAudioQuality)} />
            <ToggleSetting checked={showMusicSource} label="Show music source" onToggle={() => toggleSetting('Show music source', showMusicSource, setShowMusicSource)} />
          </SettingsGroup>
          <SettingsGroup icon={<PlayCircle size={14} />} title="Player">
            <SegmentedSetting label="Mini player style" onChange={(value) => setSegment('Mini player style', value, setMiniPlayerStyle)} options={[{ label: 'Compact', value: 'compact' }, { label: 'Expanded', value: 'expanded' }]} value={miniPlayerStyle} />
            <ToggleSetting checked={showExtraTrackInfo} label="Show extra track info" onToggle={() => toggleSetting('Show extra track info', showExtraTrackInfo, setShowExtraTrackInfo)} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'library' ? (
        <>
          <SettingsGroup icon={<LibraryIcon size={14} />} title="Browsing">
            <SegmentedSetting label="Default sort" onChange={(value) => setSegment('Default sort', value, setDefaultSort)} options={[{ label: 'Recent', value: 'recent' }, { label: 'Title', value: 'title' }, { label: 'Artist', value: 'artist' }]} value={defaultSort} />
            <SegmentedSetting label="Search in" onChange={(value) => setSegment('Search in', value, setSearchScope)} options={[{ label: 'Library', value: 'library' }, { label: 'Local files', value: 'localFiles' }, { label: 'Metadata', value: 'metadata' }]} value={searchScope} />
            <ToggleSetting checked={showFolders} label="Show folders" onToggle={() => toggleSetting('Show folders', showFolders, setShowFolders)} />
            <ToggleSetting checked={showCompilations} label="Show compilations" onToggle={() => toggleSetting('Show compilations', showCompilations, setShowCompilations)} />
            <ToggleSetting checked={hideEmptySections} label="Hide empty sections" onToggle={() => toggleSetting('Hide empty sections', hideEmptySections, setHideEmptySections)} />
          </SettingsGroup>
          <SettingsGroup icon={<Info size={14} />} title="Metadata">
            <ToggleSetting checked={showFormatLabels} label="Show format labels" onToggle={() => toggleSetting('Show format labels', showFormatLabels, setShowFormatLabels)} />
            <ToggleSetting checked={showSourceLabels} label="Show source labels" onToggle={() => toggleSetting('Show source labels', showSourceLabels, setShowSourceLabels)} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'playback' ? (
        <>
          <SettingsGroup icon={<Headphones size={14} />} title="Output">
            <SegmentedSetting label="Output device" onChange={(value) => setSegment('Output device', value, setOutputDevice)} options={[{ label: 'Phone', value: 'phone' }, { label: 'USB DAC', value: 'usbDac' }, { label: 'Remote', value: 'remote' }]} value={outputDevice} />
            <ToggleSetting checked={preferUsbDac} label="Prefer USB DAC" onToggle={() => toggleSetting('Prefer USB DAC', preferUsbDac, setPreferUsbDac)} />
            <ToggleSetting checked={preferExclusiveOutput} label="Exclusive output" onToggle={() => toggleSetting('Exclusive output', preferExclusiveOutput, setPreferExclusiveOutput)} />
          </SettingsGroup>
          <SettingsGroup icon={<PlayCircle size={14} />} title="Playback">
            <ToggleSetting checked={resumePlayback} label="Resume playback" onToggle={() => toggleSetting('Resume playback', resumePlayback, setResumePlayback)} />
            <ToggleSetting checked={gapless} label="Gapless playback" onToggle={() => toggleSetting('Gapless playback', gapless, setGapless)} />
            <ToggleSetting checked={volumeNormalization} label="Volume normalization" onToggle={() => toggleSetting('Volume normalization', volumeNormalization, setVolumeNormalization)} />
            <SegmentedSetting label="ReplayGain" onChange={(value) => setSegment('ReplayGain', value, setReplayGainMode)} options={[{ label: 'Off', value: 'off' }, { label: 'Track', value: 'track' }, { label: 'Album', value: 'album' }]} value={replayGainMode} />
          </SettingsGroup>
          <SettingsGroup icon={<SlidersHorizontal size={14} />} title="Transitions">
            <ToggleSetting checked={fadeIn} label="Fade in" onToggle={() => toggleSetting('Fade in', fadeIn, setFadeIn)} />
            <ToggleSetting checked={fadeOut} label="Fade out" onToggle={() => toggleSetting('Fade out', fadeOut, setFadeOut)} />
            <SegmentedSetting label="Crossfade" onChange={(value) => setSegment('Crossfade', value, setCrossfade)} options={[{ label: 'Off', value: 'off' }, { label: 'Short', value: 'short' }, { label: 'Long', value: 'long' }]} value={crossfade} />
          </SettingsGroup>
          <SettingsGroup icon={<ListFilter size={14} />} title="Queue">
            <SegmentedSetting label="Repeat mode" onChange={(value) => setSegment('Repeat mode', value, setRepeatMode)} options={[{ label: 'Off', value: 'off' }, { label: 'One', value: 'one' }, { label: 'All', value: 'all' }]} value={repeatMode} />
            <SegmentedSetting label="Shuffle style" onChange={(value) => setSegment('Shuffle style', value, setShuffleStyle)} options={[{ label: 'Standard', value: 'standard' }, { label: 'Fresh', value: 'fresh' }, { label: 'Deep', value: 'deep' }]} value={shuffleStyle} />
            <ToggleSetting checked={saveQueue} label="Save queue" onToggle={() => toggleSetting('Save queue', saveQueue, setSaveQueue)} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'offlineCache' ? (
        <>
          <SettingsGroup icon={<Archive size={14} />} title="General">
            <SegmentedSetting label="Offline mode" onChange={(value) => setSegment('Offline mode', value, setOfflineMode)} options={[{ label: 'Manual', value: 'manual' }, { label: 'Automatic', value: 'automatic' }]} value={offlineMode} />
            <SegmentedSetting label="Storage limit" onChange={(value) => setSegment('Storage limit', value, setStorageLimit)} options={[{ label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }]} value={storageLimit} />
          </SettingsGroup>
          <SettingsGroup icon={<HardDrive size={14} />} title="Downloads">
            <ToggleSetting checked={downloadOnlyWifi} label="Download only on Wi-Fi" onToggle={() => toggleSetting('Download only on Wi-Fi', downloadOnlyWifi, setDownloadOnlyWifi)} />
            <SegmentedSetting label="Download quality" onChange={(value) => setSegment('Download quality', value, setDownloadQuality)} options={[{ label: 'Original', value: 'original' }, { label: 'High', value: 'high' }, { label: 'Balanced', value: 'balanced' }]} value={downloadQuality} />
            <SegmentedSetting label="Simultaneous downloads" onChange={(value) => setSegment('Simultaneous downloads', value, setSimultaneousDownloads)} options={[{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }]} value={simultaneousDownloads} />
          </SettingsGroup>
          <SettingsGroup icon={<Database size={14} />} title="Playback cache">
            <SegmentedSetting label="Playback cache size" onChange={(value) => setSegment('Playback cache size', value, setPlaybackCacheSize)} options={[{ label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }]} value={playbackCacheSize} />
            <ToggleSetting checked={preloadNextTracks} label="Preload next tracks" onToggle={() => toggleSetting('Preload next tracks', preloadNextTracks, setPreloadNextTracks)} />
          </SettingsGroup>
          <SettingsGroup icon={<Palette size={14} />} title="Images">
            <ToggleSetting checked={imageCache} label="Image cache" onToggle={() => toggleSetting('Image cache', imageCache, setImageCache)} />
            <ToggleSetting checked={highQualityArtwork} label="High quality artwork" onToggle={() => toggleSetting('High quality artwork', highQualityArtwork, setHighQualityArtwork)} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'mediaSources' ? (
        <>
          <SourceStatusCard activeSource={activeSource} onOpenSource={onOpenSource} />
          <SettingsGroup icon={<HardDrive size={14} />} title="Source">
            <ToggleSetting checked={showSourceLabels} label="Show source labels" onToggle={() => toggleSetting('Show source labels', showSourceLabels, setShowSourceLabels)} />
            <InlineActionButton icon={<SlidersHorizontal size={15} />} label="Sync library" onClick={() => onShowToast('Library sync queued')} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'backupRestore' ? (
        <>
          <SettingsGroup icon={<Shield size={14} />} title="Backup">
            <InlineActionButton icon={<Archive size={15} />} label="Create backup" onClick={() => setSettingsPage('backupCreate')} />
          </SettingsGroup>
          <SettingsGroup icon={<Database size={14} />} title="Restore">
            <InlineActionButton icon={<Database size={15} />} label="Restore from backup" onClick={() => setSettingsPage('backupRestoreFlow')} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'backupCreate' ? (
        <>
          <BackupFlow
            options={[
              { checked: backupIncludeSettings, label: backupOptions[0].label, onToggle: () => handleBackupToggle(backupOptions[0].label, backupIncludeSettings, setBackupIncludeSettings) },
              { checked: backupIncludeSources, label: backupOptions[1].label, onToggle: () => handleBackupToggle(backupOptions[1].label, backupIncludeSources, setBackupIncludeSources) },
              { checked: backupIncludePlaylists, label: backupOptions[2].label, onToggle: () => handleBackupToggle(backupOptions[2].label, backupIncludePlaylists, setBackupIncludePlaylists) },
              { checked: backupIncludeHistory, label: backupOptions[3].label, onToggle: () => handleBackupToggle(backupOptions[3].label, backupIncludeHistory, setBackupIncludeHistory) },
              { checked: backupIncludeOfflineRules, label: backupOptions[4].label, onToggle: () => handleBackupToggle(backupOptions[4].label, backupIncludeOfflineRules, setBackupIncludeOfflineRules) },
            ]}
            title="Choose what to include"
          />
          <ActionButton icon={<Archive size={15} />} label="Create backup" onClick={() => { onShowToast('Backup created'); setSettingsPage('backupRestore') }} />
        </>
      ) : null}

      {settingsPage === 'backupRestoreFlow' ? (
        <>
          <BackupFlow
            options={[
              { checked: restoreSettings, label: backupOptions[0].label, onToggle: () => handleBackupToggle(backupOptions[0].label, restoreSettings, setRestoreSettings) },
              { checked: restoreSources, label: backupOptions[1].label, onToggle: () => handleBackupToggle(backupOptions[1].label, restoreSources, setRestoreSources) },
              { checked: restorePlaylists, label: backupOptions[2].label, onToggle: () => handleBackupToggle(backupOptions[2].label, restorePlaylists, setRestorePlaylists) },
              { checked: restoreHistory, label: backupOptions[3].label, onToggle: () => handleBackupToggle(backupOptions[3].label, restoreHistory, setRestoreHistory) },
              { checked: restoreOfflineRules, label: backupOptions[4].label, onToggle: () => handleBackupToggle(backupOptions[4].label, restoreOfflineRules, setRestoreOfflineRules) },
            ]}
            title="Choose what to restore"
          />
          <ActionButton icon={<Database size={15} />} label="Restore backup" onClick={() => { onShowToast('Backup restored'); setSettingsPage('backupRestore') }} />
        </>
      ) : null}

      {settingsPage === 'advanced' ? (
        <>
          <SettingsGroup icon={<Wrench size={14} />} title="Debug">
            <ToggleSetting checked={debugMode} label="Debug mode" onToggle={() => toggleSetting('Debug mode', debugMode, setDebugMode)} />
          </SettingsGroup>
          <SettingsGroup icon={<Database size={14} />} title="Database">
            <InlineActionButton icon={<Database size={15} />} label="Rebuild library index" onClick={() => onShowToast('Library index rebuild queued')} />
            <InlineActionButton icon={<Archive size={15} />} label="Compact local index" onClick={() => onShowToast('Local index compacted')} />
          </SettingsGroup>
          <SettingsGroup icon={<Wifi size={14} />} title="Network">
            <ToggleSetting checked={wifiMetered} label="Treat Wi-Fi as metered" onToggle={() => toggleSetting('Treat Wi-Fi as metered', wifiMetered, setWifiMetered)} />
            <ToggleSetting checked={vpnMetered} label="Treat VPN as metered" onToggle={() => toggleSetting('Treat VPN as metered', vpnMetered, setVpnMetered)} />
          </SettingsGroup>
        </>
      ) : null}

      {settingsPage === 'about' ? <AboutPage /> : null}
    </div>
  )

  return (
    <AriaBottomSheet onClose={onClose} subtitle={settingsPage === 'root' ? undefined : getPageSubtitle(settingsPage)} title={pageTitles[settingsPage]}>
      {pageContent}
    </AriaBottomSheet>
  )
}

function SettingsHub({ onOpenPage }: { onOpenPage: (page: SettingsPage) => void }) {
  return (
    <div className="space-y-4">
      <SettingsGroup title="Main" compact>
        <SettingsCategoryCard icon={<Palette size={17} />} page="interface" status="Display" subtitle="Theme, layout and player display." title="Interface" weight="primary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<Music2 size={17} />} page="library" status="Music" subtitle="Browsing, sorting and metadata labels." title="Library" weight="primary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<PlayCircle size={17} />} page="playback" status="Audio" subtitle="Output, queue and playback behavior." title="Playback" weight="primary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<Archive size={17} />} page="offlineCache" status="Storage" subtitle="Downloads, cache and storage limits." title="Offline & Cache" weight="primary" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<HardDrive size={17} />} page="mediaSources" status="Source" subtitle="Current source, sync and labels." title="Media Sources" weight="primary" onOpenPage={onOpenPage} />
      </SettingsGroup>
      <SettingsGroup title="Tools" compact muted>
        <SettingsCategoryCard icon={<Shield size={17} />} page="backupRestore" status="Tools" subtitle="Save and restore app data." title="Backup & Restore" weight="secondary" onOpenPage={onOpenPage} />
      </SettingsGroup>
      <SettingsGroup title="System" compact muted>
        <SettingsCategoryCard icon={<Wrench size={17} />} page="advanced" status="System" subtitle="Debug, index and network options." title="Advanced" weight="system" onOpenPage={onOpenPage} />
        <SettingsCategoryCard icon={<Info size={17} />} page="about" status="Info" subtitle="Version, engine, licenses and credits." title="About" weight="system" onOpenPage={onOpenPage} />
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

function SettingsPageHeader({ onBack }: { onBack: () => void }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-[12px] font-semibold text-[#d7cabe] transition hover:bg-white/[0.07]" onClick={onBack} type="button">
      <ChevronLeft size={15} /> Settings
    </button>
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
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0a13d]">Current source</p>
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

function AccentColorSetting({ onChange, value }: { onChange: (value: AccentColor) => void; value: AccentColor }) {
  return (
    <div className="rounded-[18px] bg-white/[0.035] p-3">
      <p className="text-[14px] font-semibold leading-tight text-[#fff3e4]">Accent color</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {accentColorOptions.map((option) => {
          const active = option.value === value
          return (
            <button
              aria-pressed={active}
              className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-bold transition ${active ? 'border-[#f0a13d]/55 bg-[#f0a13d]/14 text-[#fff3e4] shadow-[0_0_0_1px_rgba(240,161,61,0.16)]' : 'border-white/[0.075] bg-white/[0.035] text-[#c9beb2] hover:bg-white/[0.07]'}`}
              key={option.value}
              onClick={() => onChange(option.value)}
              type="button"
            >
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: option.swatch }} />
              <span>{option.label}</span>
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

function InlineActionButton({ icon, label, onClick }: { icon?: ReactNode; label: string; onClick: () => void }) {
  return (
    <button className="flex w-full items-center justify-center gap-2 rounded-[18px] bg-white/[0.045] px-3 py-2.5 text-[14px] font-bold text-[#fff3e4] transition hover:bg-white/[0.07] active:scale-[0.99]" onClick={onClick} type="button">
      {icon} {label}
    </button>
  )
}

function BackupFlow({ options, title }: { options: { checked: boolean; label: string; onToggle: () => void }[]; title: string }) {
  return (
    <SettingsGroup icon={<Shield size={14} />} title={title}>
      {options.map((option) => (
        <ToggleSetting checked={option.checked} key={option.label} label={option.label} onToggle={option.onToggle} />
      ))}
    </SettingsGroup>
  )
}

function AboutPage() {
  const facts = [
    { label: 'Aria', value: 'Music player' },
    { label: 'Version', value: '0.1' },
    { label: 'Library engine', value: 'Aria Core' },
    { label: 'Licenses', value: 'Open source notices' },
    { label: 'Credits', value: 'Noqlen' },
  ]

  return (
    <InfoCard>
      <div className="flex items-center gap-2 text-[#f0a13d]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f0a13d]/12">
          <Info size={15} />
        </span>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em]">App details</h3>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-1.5">
        {facts.map((fact) => (
          <div className="rounded-2xl border border-white/[0.075] bg-white/[0.04] px-3 py-2" key={fact.label}>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f0a13d]">{fact.label}</p>
            <p className="mt-0.5 text-[13px] font-semibold text-[#d7cabe]">{fact.value}</p>
          </div>
        ))}
      </div>
    </InfoCard>
  )
}

function getBackPage(page: SettingsPage): SettingsPage {
  return page === 'backupCreate' || page === 'backupRestoreFlow' ? 'backupRestore' : 'root'
}

function getPageSubtitle(page: SettingsPage) {
  const subtitles: Record<SettingsPage, string> = {
    root: '',
    interface: 'Theme, layout and player display.',
    library: 'Browsing, sorting and metadata labels.',
    playback: 'Output, queue and playback behavior.',
    offlineCache: 'Downloads, cache and storage limits.',
    mediaSources: 'Current source, sync and labels.',
    backupRestore: 'Save and restore app data.',
    backupCreate: 'Choose what to include.',
    backupRestoreFlow: 'Choose what to restore.',
    advanced: 'Debug, index and network options.',
    about: 'App details and credits.',
  }

  return subtitles[page]
}

function formatValue(value: string) {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (letter) => letter.toUpperCase())
}
