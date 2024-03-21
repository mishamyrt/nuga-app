export type LightColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type LightStateValue = 0 | 1 | 2 | 3 | 4

export type LightDomain = 'backlight' | 'sidelight' | 'halo'

export type LightDomainState = {
  color: LightColorIndex
  speed: LightStateValue
  brightness: LightStateValue
  mode: number
  enabled: boolean
}

export type LightDomainColors = RGBHexColor[]
export type LightBacklightColors = RGBHexColor[][]

export type LightDomainMode = {
  code: number
  supports: {
    specificColor: boolean
    randomColor: boolean
    speed: boolean
  }
  name: string
}

export type LightEffectParams = {
  color: number
  speed: number
  brightness: number
}

export type LightState = Record<LightDomain, LightDomainState>

export type LightModes = Record<LightDomain, LightDomainMode[]>

export type KeyHighlightMatrix = RGBHexColor[][]

export type LightDomainStateValue<T extends keyof LightDomainState> = {
  domain: LightDomain
} & Pick<LightDomainState, T>

export type KeyboardLightSupports = {
  sidelight: boolean
  halolight: boolean
  backlight: boolean
}

export type KeyboardLightsColor = {
  sidelight: RGBHexColor
  halolight: RGBHexColor
  backlight: KeyHighlightMatrix
}

export type SetBacklightColorParams = {
  mode: number
  colorIndex: number
  color: RGBColor
}
