// import { atom, computed, map, type MapStore, type ReadableAtom } from 'nanostores'

// import { defaultColors, defaultState } from './defaults'
// import type { Color, LightMode, LightState, PreviewColor } from './types'

// export const state = {
//   backlight: map<LightState>({ ...defaultState }),
//   sidelight: map<LightState>({ ...defaultState }),
//   halo: map<LightState>({ ...defaultState })
// }

// export const domains = {
//   backlight: atom<LightMode[]>([]),
//   sidelight: atom<LightMode[]>([]),
//   halo: atom<LightMode[]>([])
// }

// export const backlightColors = atom<Color[][]>([])

// // Apparently these colors cannot be changed, so I set them as an array, without store
// export const haloColors: Color[] = [...defaultColors]
// export const sidelightColors: Color[] = [...defaultColors]

// function supportColors (code: number, modeStore: ReadableAtom<LightMode[]>): boolean {
//   const all = modeStore.get()
//   const mode = all.find(m => m.code === code)
//   if (!mode) {
//     return false
//   }
//   return (mode.features & 1) !== 0
// }

// export const color = {
//   backlight: computed<PreviewColor, MapStore<LightState>>(state.backlight, backlight => {
//     const all = backlightColors.get()
//     if (all.length === 0 || !backlight.enabled) {
//       return
//     }
//     if (backlight.color === 7 || !supportColors(backlight.mode, domains.backlight)) {
//       return 'random'
//     }
//     return all[backlight.mode][backlight.color]
//   }),
//   halo: computed<PreviewColor, MapStore<LightState>>(state.halo, halo => {
//     if (!halo.enabled) {
//       return
//     }
//     if (halo.color === 7 || !supportColors(halo.mode, domains.halo)) {
//       return 'random'
//     }
//     return haloColors[halo.color]
//   }),
//   sidelight: computed<PreviewColor, MapStore<LightState>>(state.sidelight, sidelight => {
//     if (!sidelight.enabled) {
//       return
//     }
//     if (sidelight.color === 7 || !supportColors(sidelight.mode, domains.sidelight)) {
//       return 'random'
//     }
//     return sidelightColors[sidelight.color]
//   })
// }

// export const changingColor = atom<number | undefined>()
