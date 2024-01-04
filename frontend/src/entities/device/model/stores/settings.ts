import { createEffect, createEvent, createStore, sample } from 'effector'

import { connected } from '$shared/model'

import { getModeSettings, setModeSettings } from '../../api'
import { defaultOSMode } from '../constants'
import { type ModeSettings } from '../types'

export const modeSettingsStore = createStore<ModeSettings>(defaultOSMode, {
  name: 'modeSettings'
})
export const modeSettingsChanged = createEvent<ModeSettings>('modeSettingsSet')
const getSettingsFx = createEffect(getModeSettings)
const setSettingsFx = createEffect(setModeSettings)

modeSettingsStore.on([
  getSettingsFx.doneData,
  modeSettingsChanged
], (_, value) => value)

sample({
  clock: modeSettingsChanged,
  target: setSettingsFx
})

sample({
  clock: connected,
  target: getSettingsFx
})
