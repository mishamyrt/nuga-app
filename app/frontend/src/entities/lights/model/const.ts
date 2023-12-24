import type { SupportedKeyboards } from '$shared/model/constants'

import type { KeyboardLightsColor, KeyboardLightSupports, LightDomainMode, LightDomainState } from './types'

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

export const lightTemplates: Record<SupportedKeyboards, KeyboardLightSupports> = {
  Halo75: {
    backlight: true,
    sidelight: true,
    halolight: true
  },
  Halo65: {
    backlight: true,
    sidelight: true,
    halolight: true
  },
  Halo96: {
    backlight: true,
    sidelight: true,
    halolight: true
  }
}

export const defaultLightsColors: KeyboardLightsColor = {
  backlight: [],
  sidelight: 'transparent',
  halolight: 'transparent'
}
