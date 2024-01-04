import type { SupportedKeyboards } from '$shared/model/constants'

import type { KeyboardLightsColor, KeyboardLightSupports, LightDomainMode, LightDomainState, LightModes, LightState } from './types'

export const defaultDomainState: LightDomainState = {
  enabled: false,
  color: 1,
  speed: 2,
  brightness: 4,
  mode: 1
}

export const defaultColors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFFFFF'
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

export const defaultModes = Array<LightDomainMode>(24).fill(defaultMode)

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

export const defaultLightState: LightState = {
  backlight: defaultDomainState,
  halo: defaultDomainState,
  sidelight: defaultDomainState
}

export const defaultLightModes: LightModes = {
  backlight: defaultModes,
  halo: defaultModes,
  sidelight: defaultModes
}
