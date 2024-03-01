import deepEqual from 'deep-equal'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { interval } from 'patronum'

import { anyStateRestored } from '$entities/device/@x/lights'
import { connected, createHIDEffect, disconnected, modeChanged } from '$shared/model'

import { getBacklightColors, setBacklightColor } from '../api/color'
import { getModes } from '../api/mode'
import { getLightState, setLightState } from '../api/state'
import { rgbToHex } from '../utils/hex'
import { backlightDefaultColors, defaultLightModes, defaultLightState } from './const'
import type { LightBacklightColors, LightModes, LightState, SetBacklightColorParams } from './types'

export const stateSet = createEvent<LightState>('stateSet')
export const stateLoaded = createEvent<LightState>('stateLoaded')
export const backlightColorChanged = createEvent<SetBacklightColorParams>('backlightColorChanged')

export const stateStore = createStore<LightState>(defaultLightState, { name: 'stateStore' })
export const modesStore = createStore<LightModes>(defaultLightModes, { name: 'modesStore' })
export const backlightColorsStore = createStore<LightBacklightColors>(
  backlightDefaultColors,
  { name: 'backlightColorsStore' }
)

// State update interval
const { tick } = interval({
  timeout: 2000,
  start: connected,
  stop: disconnected,
  leading: true
})

// HID effects
// This effect is using for connection check
export const getStateFx = createHIDEffect('getState', getLightState)
export const setStateFx = createHIDEffect('setState', setLightState)
export const setBacklightColorFx = createHIDEffect('setBacklightColorFx', setBacklightColor)
export const getBacklightColorsFx = createHIDEffect('getBacklightColors', getBacklightColors)
// Simple effects
export const getModesFx = createEffect(getModes)

sample({
  clock: tick,
  target: getStateFx
})
sample({
  clock: getStateFx.fail,
  target: disconnected
})
sample({
  source: stateStore,
  clock: getStateFx.doneData,
  filter: (state, nextState) => !deepEqual(state, nextState),
  fn: (_, state) => state,
  target: stateLoaded
})
stateStore.on(stateLoaded, (current, loaded) => {
  const backlight = loaded.backlight.enabled
    ? loaded.backlight
    : {
        ...current.backlight,
        enabled: false
      }
  return {
    backlight,
    halo: loaded.halo,
    sidelight: loaded.sidelight
  }
})

sample({
  clock: connected,
  target: [getModesFx, getBacklightColorsFx]
})
sample({
  clock: [modeChanged, anyStateRestored],
  target: getBacklightColorsFx
})
modesStore.on(getModesFx.doneData, (_, modes) => modes)
backlightColorsStore.on(backlightColorChanged, (colors, { mode, colorIndex, color }) => {
  const { R, G, B } = color
  const targetColors: LightBacklightColors = []
  for (let i = 0; i < colors.length; i++) {
    if (i !== mode) {
      targetColors.push(colors[i])
      continue
    }
    const modeColors = [...colors[i]]
    modeColors[colorIndex] = rgbToHex(R, G, B)
    targetColors.push(modeColors)
  }
  return targetColors
})
sample({
  clock: backlightColorChanged,
  target: setBacklightColorFx
})
sample({
  clock: stateSet,
  target: [setStateFx, stateStore]
})
