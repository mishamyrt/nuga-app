import type { KeyboardTemplate } from '$entities/keys'
import { byModeCode, defaultColors, type KeyHighlightMatrix, type LightBacklightColors, type LightDomainMode, type LightDomainState } from '$entities/lights'

import { fillGradientMatrix, fillMatrix } from './matrix'

export function getBacklightColors (
  state: LightDomainState,
  colors: LightBacklightColors,
  template: KeyboardTemplate
): KeyHighlightMatrix {
  const { enabled, mode, color } = state
  const backlightMatrix: KeyHighlightMatrix = []

  if (!enabled || colors.length < mode || colors[mode].length < color) {
    backlightMatrix.push(...fillMatrix(template, 'transparent'))
  } else if (color === 7) {
    backlightMatrix.push(...fillGradientMatrix(template))
  } else {
    const hexColor = colors[mode][color]
    backlightMatrix.push(...fillMatrix(template, hexColor))
  }
  return backlightMatrix
}

export function getAuxiliaryColor (
  state: LightDomainState,
  modes: LightDomainMode[]
): string {
  const { enabled, color, mode: code } = state
  const mode = modes.find(byModeCode(code))
  if (!mode) {
    throw new Error('mode is not found')
  }
  const supports = mode.supports

  let cssColor = 'transparent'
  if (enabled) {
    if ((!supports.specificColor && supports.randomColor) || color === 7) {
      cssColor = 'random'
    } else {
      cssColor = defaultColors[color]
    }
  }
  return cssColor
}
