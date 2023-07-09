import { GetVersion, SetMode } from '../../wailsjs/go/main/App'
import { atom } from 'nanostores'

export type SettingsView = 'lights' | 'device' | 'keys'
export type OSMode = 'win' | 'mac'

export const connected = atom<boolean>(false)
export const view = atom<SettingsView>('lights')
export const osMode = atom<OSMode>('mac')
export const version = atom<string>('dev')
export const individualSettings = atom<boolean>(false)
export const focused = atom<boolean>(true)

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

export async function loadVersion (): Promise<void> {
  const appVersion = await GetVersion()
  version.set(appVersion)
}
