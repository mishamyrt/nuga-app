import { capitalize } from '@utils/strings'
import type { ReadableAtom } from 'nanostores'

import type { Color, EffectParams, LightMode, LightState, PreviewColor } from './types'

export function supportsColor (code: number, modeStore: ReadableAtom<LightMode[]>): boolean {
  const all = modeStore.get()
  const mode = all.find(m => m.code === code)
  if (!mode) {
    return false
  }
  return mode.supports.specificColor
}

export function getColor (
  state: LightState,
  modeStore: ReadableAtom<LightMode[]>,
  colors: Color[]
): PreviewColor {
  if (!state.enabled) {
    return
  }
  if (state.color === 7 || !supportsColor(state.mode, modeStore)) {
    return 'random'
  }
  return colors[state.color]
}

export function mapModes (m: any[]): LightMode[] {
  return m
    .map(i => ({
      name: capitalize(i.name),
      supports: {
        // Features from lib/pkg/light/effect/feature.go
        specificColor: (i.features & 1) !== 0,
        randomColor: (i.features & 4) !== 0,
        speed: (i.features & 16) !== 0
      },
      code: i.code
    }))
}

export function parseEffect (mode: number, params: EffectParams): LightState {
  const enabled = mode !== 0
  return {
    enabled,
    mode: enabled ? mode : 1,
    color: params.color,
    speed: params.speed,
    brightness: params.brightness
  }
}
