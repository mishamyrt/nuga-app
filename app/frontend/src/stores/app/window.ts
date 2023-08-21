import { atom } from 'nanostores'
import { GetOS } from '../../../wailsjs/go/nuga/App'

/**
 * Operating systems supported by the GUI
 */
export type OS = 'linux' | 'mac'

export const focused = atom<boolean>(true)
export const os = atom<OS>('mac')
export const theme = atom<'light' | 'dark'>('dark')
export const backgroundColor = atom<string>('#000000')

function handleBlur (): void {
  focused.set(false)
}

function handleFocus (): void {
  focused.set(true)
}

function listenFocused (): void {
  window.addEventListener('blur', handleBlur)
  window.addEventListener('focus', handleFocus)
}

const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
function handleThemeChange (): void {
  theme.set(darkMedia.matches ? 'dark' : 'light')
}

function listenTheme (): void {
  handleThemeChange()
  darkMedia.addEventListener('change', handleThemeChange)
}

export async function initWindow (): Promise<void> {
  const userOs = await GetOS()
  os.set(userOs as OS)
  listenFocused()
  listenTheme()
}

export function bindBackgroundColor (ref: HTMLElement, property: string): void {
  theme.subscribe(() => {
    setTimeout(() => {
      const styles = getComputedStyle(ref)
      backgroundColor.set(
        styles.getPropertyValue(property)
      )
    }, 20)
  })
}
