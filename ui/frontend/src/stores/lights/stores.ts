import { atom, computed, map, type MapStore } from "nanostores"
import type { Color, LightMode, LightState } from "./types"
import { defaultColors, defaultState } from "./defaults"

export const state = {
  backlight: map<LightState>({...defaultState}),
  sidelight: map<LightState>({...defaultState}),
  halo: map<LightState>({...defaultState})
}

export const modes = {
  backlight: atom<LightMode[]>([]),
  sidelight: atom<LightMode[]>([]),
  halo: atom<LightMode[]>([])
}

export const backlightColors = atom<Color[][]>([])

// Apparently these colors cannot be changed, so I set them as an array, without store
export const haloColors: Color[] = [...defaultColors]
export const sidelightColors: Color[] = [...defaultColors]

export const color = {
  backlight: computed<Color | undefined, MapStore<LightState>>(state.backlight, backlight => {
    const all = backlightColors.get()
    if (all.length === 0 || !backlight.enabled) {
      return
    }
    return all[backlight.mode][backlight.color]
  }),
  halo: computed<Color | undefined, MapStore<LightState>>(state.halo, halo => {
    if (!halo.enabled) {
      return
    }
    return haloColors[halo.color]
  }),
  sidelight: computed<Color | undefined, MapStore<LightState>>(state.sidelight, sidelight => {
    if (!sidelight.enabled) {
      return
    }
    return sidelightColors[sidelight.color]
  })
}
