import type { ReactNode } from 'react'

export function AppViewport({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-[2rem] bg-[#0a0d12] shadow-inner shadow-black/60">
      {children}
    </div>
  )
}
