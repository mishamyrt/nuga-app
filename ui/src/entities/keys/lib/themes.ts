import type { KeyboardTheme } from '../model/types'

const defaultTheme: KeyboardTheme = {
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

const lightGrayAndWhiteTheme: KeyboardTheme = {
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

const matchaTheme: KeyboardTheme = {
  dark: {
    dark: '#454b42',
    light: '#5b6258',
    mint: '#454b42',
    orange: '#454b42',
    yellow: '#5b6258',
    textDark: '#dcffcd',
    textLight: '#dcffcd',
  },
  light: {
    dark: '#cce3b2',
    light: '#fcfff1',
    mint: '#cce3b2',
    orange: '#cce3b2',
    yellow: '#fcfff1',
    textDark: '#3d5423',
    textLight: '#3d5423',
  },
}

export const keyboardThemes = {
  defaultTheme,
  lightGrayAndWhiteTheme,
  matchaTheme,
}

export type KeyboardThemeName = keyof typeof keyboardThemes
