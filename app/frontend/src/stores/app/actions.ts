import { GetOS } from '@wailsjs/go/nuga/App'
import { action, onMount, task } from 'nanostores'

import { appearance, backgroundColor, focused, view } from './atoms'
import type { AppView, OS, Theme } from './types'

export const setView = action(view, 'setView', (store, next: AppView) => {
  store.set(next)
})

export const focusChange = action(focused, 'focusChange', (store, state: boolean) => {
  store.set(state)
})

export const setTheme = action(appearance, 'themeChange', (store, state: Theme) => {
  store.setKey('theme', state)
})

export const setOS = action(appearance, 'themeChange', (store, state: OS) => {
  store.setKey('os', state)
})

export const setBackground = action(backgroundColor, 'setBackground', (store, color: string) => {
  store.set(color)
})

onMount(appearance, () => {
  const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
  const getTheme = (isDark: boolean): Theme => isDark ? 'dark' : 'light'
  const handleThemeChange = (): void => setTheme(getTheme(darkMedia.matches))
  task(async () => {
    appearance.set({
      os: await GetOS() as OS,
      theme: getTheme(darkMedia.matches)
    })
  })
  darkMedia.addEventListener('change', handleThemeChange)
  return () => {
    darkMedia.removeEventListener('change', handleThemeChange)
  }
})

onMount(focused, () => {
  const handleBlur = (): void => focusChange(false)
  const handleFocus = (): void => focusChange(true)
  window.addEventListener('blur', handleBlur)
  window.addEventListener('focus', handleFocus)
  return () => {
    window.removeEventListener('blur', handleBlur)
    window.removeEventListener('focus', handleFocus)
  }
})
