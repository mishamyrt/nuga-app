import { combine, createEffect, createStore, sample } from 'effector'

import { appSettingsChanged } from '$entities/app'
import { keyboardTemplateStore } from '$entities/keys'
import { backlightColorsStore, modesStore, stateStore } from '$entities/lights'

import { defaultLightsColors } from './const'
import { getAuxiliaryColor, getBacklightColors } from './utils/colors'
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
  const backlightMatrix = getBacklightColors(state.backlight, backlightColors, keyboardTemplate)
  const haloColor = getAuxiliaryColor(state.halo, modes.halo)
  const sidelightColor = getAuxiliaryColor(state.sidelight, modes.sidelight)

  return {
    backlight: backlightMatrix,
    sidelight: sidelightColor,
    halolight: haloColor
  }
})
