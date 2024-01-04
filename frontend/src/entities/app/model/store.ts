import { createEffect, createEvent, createStore, sample } from 'effector'

import { connected, started } from '$shared/model'

import { restartApp } from '../api/app'
import { getBackgroundColor } from '../api/browser'
import { getAppSettings, setAppSettings } from '../api/settings'
import { getVersion } from '../api/version'
import { defaultAppSettings } from './constants'
import type { AppSettings } from './types'

export const appSettingsChanged = createEvent<AppSettings>('appSettingsChanged')
export const appRestarted = createEvent('appRestarted')

export const appBackgroundStore = createStore<string>('#FFFFFF', {
  name: 'appBackgroundStore'
})
export const versionStore = createStore('dev', {
  name: 'versionStore'
})
export const appSettingsStore = createStore<AppSettings>(defaultAppSettings, {
  name: 'appSettingsStore'
})

const getAppSettingsFx = createEffect('getAppSettingsFx', {
  handler: getAppSettings
})
const setAppSettingsFx = createEffect('setAppSettingsFx', {
  handler: setAppSettings
})
export const getVersionFx = createEffect('getVersionFx', {
  handler: getVersion
})
const getAppBackgroundFx = createEffect('getAppBackgroundFx', {
  handler: getBackgroundColor
})
const restartAppFx = createEffect('restartAppFx', {
  handler: restartApp
})

sample({
  clock: connected,
  target: getAppSettingsFx
})
sample({
  clock: appSettingsChanged,
  target: setAppSettingsFx
})
appSettingsStore.on([
  getAppSettingsFx.doneData,
  appSettingsChanged
], (_, value) => value)

sample({
  clock: started,
  target: [getVersionFx]
})
versionStore.on(getVersionFx.doneData, (_, version) => version)

sample({
  clock: appSettingsChanged,
  target: getAppBackgroundFx
})
appBackgroundStore.on(getAppBackgroundFx.doneData, (_, background) => background)

sample({
  clock: appRestarted,
  target: restartAppFx
})
