import type { ColorScheme, OS, ThemeContext } from '@naco-ui/svelte'
import { prefersDarkMediaQuery } from '@naco-ui/svelte'
import type { Store, Subscription } from 'effector'
import { setContext } from 'svelte'
import { writable } from 'svelte/store'

import type { AppSettings } from '../model/types'

export function themeContextFromSettings (
  settingsStore: Store<AppSettings>
): [ThemeContext, Subscription] {
  const os = writable<OS>('mac')
  const scheme = writable<ColorScheme>('dark')
  const context: ThemeContext = setContext('naco', {
    os,
    scheme
  })

  const subscription = settingsStore.subscribe(({ ui, theme }) => {
    context.os.set(ui)
    if (theme === 'auto') {
      const isDark = window.matchMedia(prefersDarkMediaQuery).matches
      context.scheme.set(isDark ? 'dark' : 'light')
    } else {
      context.scheme.set(theme)
    }
  })

  return [context, subscription]
}
