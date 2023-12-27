import deepEqual from 'deep-equal'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { interval } from 'patronum'

import { createSequence } from '$shared/lib'
import { connected, disconnected } from '$shared/model'

import { getBacklightColors, setBacklightColor } from '../api/color'
import { getModes } from '../api/mode'
import { getLightState, setLightState } from '../api/state'
import { backlightDefaultColors, defaultLightModes, defaultLightState } from './const'
import type { LightBacklightColors, LightModes, LightState, SetBacklightColorParams } from './types'

export const stateSet = createEvent<LightState>('stateSet')
export const stateLoaded = createEvent<LightState>('stateLoaded')
export const backlightColorsUpdated = createEvent<LightBacklightColors>('backlightColorsUpdated')
export const backlightColorChanged = createEvent<SetBacklightColorParams>('backlightColorChanged')

const [createHIDEffect] = createSequence({
  minInterval: 200
})
// HID effects
// This effect is using for connection check
export const getStateFx = createHIDEffect('getState', getLightState)
export const setStateFx = createHIDEffect('setState', setLightState)
export const setBacklightColorFx = createHIDEffect('setBacklightColorFx', setBacklightColor)
// Simple effects
export const getModesFx = createEffect(getModes)
export const getBacklightColorsFx = createEffect('getBacklightColors', {
  handler: getBacklightColors
})

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
modesStore.on(getModesFx.doneData, (_, modes) => modes)
backlightColorsStore.on(getBacklightColorsFx.doneData, (_, colors) => colors)

sample({
  clock: backlightColorChanged,
  target: setBacklightColorFx
})

sample({
  clock: setBacklightColorFx.doneData,
  target: [getBacklightColorsFx]
})

sample({
  clock: stateSet,
  target: setStateFx
})
stateStore.on(stateSet, (_, state) => state)
