import type { KeyboardTheme } from '../model/types'

export const defaultDarkTheme: KeyboardTheme = {
  dark: {
    dark: '#6b6b6b',
    light: '#c4c4c4',
    mint: '#46d79b',
    orange: '#e27950',
    yellow: '#c3a400',
    textDark: '#000000',
    textLight: '#ffffff',
  },
  light: {
    dark: '#5c5c5c',
    light: '#ffffff',
    mint: '#36fb9e',
    orange: '#ff6d34',
    yellow: '#ffd600',
    textDark: '#000000',
    textLight: '#ffffff',
  },
}

export const defaultLightTheme: KeyboardTheme = {
  dark: {
    ...defaultDarkTheme.dark,
    dark: defaultDarkTheme.dark.light,
    textLight: defaultDarkTheme.dark.textDark,
  },
  light: {
    ...defaultDarkTheme.light,
    dark: defaultDarkTheme.light.light,
    textLight: defaultDarkTheme.light.textDark,
  },
}

export const lightGrayAndWhiteTheme: KeyboardTheme = {
  dark: {
    dark: '#adadad',
    light: '#cfcfcf',
    mint: '#e86c6c',
    orange: '#e86c6c',
    yellow: '#cfcfcf',
    textDark: '#000000',
    textLight: '#000000',
  },
  light: {
    dark: '#d1d1d1',
    light: '#ffffff',
    mint: '#ff8585',
    orange: '#ff8585',
    yellow: '#ffffff',
    textDark: '#000000',
    textLight: '#000000',
  },
}

export const adaptiveTheme: KeyboardTheme = {
  dark: {
    dark: '#525252',
    light: '#6a6a6a',
    mint: '#d57700',
    orange: '#d57700',
    yellow: '#525252',
    textDark: '#ededed',
    textLight: '#ededed',
  },
  light: {
    dark: '#dbdbdb',
    light: '#ffffff',
    mint: '#fecd3d',
    orange: '#fecd3d',
    yellow: '#dbdbdb',
    textDark: '#131313',
    textLight: '#131313',
  },
}

export const keyboardThemes = {
  defaultDarkTheme,
  defaultLightTheme,
  lightGrayAndWhiteTheme,
  adaptiveTheme,
}

export type KeyboardThemeName = keyof typeof keyboardThemes
