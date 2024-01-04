import { combine } from 'effector'

import { keyboardTemplateStore } from '$entities/keys'
import { backlightColorsStore, modesStore, stateStore } from '$entities/lights'

import { defaultLightsColors } from './const'
import { getAuxiliaryColor, getBacklightColors } from './utils/colors'

export const keyboardLightsColorStore = combine([
  stateStore,
  modesStore,
  backlightColorsStore,
  keyboardTemplateStore
], ([state, modes, backlightColors, keyboardTemplate]) => {
  if (backlightColors.length === 0 || keyboardTemplate.columns === 0) {
    return defaultLightsColors
  }
  const backlightMatrix = getBacklightColors(state.backlight, backlightColors, keyboardTemplate)
  const haloColor = getAuxiliaryColor(state.halo, modes.halo)
  const sidelightColor = getAuxiliaryColor(state.sidelight, modes.sidelight)

  return {
    backlight: backlightMatrix,
    sidelight: sidelightColor,
    halolight: haloColor
  }
})
