import { createEffect, createEvent, createStore, sample } from 'effector'

import { connected } from '$shared/model'

import { getFirmware } from '../api/firmware'

export const firmwareVersionStore = createStore('dev', {
  name: 'firmwareVersion'
})
export const firmwareVersionUpdated = createEvent<string>(
  'firmwareVersionUpdated'
)
export const getFirmwareFx = createEffect('getFirmware', {
  handler: getFirmware
})

firmwareVersionStore.on(firmwareVersionUpdated, (_, value) => value)

sample({
  clock: getFirmwareFx.doneData,
  target: firmwareVersionUpdated
})

sample({
  clock: connected,
  target: getFirmwareFx
})
