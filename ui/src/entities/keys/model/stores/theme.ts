import { combine, createEvent, createStore } from 'effector'

import { type KeyboardThemeName, keyboardThemes } from '../../lib/themes'

export const keyboardThemeUpdated = createEvent<KeyboardThemeName>('keyboardThemeUpdated')

export const keyboardThemeNameStore = createStore<KeyboardThemeName>('defaultDarkTheme', {
  name: 'keyboardThemeName'
})
export const keyboardThemeStore = combine(keyboardThemeNameStore, (theme) => keyboardThemes[theme])

keyboardThemeNameStore.on(keyboardThemeUpdated, (_, theme) => theme)
