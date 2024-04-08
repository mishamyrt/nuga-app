import deepEqual from 'deep-equal'
import { createEvent, createStore, sample } from 'effector'
import { interval, not } from 'patronum'

import { anyStateRestored } from '$entities/device/@x/lights'
import { connected, createHIDEffect, disconnected, modeChanged } from '$shared/model'

import {
  getBacklightColors,
  getLightState,
  setBacklightColor,
  setLightState
} from '../../api'
import {
  backlightDefaultColors,
  defaultLightState,
  parseEffectParamsState,
  rgbToHex,
  stateUpdateInterval
} from '../../lib'
import type { LightBacklightColors, LightState, SetBacklightColorParams } from '../types'

export const stateSet = createEvent<LightState>('stateSet')
export const stateLoaded = createEvent<LightState>('stateLoaded')
export const backlightColorChanged = createEvent<SetBacklightColorParams>('backlightColorChanged')

export const stateStore = createStore<LightState>(
  defaultLightState,
  { name: 'stateStore' }
)
export const backlightColorsStore = createStore<LightBacklightColors>(
  backlightDefaultColors,
  { name: 'backlightColorsStore' }
)

// HID effects
// getStateFx is also using for connection check (ping)
export const getStateFx = createHIDEffect({
  name: 'getStateFx',
  handler: getLightState
})
export const setStateFx = createHIDEffect({
  name: 'setStateFx',
  handler: setLightState
})
export const setBacklightColorFx = createHIDEffect({
  name: 'setBacklightColorFx',
  handler: setBacklightColor
})
export const getBacklightColorsFx = createHIDEffect({
  name: 'getBacklightColorsFx',
  handler: getBacklightColors
})

// State update interval
const { tick } = interval({
  timeout: stateUpdateInterval,
  start: connected,
  stop: disconnected,
  leading: true
})

sample({
  clock: tick,
  target: getStateFx
})

sample({
  clock: stateSet,
  target: [setStateFx, stateStore]
})
sample({
  clock: [connected, modeChanged, anyStateRestored],
  target: getBacklightColorsFx
})
sample({
  clock: getStateFx.fail,
  target: disconnected
})
sample({
  clock: getStateFx.doneData,
  source: stateStore,
  filter: (state, nextState) => !deepEqual(state, nextState),
  fn: (_, nextState) => parseEffectParamsState(nextState),
  target: stateLoaded
})

sample({
  clock: stateLoaded,
  source: stateStore,
  filter: not(setStateFx.pending),
  fn: (state, nextState) => {
    const backlight = nextState.backlight.enabled
      ? nextState.backlight
      : {
          ...state.backlight,
          enabled: false
        }
    return {
      backlight,
      halo: nextState.halo,
      sidelight: nextState.sidelight
    }
  },
  target: stateStore
})
stateStore.on(stateLoaded, (current, loaded) => {

})

sample({
  clock: backlightColorChanged,
  target: setBacklightColorFx
})
backlightColorsStore.on(backlightColorChanged, (modes, { mode, colorIndex, color }) => {
  return modes.map((colors, i) => {
    if (i !== mode) {
      return colors
    }
    const modeColors = [...colors]
    modeColors[colorIndex] = rgbToHex(color)
    return modeColors
  })
})
