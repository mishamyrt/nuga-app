import { GetVersion, SetMode, CheckUpdates } from '../../wailsjs/go/nuga/App'
import { EventsOn } from '../../wailsjs/runtime'
import { atom } from 'nanostores'

export type SettingsView = 'lights' | 'device' | 'keys'
export type OSMode = 'win' | 'mac'

export const connected = atom<boolean>(false)
export const view = atom<SettingsView>('lights')
export const osMode = atom<OSMode>('mac')
export const version = atom<string>('dev')
export const individualSettings = atom<boolean>(false)
export const focused = atom<boolean>(true)
export const updateUrl = atom<string | undefined>()

window.addEventListener('blur', () => focused.set(false))
window.addEventListener('focus', () => focused.set(true))

export async function setMode (): Promise<void> {
  if (individualSettings.get()) {
    await SetMode(0)
    return
  }
  const mode = osMode.get() === 'win' ? 1 : 2
  await SetMode(mode)
}

export async function loadApp (): Promise<void> {
  const appVersion = await GetVersion()
  version.set(appVersion)
  await CheckUpdates()
}

EventsOn('update', value => {
  updateUrl.set(value)
})
