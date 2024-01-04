import { createStore, sample } from 'effector'

import { connected, disconnected } from '$shared/model'

import { defaultTemplate, supportedKeyboards } from './const'
import type { KeyboardTemplate } from './types'
import { buildTemplate } from './utils'

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
