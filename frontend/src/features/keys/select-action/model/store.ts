import { createStore, sample } from 'effector'

import { keyActionChanged, keyNamesStore } from '$entities/keys'

export const selectedNameStore = createStore('None', {
  name: 'selectedName'
})

sample({
  clock: keyActionChanged,
  source: keyNamesStore,
  fn: (map, { key }) => {
    console.log({ map, key })
    return map[key] ?? 'None'
  },
  target: selectedNameStore
})
