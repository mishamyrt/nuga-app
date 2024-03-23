import { createEffect, createEvent, createStore, sample } from 'effector'

import { appStarted } from '$shared/model'

import { getAppSettings, setAppSettings } from '../../api/settings'
import { defaultAppSettings } from '../../lib/constants'
import type { AppSettings } from '../types'

export const settingsChanged = createEvent<AppSettings>('settingsChanged')

export const settingsStore = createStore<AppSettings>(defaultAppSettings, {
  name: 'settingsStore'
})

const getSettingsFx = createEffect('getSettingsFx', {
  handler: getAppSettings
})
const setSettingsFx = createEffect('setSettingsFx', {
  handler: setAppSettings
})

sample({
  clock: appStarted,
  target: getSettingsFx
})
sample({
  clock: settingsChanged,
  target: setSettingsFx
})

settingsStore.on([
  getSettingsFx.doneData,
  settingsChanged
], (_, value) => value)
