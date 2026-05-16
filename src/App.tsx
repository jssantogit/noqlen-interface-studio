import { motion } from 'framer-motion'
import {
  Activity,
  Boxes,
  Brush,
  CircleDot,
  Gauge,
  LayoutDashboard,
  Music2,
  PanelsTopLeft,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type StudioTab = 'Anchor' | 'Flux' | 'Forge' | 'Aria'

const tabs: Array<{
  name: StudioTab
  description: string
  icon: typeof LayoutDashboard
  accent: string
}> = [
  {
    name: 'Anchor',
    description: 'Homepage and navigation surface',
    icon: LayoutDashboard,
    accent: 'from-cyan-300 to-emerald-300',
  },
  {
    name: 'Flux',
    description: 'Workflow state and task motion',
    icon: Activity,
    accent: 'from-violet-300 to-sky-300',
  },
  {
    name: 'Forge',
    description: 'Command palette and review affordances',
    icon: Wand2,
    accent: 'from-amber-200 to-orange-300',
  },
  {
    name: 'Aria',
    description: 'Audio-inspired visual companion',
    icon: Music2,
    accent: 'from-fuchsia-300 to-rose-300',
  },
]

const mockSignals = [
  ['Visual-only', 'No real backend'],
  ['Downloads', 'Disabled mock state'],
  ['Playback', 'Illustrative only'],
  ['Secrets', 'Not collected'],
]

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function AppShell() {
  const [activeTab, setActiveTab] = useState<StudioTab>('Anchor')
  const selected = tabs.find((tab) => tab.name === activeTab) ?? tabs[0]

  return (
    <main className="min-h-screen px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.2fr_0.8fr] lg:p-9">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-sm text-cyan-100">
                  <Sparkles size={16} /> Bloco 0 bootstrap
                </span>
                <span className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-sm text-emerald-100">
                  Mock studio shell
                </span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-200/70">
                  Noqlen Interface Studio
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                  Visual contracts before real integration.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  A responsive, visual-only workspace for shaping Anchor, Flux,
                  Forge and Aria interfaces without touching services, files,
                  playback, downloads, libraries, secrets or server controls.
                </p>
              </div>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Default screen</p>
                  <p className="text-2xl font-semibold text-white">Anchor</p>
                </div>
                <ShieldCheck className="text-emerald-300" size={34} />
              </div>
              <div className="mt-5 grid gap-3">
                {mockSignals.map(([label, value]) => (
                  <div
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    key={label}
                  >
                    <span className="text-sm text-slate-400">{label}</span>
                    <span className="text-sm font-medium text-slate-100">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[18rem_1fr]">
          <nav
            aria-label="Studio areas"
            className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-3 backdrop-blur-xl"
          >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.name

                return (
                  <button
                    aria-pressed={isActive}
                    className={cn(
                      'group rounded-2xl border p-4 text-left transition',
                      isActive
                        ? 'border-cyan-200/35 bg-cyan-200/10 shadow-lg shadow-cyan-950/30'
                        : 'border-transparent bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.06]',
                    )}
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'rounded-xl bg-gradient-to-br p-2 text-slate-950',
                          tab.accent,
                        )}
                      >
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="block font-semibold text-white">
                          {tab.name}
                        </span>
                        <span className="text-sm text-slate-400">
                          {tab.description}
                        </span>
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </nav>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0, y: 12 }}
            key={activeTab}
            transition={{ duration: 0.25 }}
          >
            <TabPanel selected={selected} />
          </motion.section>
        </section>
      </div>
    </main>
  )
}

function TabPanel({ selected }: { selected: (typeof tabs)[number] }) {
  if (selected.name === 'Anchor') {
    return <AnchorPanel selected={selected} />
  }

  return <PlaceholderPanel selected={selected} />
}

function AnchorPanel({ selected }: { selected: (typeof tabs)[number] }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
      <div className="space-y-5">
        <PanelHeading selected={selected} />
        <div className="grid gap-4 sm:grid-cols-3">
          {['Hero density', 'Navigation rhythm', 'Trust strip'].map(
            (label, index) => (
              <MockCard
                icon={index === 0 ? PanelsTopLeft : index === 1 ? Boxes : Gauge}
                key={label}
                label={label}
                value={['Balanced', 'Tabbed', 'Visible'][index]}
              />
            ),
          )}
        </div>
        <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">
                Anchor composition
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Homepage shell preview
              </h2>
            </div>
            <span className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-sm text-emerald-100">
              Selected by default
            </span>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-3xl border border-cyan-200/15 bg-gradient-to-br from-cyan-200/15 to-slate-900 p-5">
              <p className="text-sm text-cyan-100">Hero block</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                Noqlen entry point with clear mock boundaries.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Explore visuals', 'Review contracts', 'Stay mock-only'].map(
                  (item) => (
                    <span
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200"
                      key={item}
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="grid gap-3">
              {['No downloads', 'No server controls', 'No playback hooks'].map(
                (item) => (
                  <div
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    key={item}
                  >
                    <CircleDot className="text-cyan-200" size={18} />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </div>
      <aside className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Mock status
        </p>
        <div className="mt-5 space-y-4">
          {['Wireframe fidelity', 'Responsive shell', 'Contract coverage'].map(
            (item, index) => (
              <div key={item}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300">{item}</span>
                  <span className="text-cyan-100">{[72, 88, 64][index]}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                    style={{ width: `${[72, 88, 64][index]}%` }}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </aside>
    </div>
  )
}

function PlaceholderPanel({ selected }: { selected: (typeof tabs)[number] }) {
  return (
    <div className="space-y-5">
      <PanelHeading selected={selected} />
      <div className="grid gap-4 sm:grid-cols-3">
        <MockCard icon={Brush} label="Visual state" value="Draft" />
        <MockCard icon={PlayCircle} label="Real action" value="Blocked" />
        <MockCard icon={ShieldCheck} label="Boundary" value="Mock-only" />
      </div>
      <div className="rounded-3xl border border-dashed border-white/15 bg-slate-950/35 p-8 text-center">
        <p className="text-lg font-semibold text-white">
          {selected.name} placeholder contract
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
          This panel establishes visual direction only. Later blocks may refine
          layout, states and review flows, but must not connect to real services
          or local resources.
        </p>
      </div>
    </div>
  )
}

function PanelHeading({ selected }: { selected: (typeof tabs)[number] }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
          Studio tab
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
          {selected.name}
        </h2>
        <p className="mt-2 text-slate-300">{selected.description}</p>
      </div>
      <span
        className={cn(
          'rounded-2xl bg-gradient-to-br p-3 text-slate-950',
          selected.accent,
        )}
      >
        <selected.icon size={28} />
      </span>
    </div>
  )
}

function MockCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity
  label: string
  value: string
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
      <Icon className="text-cyan-200" size={22} />
      <p className="mt-4 text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </article>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
