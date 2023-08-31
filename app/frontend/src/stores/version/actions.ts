import { GetVersion } from '@wailsjs/go/nuga/App'
import { EventsOff, EventsOn } from '@wailsjs/runtime'
import { onMount, task } from 'nanostores'

import { updateUrl, version } from './atoms'

export async function loadVersion (): Promise<void> {
  const appVersion = await GetVersion()
  if (appVersion === 'dev') {
    return
  }
  version.set(appVersion)
}

export function setUpdateUrl (url: string): void {
  updateUrl.set(url)
}

onMount(version, () => {
  task(async () => {
    await loadVersion()
  })
})

onMount(updateUrl, () => {
  EventsOn('update', setUpdateUrl)
  return () => EventsOff('update')
})
