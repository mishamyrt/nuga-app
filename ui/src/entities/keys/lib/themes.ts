import type { KeyboardTheme } from '../model/types'

export const defaultTheme: KeyboardTheme = {
  dark: {
    dark: '#4b4b4b',
    light: '#5b5b5b',
    mint: '#4ebb8e',
    orange: '#ee6936',
    yellow: '#cfaf05',
    textDark: '#fafafa',
    textLight: '#fafafa',
  },
  light: {
    dark: '#c8c8c8',
    light: '#ffffff',
    mint: '#69fcb7',
    orange: '#ff7a46',
    yellow: '#ffd600',
    textDark: '#292929',
    textLight: '#292929',
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

export const keyboardThemes = {
  defaultTheme,
  lightGrayAndWhiteTheme,
}

export type KeyboardThemeName = keyof typeof keyboardThemes
