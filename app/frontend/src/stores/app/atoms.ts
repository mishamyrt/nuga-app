import { atom, computed, map } from 'nanostores'
import type { AppView, WindowAppearance } from './types'

export const appearance = map<WindowAppearance>({
  os: 'mac',
  theme: 'dark'
})
export const os = computed(appearance, v => v.os)
export const theme = computed(appearance, v => v.theme)

export const backgroundColor = atom<string>('#000000')

export const focused = atom<boolean>(true)
export const view = atom<AppView>('lights')
