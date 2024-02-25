import { createStore, sample } from 'effector'

import { keyNamesStore, selectedActionStore } from '$entities/keys'

export const selectedNameStore = createStore('None', {
  name: 'selectedName'
})

sample({
  clock: selectedActionStore,
  source: keyNamesStore,
  fn: (map, { key }) => {
    return map[key] ?? 'None'
  },
  target: selectedNameStore
})
