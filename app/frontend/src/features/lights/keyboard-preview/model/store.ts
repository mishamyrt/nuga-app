import { combine, createEffect, createStore, sample } from 'effector'

import { appSettingsChanged } from '$entities/app'
import { keyboardTemplateStore, type KeyHighlightMatrix } from '$entities/keys'
import { backlightColorsStore, defaultColors, stateStore } from '$entities/lights'

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
  backlightColorsStore,
  keyboardTemplateStore
], ([state, backlightColors, keyboardTemplate]) => {
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

  return {
    backlight: backlightMatrix,
    sidelight: sidelight.enabled ? defaultColors[sidelight.color] : 'transparent',
    halolight: halo.enabled ? defaultColors[halo.color] : 'transparent'
  }
})
