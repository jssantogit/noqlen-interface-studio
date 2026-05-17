import type { ReactNode } from 'react'
import { PhoneHomeIndicator } from './PhoneHomeIndicator'
import { PhoneStatusBar } from './PhoneStatusBar'

export function PhoneFrame({
  appName,
  children,
}: {
  appName: string
  children: ReactNode
}) {
  return (
    <section
      aria-label={`${appName} phone simulator`}
      className="relative min-w-0 w-full max-w-[var(--studio-phone-width)] shrink rounded-[clamp(2.45rem,8vw,3.35rem)] border border-white/[0.08] bg-[linear-gradient(145deg,#1a1d22_0%,#050608_44%,#111317_100%)] p-[clamp(0.38rem,1.2vw,0.58rem)] shadow-[0_1.35rem_2.4rem_rgba(0,0,0,0.34),0_3rem_5.6rem_rgba(0,0,0,0.42)] before:pointer-events-none before:absolute before:inset-[0.18rem] before:rounded-[inherit] before:border before:border-white/[0.06] before:content-[''] lg:shrink-0"
    >
      <div
        aria-hidden="true"
        className="absolute left-[0.08rem] top-[23%] h-12 w-[0.16rem] rounded-r-full bg-white/12 shadow-[inset_-1px_0_1px_rgba(255,255,255,0.2)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[0.08rem] top-[33%] h-8 w-[0.16rem] rounded-r-full bg-white/10 shadow-[inset_-1px_0_1px_rgba(255,255,255,0.18)]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[0.08rem] top-[29%] h-16 w-[0.16rem] rounded-l-full bg-white/12 shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]"
      />

      <div className="relative aspect-[9/19.9] w-full min-w-0 max-w-full rounded-[clamp(2.05rem,7vw,2.8rem)] bg-black p-[clamp(0.42rem,1.35vw,0.64rem)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.055),inset_0_1.2rem_2rem_rgba(255,255,255,0.035),inset_0_-1.4rem_2.8rem_rgba(0,0,0,0.8)]">
        <div className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[clamp(1.62rem,6vw,2.18rem)] border border-white/[0.04] bg-[#05070b] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.7),inset_0_1.5rem_2.4rem_rgba(255,255,255,0.028)]">
          <div className="pointer-events-none absolute left-1/2 top-[0.48rem] z-30 h-[1.18rem] w-[5.85rem] -translate-x-1/2 rounded-full border border-white/[0.045] bg-black shadow-[0_0.3rem_0.75rem_rgba(0,0,0,0.55),inset_0_0.06rem_0.08rem_rgba(255,255,255,0.08)] sm:top-[0.58rem] sm:h-[1.3rem] sm:w-[6.4rem]">
            <span className="absolute right-[1rem] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-slate-700/50 shadow-[0_0_0.35rem_rgba(96,165,250,0.15)]" />
          </div>
          <PhoneStatusBar />
          {children}
          <PhoneHomeIndicator />
        </div>
      </div>
    </section>
  )
}
