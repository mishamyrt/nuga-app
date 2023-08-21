/**
 * All Views in the application
 */
export type AppView =
  'lights' |
  'device' |
  'keys' |
  'application'

/**
 * Operating systems supported by the GUI
 */
export type OS = 'linux' | 'mac'

export type Theme = 'light' | 'dark'

export interface WindowAppearance {
  os: OS
  theme: Theme
}
