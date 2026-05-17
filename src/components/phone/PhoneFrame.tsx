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
      className="relative w-full max-w-[var(--studio-phone-width)] shrink rounded-[var(--studio-phone-radius)] bg-[linear-gradient(145deg,#17191d_0%,#030405_42%,#0b0d10_100%)] p-[var(--studio-phone-rim)] shadow-[0_1.2rem_2.4rem_rgba(0,0,0,0.38),0_2.4rem_4rem_rgba(0,0,0,0.32),inset_0_0_0_1px_rgba(255,255,255,0.085),inset_0.14rem_0.1rem_0.28rem_rgba(255,255,255,0.055),inset_-0.18rem_-0.2rem_0.5rem_rgba(0,0,0,0.75)] lg:shrink-0"
    >
      <div
        aria-hidden="true"
        className="absolute -left-[0.08rem] top-[24%] h-11 w-[0.12rem] rounded-l-full bg-[#0b0d10] shadow-[inset_-1px_0_0_rgba(255,255,255,0.12),-1px_0_0_rgba(0,0,0,0.65)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[0.08rem] top-[32%] h-8 w-[0.12rem] rounded-l-full bg-[#0b0d10] shadow-[inset_-1px_0_0_rgba(255,255,255,0.1),-1px_0_0_rgba(0,0,0,0.6)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[0.1rem] top-[27%] h-16 w-[0.14rem] rounded-r-full bg-[#111318] shadow-[inset_1px_0_0_rgba(255,255,255,0.16),1px_0_0_rgba(0,0,0,0.7)]"
      />

      <div className="relative aspect-[var(--studio-phone-aspect)] w-full min-w-0 max-w-full overflow-hidden rounded-[calc(var(--studio-phone-radius)-0.28rem)] bg-black p-[var(--studio-phone-bezel)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.045),inset_0_1rem_1.8rem_rgba(255,255,255,0.025),inset_0_-1rem_2rem_rgba(0,0,0,0.78)]">
        <div className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--studio-phone-screen-radius)] border border-white/[0.025] bg-[#05070b] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.82)]">
          <div className="pointer-events-none absolute left-1/2 top-[0.72rem] z-30 h-[0.52rem] w-[0.52rem] -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0.06rem_0.05rem_0.08rem_rgba(255,255,255,0.08),inset_-0.08rem_-0.08rem_0.1rem_rgba(0,0,0,0.9)] sm:top-[0.82rem] sm:h-[0.58rem] sm:w-[0.58rem]" />
          <PhoneStatusBar />
          {children}
          <PhoneHomeIndicator />
        </div>
      </div>
    </section>
  )
}
