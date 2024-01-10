import { createStore, sample } from 'effector'

import { connected, disconnected } from '$shared/model'

import { buildTemplate } from '../lib/build-template'
import { defaultTemplate, supportedKeyboards } from '../lib/constants'
import type { KeyboardTemplate } from './types'

export const keyboardTemplateStore = createStore<KeyboardTemplate>(defaultTemplate, {
  name: 'keyboardTemplateStore'
})

keyboardTemplateStore.on(connected, (_, connection) => {
  const layout = supportedKeyboards[connection.name]
  return buildTemplate(layout)
})

sample({
  clock: disconnected,
  fn: () => defaultTemplate,
  target: keyboardTemplateStore
})
