import { AlertTriangle, Lock } from 'lucide-react'
import type { NavidromeSafetyLevel } from '../navidromeConfigCatalog'

const riskyMessages: Record<string, string> = {
  EnableDownloads: 'Downloads can let users export media from the server.',
  EnableSharing: 'Sharing can expose public links outside the local device.',
  EnableInsightsCollector: 'Insights collection is privacy-sensitive; keep it disabled unless needed.',
  'ExtAuth.TrustedSources': 'Trusted proxy sources can allow spoofed users if configured too broadly.',
  'Subsonic.DefaultReportRealPath': 'Reporting real paths may expose private filesystem details.',
}

export function AnchorNavidromeDangerNote({
  settingKey,
  safetyLevel,
}: {
  settingKey: string
  safetyLevel: NavidromeSafetyLevel
}) {
  if (safetyLevel === 'sensitive') {
    return (
      <p className="mt-2 flex gap-2 rounded-xl border border-red-400/18 bg-red-400/[0.07] px-3 py-2 text-[0.68rem] leading-4 text-red-100/88">
        <Lock className="mt-0.5 shrink-0 text-red-200" size={13} />
        Sensitive values are masked in the Studio and are never stored as real secrets.
      </p>
    )
  }

  const message = riskyMessages[settingKey]
  if (!message) return null

  return (
    <p className="mt-2 flex gap-2 rounded-xl border border-orange-300/16 bg-orange-300/[0.065] px-3 py-2 text-[0.68rem] leading-4 text-orange-100/86">
      <AlertTriangle className="mt-0.5 shrink-0 text-orange-200" size={13} />
      {message}
    </p>
  )
}
