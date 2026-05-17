export type AriaTrack = {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  accent: string
}

export type AriaShelf = {
  id: string
  title: string
  subtitle: string
  accent: string
}

export const nowPlaying: AriaTrack = {
  id: 'golden-hour',
  title: 'Golden Hour',
  artist: 'Noqlen Ensemble',
  album: 'Amber Sessions',
  duration: '4:12',
  accent: 'from-amber-200 via-orange-400 to-slate-950',
}

export const ariaQueue: AriaTrack[] = [
  {
    id: 'night-glass',
    title: 'Night Glass',
    artist: 'Mira Vale',
    album: 'Still Rooms',
    duration: '3:48',
    accent: 'from-sky-200 via-slate-500 to-slate-950',
  },
  {
    id: 'slow-circuit',
    title: 'Slow Circuit',
    artist: 'Lumen Field',
    album: 'Quiet Current',
    duration: '5:02',
    accent: 'from-lime-200 via-emerald-500 to-slate-950',
  },
  {
    id: 'soft-static',
    title: 'Soft Static',
    artist: 'Aster Row',
    album: 'Home Signal',
    duration: '2:56',
    accent: 'from-violet-200 via-fuchsia-500 to-slate-950',
  },
]

export const ariaShelves: AriaShelf[] = [
  {
    id: 'recent',
    title: 'Recent listens',
    subtitle: '12 mock albums',
    accent: 'from-orange-200 to-stone-900',
  },
  {
    id: 'artists',
    title: 'Artists',
    subtitle: 'Curated visual index',
    accent: 'from-slate-200 to-slate-900',
  },
]
