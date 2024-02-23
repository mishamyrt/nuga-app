import { createEffect, createEvent, createStore, sample } from 'effector'

import { connected } from '$shared/model'

import { getFirmware, getSupports } from '../api'
import { defaultSupports } from '../lib/constants'

export const firmwareVersionUpdated = createEvent<string>('firmwareVersionUpdated')

export const supportsStore = createStore(defaultSupports, { name: 'supports' })
export const firmwareVersionStore = createStore('dev', {
  name: 'firmwareVersion'
})

export const getFirmwareFx = createEffect('getFirmware', { handler: getFirmware })
export const getSupportsFx = createEffect('getSupports', { handler: getSupports })

sample({
  clock: getFirmwareFx.doneData,
  target: firmwareVersionUpdated
})

firmwareVersionStore.on(firmwareVersionUpdated, (_, value) => value)
supportsStore.on(getSupportsFx.doneData, (_, value) => value)

sample({
  clock: connected,
  target: [getFirmwareFx, getSupportsFx]
})
