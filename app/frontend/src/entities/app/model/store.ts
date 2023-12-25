import { createEffect, createEvent, createStore, sample } from 'effector'

import { connected, started } from '$shared/model'

import { getAppSettings, setAppSettings } from '../api/settings'
import { checkUpdates, getVersion } from '../api/version'
import { defaultAppSettings } from './constants'
import type { AppSettings } from './types'

export const appSettingsStore = createStore<AppSettings>(defaultAppSettings, {
  name: 'appSettingsStore'
})
export const appSettingsChanged = createEvent<AppSettings>('appSettingsChanged')
const getAppSettingsFx = createEffect(getAppSettings)
const setAppSettingsFx = createEffect(setAppSettings)

appSettingsStore.on([
  getAppSettingsFx.doneData,
  appSettingsChanged
], (_, value) => value)

sample({
  clock: appSettingsChanged,
  target: setAppSettingsFx
})

sample({
  clock: connected,
  target: getAppSettingsFx
})

export const versionStore = createStore('dev', {
  name: 'versionStore'
})
export const checkUpdatesFx = createEffect('checkUpdatesFx', {
  handler: checkUpdates
})
export const getVersionFx = createEffect('getVersionFx', {
  handler: getVersion
})
versionStore.on(getVersionFx.doneData, (_, version) => version)

sample({
  clock: started,
  target: [getVersionFx, checkUpdatesFx]
})
