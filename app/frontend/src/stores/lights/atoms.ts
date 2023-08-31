import { logStore } from '@stores/logger'
import { atom, computed, deepMap, map } from 'nanostores'

import { defaultColors, defaultState } from './defaults'
import type { Color, LightDomain, LightMode, LightState } from './types'
import { getColor } from './utils'

export const lightState = deepMap<Record<LightDomain, LightState>>({
  backlight: { ...defaultState },
  sidelight: { ...defaultState },
  halo: { ...defaultState }
})

export const lightModes = map<Record<LightDomain, LightMode[]>>({
  backlight: [],
  sidelight: [],
  halo: []
})

export const backlightModes = computed(lightModes, s => s.backlight)
export const sidelightModes = computed(lightModes, s => s.sidelight)
export const haloModes = computed(lightModes, s => s.halo)

export const backlightColors = atom<Color[][]>([])

export const editableColor = atom<number | undefined>()

export const backlightModeColors = computed([lightState, backlightColors], (state, colors) => {
  if ((colors.length - 1) < state.backlight.mode) {
    return []
  }
  return colors[state.backlight.mode]
})

logStore({ lightState, lightModes, backlightColors })

export const backlightColor = computed([lightState, backlightModeColors], (state, colors) => {
  if (colors.length === 0) {
    return
  }
  return getColor(state.backlight, backlightModes, colors)
})
export const sidelightColor = computed(lightState, state => {
  return getColor(state.sidelight, sidelightModes, defaultColors)
})
export const haloColor = computed(lightState, state => {
  return getColor(state.halo, haloModes, defaultColors)
})
