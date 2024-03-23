import { createEffect, createStore, sample } from 'effector'

import { defaultBackgroundColor } from '../../lib/constants'
import { getBackgroundColor } from '../../lib/get-background-color'
import { settingsChanged } from './settings'

export const appBackgroundStore = createStore<string>(defaultBackgroundColor, {
  name: 'appBackgroundStore'
})

const getAppBackgroundFx = createEffect('getAppBackgroundFx', {
  handler: getBackgroundColor
})

sample({
  clock: settingsChanged,
  target: getAppBackgroundFx
})
appBackgroundStore.on(getAppBackgroundFx.doneData, (_, background) => background)
