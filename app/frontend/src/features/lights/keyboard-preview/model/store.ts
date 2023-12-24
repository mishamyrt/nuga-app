import { combine, createEffect, createStore, sample } from 'effector'

import { appSettingsChanged } from '$entities/app'
import { keyboardTemplateStore, type KeyHighlightMatrix } from '$entities/keys'
import { backlightColorsStore, defaultColors, modesStore, stateStore } from '$entities/lights'

import { defaultLightsColors } from './const'
import { fillGradientMatrix, fillMatrix } from './utils/matrix'
import { getToolbarBackground } from './utils/toolbar-background'

export const toolbarBackgroundStore = createStore<string>('', {
  name: 'toolbarBackgroundStore'
})
const getToolbarBackgroundFx = createEffect(getToolbarBackground)

toolbarBackgroundStore.on(getToolbarBackgroundFx.doneData, (_, background) => background)
sample({
  clock: appSettingsChanged,
  target: getToolbarBackgroundFx
})

export const keyboardLightsColorStore = combine([
  stateStore,
  modesStore,
  backlightColorsStore,
  keyboardTemplateStore
], ([state, modes, backlightColors, keyboardTemplate]) => {
  if (backlightColors.length === 0 || keyboardTemplate.columns === 0) {
    return defaultLightsColors
  }
  const { sidelight, halo, backlight } = state
  const backlightMatrix: KeyHighlightMatrix = []
  if (!backlight.enabled || backlightColors.length < backlight.mode || backlightColors[backlight.mode].length < backlight.color) {
    backlightMatrix.push(...fillMatrix(keyboardTemplate, 'transparent'))
  } else if (backlight.color === 7) {
    backlightMatrix.push(...fillGradientMatrix(keyboardTemplate))
  } else {
    const color = backlightColors[backlight.mode][backlight.color]
    backlightMatrix.push(...fillMatrix(keyboardTemplate, color))
  }

  const haloSupports = modes.halo[state.halo.mode].supports
  let haloColor = 'transparent'
  if (halo.enabled) {
    if ((!haloSupports.specificColor && haloSupports.randomColor) || state.halo.color === 7) {
      haloColor = 'random'
    } else {
      haloColor = defaultColors[halo.color]
    }
  }

  const sidelightSupports = modes.sidelight[state.sidelight.mode].supports
  let sidelightColor = 'transparent'
  if (sidelight.enabled) {
    if ((!sidelightSupports.specificColor && sidelightSupports.randomColor) || state.sidelight.color === 7) {
      sidelightColor = 'random'
    } else {
      sidelightColor = defaultColors[sidelight.color]
    }
  }

  return {
    backlight: backlightMatrix,
    sidelight: sidelightColor,
    halolight: haloColor
  }
})
