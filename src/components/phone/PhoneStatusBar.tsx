export function PhoneStatusBar({ appName }: { appName: string }) {
  return (
    <div className="flex h-8 items-center justify-between px-5 text-[0.68rem] font-medium text-white/82">
      <span>9:41</span>
      <span className="max-w-32 truncate text-white/55">{appName}</span>
      <span className="flex items-center gap-1.5" aria-label="Simulated status">
        <span className="h-2 w-3 rounded-[0.2rem] border border-white/55" />
        <span className="h-2 w-2 rounded-full bg-emerald-300/85" />
      </span>
    </div>
  )
}
