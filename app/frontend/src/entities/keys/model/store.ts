import { createStore } from 'effector'

import { connectionStore } from '$shared/model'

import { defaultTemplate, supportedKeyboards } from './const'
import type { KeyboardTemplate } from './types'
import { buildTemplate } from './utils'

export const keyboardTemplateStore = createStore<KeyboardTemplate>(defaultTemplate, {
  name: 'keyboardTemplateStore'
})

keyboardTemplateStore.on(connectionStore, (_, connection) => {
  const layout = supportedKeyboards[connection.name]
  return buildTemplate(layout)
})
