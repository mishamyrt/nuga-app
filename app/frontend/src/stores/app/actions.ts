import { GetOS } from '@wailsjs/go/nuga/App'
import { onMount, task } from 'nanostores'

import { appearance, backgroundColor, focused, view } from './atoms'
import type { AppView, OS, Theme } from './types'

export function setView (next: AppView): void {
  view.set(next)
}

export function focusChange (state: boolean): void {
  focused.set(state)
}

export function setTheme (state: Theme): void {
  appearance.setKey('theme', state)
}

export function setOS (state: OS): void {
  appearance.setKey('os', state)
}

export function setBackground (color): void {
  backgroundColor.set(color)
}

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
