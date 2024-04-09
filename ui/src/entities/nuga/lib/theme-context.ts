import type { ColorScheme, OS, ThemeContext } from '@naco-ui/svelte'
import { prefersDarkMediaQuery } from '@naco-ui/svelte'
import {
  combine,
  createEvent,
  createStore,
  sample,
  type Store,
  type Subscription,
} from 'effector'
import { setContext } from 'svelte'
import { writable } from 'svelte/store'

import type { AppSettings } from '../model/types'

export function createPrefersDarkStore (): Store<boolean> {
  const colorSchemeChanged = createEvent<boolean>()
  const prefersDarkMedia = window.matchMedia(prefersDarkMediaQuery)
  const prefersDarkStore = createStore(prefersDarkMedia.matches)
  sample({
    clock: colorSchemeChanged,
    target: prefersDarkStore,
  })
  prefersDarkMedia.addEventListener('change', (e) => {
    colorSchemeChanged(e.matches)
  })

  return prefersDarkStore
}

export function themeContextFromSettings (
  settingsStore: Store<AppSettings>,
): [ThemeContext, Subscription] {
  const os = writable<OS>('mac')
  const scheme = writable<ColorScheme>('dark')
  const context: ThemeContext = setContext('naco', {
    os,
    scheme,
  })

  const prefersDarkStore = createPrefersDarkStore()

  const themeData = combine([prefersDarkStore, settingsStore])

  const subscription = themeData.subscribe(([isDark, settings]) => {
    context.os.set(settings.ui)
    if (settings.theme === 'auto') {
      context.scheme.set(isDark ? 'dark' : 'light')
    } else {
      context.scheme.set(settings.theme)
    }
  })

  return [context, subscription]
}
