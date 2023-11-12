import { createEffect, createEvent, createStore, sample } from 'effector'

import { connected } from '$shared/model'

import { getAppSettings, setAppSettings } from '../api/settings'
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
