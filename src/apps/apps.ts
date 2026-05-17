import type { ComponentType } from 'react'
import { AnchorPreview } from './anchor/AnchorPreview'
import { AriaPreview } from './aria/AriaPreview'
import { FluxPreview } from './flux/FluxPreview'
import { ForgePreview } from './forge/ForgePreview'

export type StudioAppId = 'anchor' | 'forge' | 'aria' | 'flux'

export type StudioApp = {
  id: StudioAppId
  name: string
  mood: string
  stage: string
  Preview: ComponentType
}

export const studioApps: StudioApp[] = [
  {
    id: 'anchor',
    name: 'Anchor',
    mood: 'local media server control',
    stage: 'Static visual placeholder',
    Preview: AnchorPreview,
  },
  {
    id: 'forge',
    name: 'Forge',
    mood: 'library repair and review',
    stage: 'Legacy-informed mock preview',
    Preview: ForgePreview,
  },
  {
    id: 'aria',
    name: 'Aria',
    mood: 'music player and library experience',
    stage: 'Legacy-informed mock preview',
    Preview: AriaPreview,
  },
  {
    id: 'flux',
    name: 'Flux',
    mood: 'workflow and state motion',
    stage: 'Static visual placeholder',
    Preview: FluxPreview,
  },
]
