import type { ReactNode } from 'react'

export function AppViewport({ children }: { children: ReactNode }) {
  return (
    <div className="phone-app-viewport min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-[2rem] bg-[#0a0d12] shadow-inner shadow-black/60">
      {children}
    </div>
  )
}
