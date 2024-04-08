import {
  byModeCode,
  defaultColors,
  type LightDomainMode,
  type LightDomainState
} from '$entities/lights'

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
