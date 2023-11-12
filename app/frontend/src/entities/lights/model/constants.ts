import type { LightDomainMode, LightDomainState } from './types'

export const defaultDomainState: LightDomainState = {
  enabled: false,
  color: 1,
  speed: 2,
  brightness: 4,
  mode: 1
}

export const defaultColors = [
  '#F00',
  '#0F0',
  '#00F',
  '#FF0',
  '#F0F',
  '#0FF',
  '#FFF'
]

export const backlightDefaultColors: string[][] = Array(24).fill(defaultColors)

const defaultMode: LightDomainMode = {
  code: 1,
  supports: {
    specificColor: false,
    randomColor: false,
    speed: false
  },
  name: ''
}

export const defaultModes = Array(24).fill(defaultMode)
