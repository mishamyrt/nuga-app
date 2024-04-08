import { createEffect, createEvent, createStore, sample } from 'effector'

import { fromWailsEvent } from '$shared/lib'
import { appStarted } from '$shared/model'

import { openBrowser } from '../../api/browser'
import { checkUpdates, getVersion } from '../../api/version'
import { defaultVersion } from '../../lib/constants'

export const updateOpened = createEvent<string>('updateOpened')
const updateFound = fromWailsEvent<string>('update', { name: 'updateFound' })

export const versionStore = createStore(defaultVersion, {
  name: 'versionStore',
})
export const updateUrlStore = createStore<Maybe<string>>(null, {
  name: 'updateUrlStore',
})

export const getVersionFx = createEffect('getVersionFx', {
  handler: getVersion,
})
export const checkUpdatesFx = createEffect('checkUpdatesFx', {
  handler: checkUpdates,
})
export const openBrowserFx = createEffect('openBrowserFx', {
  handler: openBrowser,
})

sample({
  clock: appStarted,
  target: [getVersionFx, checkUpdatesFx],
})
versionStore.on(getVersionFx.doneData, (_, version) => version)
updateUrlStore.on(updateFound, (_, url) => url)

sample({
  clock: updateOpened,
  target: openBrowserFx,
})
