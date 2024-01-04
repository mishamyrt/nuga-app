import { createEffect, createEvent, createStore, sample } from 'effector'

import { fromWailsEvent } from '$shared/lib'

import { openBrowser } from './utils'

const updateUrlChanged = fromWailsEvent('update', (url: string) => url)
export const updateUrlStore = createStore('', {
  name: 'updateUrlStore'
})
updateUrlStore.on(updateUrlChanged, (_, url) => url)

export const updateOpened = createEvent<string>('updateOpened')
export const openBrowserFx = createEffect('openBrowserFx', {
  handler: openBrowser
})

sample({
  clock: updateOpened,
  target: openBrowserFx
})
