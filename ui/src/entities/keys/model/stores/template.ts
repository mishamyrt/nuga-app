import { createStore, sample } from 'effector'

import { connected, disconnected } from '$shared/model'

import { buildTemplate } from '../../lib/build-template'
import { defaultTemplate, supportedKeyboards } from '../../lib/constants'

export const keyboardTemplateStore = createStore(defaultTemplate, {
  name: 'keyboardTemplate'
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
