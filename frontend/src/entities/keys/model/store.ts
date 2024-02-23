import { createEffect, createStore, sample } from 'effector'

import { connected, disconnected } from '$shared/model'

import { getGroups } from '../api/layout'
import { buildTemplate } from '../lib/build-template'
import { defaultTemplate, supportedKeyboards } from '../lib/constants'
import type { KeyboardTemplate, KeyGroup } from './types'

export const keyboardTemplateStore = createStore<KeyboardTemplate>(defaultTemplate, {
  name: 'keyboardTemplate'
})
export const keysGroupStore = createStore<KeyGroup[]>([], {
  name: 'keysGroupStore'
})

const getGroupsFx = createEffect('getGroupsFx', { handler: getGroups })

sample({
  clock: connected,
  target: getGroupsFx
})

keysGroupStore.on(getGroupsFx.doneData, (_, groups) => groups)

keyboardTemplateStore.on(connected, (_, connection) => {
  const layout = supportedKeyboards[connection.name]
  return buildTemplate(layout)
})

sample({
  clock: disconnected,
  fn: () => defaultTemplate,
  target: keyboardTemplateStore
})
