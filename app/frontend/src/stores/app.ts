import { GetVersion, SetMode, CheckUpdates, GetOS } from '../../wailsjs/go/nuga/App'
import { EventsOn } from '../../wailsjs/runtime'
import { atom } from 'nanostores'

export type SettingsView = 'lights' | 'device' | 'keys'
export type OSMode = 'win' | 'mac'
export type OS = 'linux' | 'mac' | 'windows'

export const connected = atom<boolean>(false)
export const view = atom<SettingsView>('lights')
export const osMode = atom<OSMode>('mac')
export const version = atom<string>('dev')
export const individualSettings = atom<boolean>(false)
export const focused = atom<boolean>(true)
export const updateUrl = atom<string | undefined>()
export const os = atom<OS>('mac')
export const theme = atom<'light' | 'dark'>('dark')

export async function setMode (): Promise<void> {
  if (individualSettings.get()) {
    await SetMode(0)
    return
  }
  const mode = osMode.get() === 'win' ? 1 : 2
  await SetMode(mode)
}

function subscribeTheme (): void {
  const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
  function setTheme (): void {
    theme.set(darkMedia.matches ? 'dark' : 'light')
  }
  setTheme()
  darkMedia.addEventListener('change', () => setTheme())
}

export async function loadApp (): Promise<void> {
  const appVersion = await GetVersion()
  version.set(appVersion)
  const userOs = await GetOS()
  os.set(userOs as OS)
  window.addEventListener('blur', () => focused.set(false))
  window.addEventListener('focus', () => focused.set(true))
  subscribeTheme()
  await CheckUpdates()
}

EventsOn('update', value => {
  updateUrl.set(value)
})
