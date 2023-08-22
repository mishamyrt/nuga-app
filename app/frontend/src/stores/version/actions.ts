import { action, onMount } from 'nanostores'
import { updateUrl, version } from './atoms'
import { GetVersion } from '@wailsjs/go/nuga/App'
import { EventsOff, EventsOn } from '@wailsjs/runtime'

export const loadVersion = action(version, 'loadVersion', async store => {
  const appVersion = await GetVersion()
  if (appVersion === 'dev') {
    return
  }
  store.set(appVersion)
})

export const setUpdateUrl = action(updateUrl, 'setUpdateUrl', (store, url: string) => {
  store.set(url)
})

onMount(version, () => {
  loadVersion()
})

onMount(updateUrl, () => {
  EventsOn('update', setUpdateUrl)
  return () => EventsOff('update')
})
