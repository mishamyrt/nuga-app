import { atom } from 'nanostores'
import { GetVersion } from '../../../wailsjs/go/nuga/App'
import { EventsOn } from '../../../wailsjs/runtime/runtime'

export const version = atom<string>('dev')
export const updateUrl = atom<string | undefined>()

export async function initVersion (): Promise<void> {
  const appVersion = await GetVersion()
  if (appVersion === 'dev') {
    return
  }
  version.set(appVersion)
  EventsOn('update', value => updateUrl.set(value))
}
