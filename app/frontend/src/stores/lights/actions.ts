
import { StateSynchronizer } from '@stores/synchronizer'
import { nuga } from '@wailsjs/go/models'
import { GetBacklightColors, GetLightModes, GetLightState, SetBacklightColor, SetLightState } from '@wailsjs/go/nuga/App'
import equals from 'deep-equal'
import { task } from 'nanostores'

import { backlightColors, lightModes, lightState } from './atoms'
import type { Color, LightDomain, LightState } from './types'
import { mapModes, parseEffect } from './utils'

export const synchronizer = new StateSynchronizer(1000)

export function initLights (): void {
  task(async () => {
    await Promise.all([
      loadColors(),
      loadModes()
    ])
    await loadState()
  })
}

export function clearLightsData (): void {
  backlightColors.set([])
  lightModes.set({
    backlight: [],
    sidelight: [],
    halo: []
  })
}

export function setLight (domain: LightDomain, state: LightState): void {
  lightState.setKey(domain, state)
  const nextState = {
    ...lightState.get(),
    [domain]: state
  }
  if (!state.enabled) {
    nextState[domain].mode = 0
  }
  synchronizer.addTask(async () => {
    await SetLightState(
      nuga.LightStateRequest.createFrom(nextState)
    )
  })
}

export async function loadState (): Promise<void> {
  const loadedState = await GetLightState()
  const activeState = lightState.get()
  const nextState = { ...activeState }
  if (loadedState.backlightParams) {
    nextState.backlight = parseEffect(
      loadedState.backlight.mode.code,
      loadedState.backlightParams
    )
  }
  nextState.halo = parseEffect(loadedState.halo.mode.code, loadedState.halo)
  nextState.sidelight = parseEffect(loadedState.sidelight.mode.code, loadedState.sidelight)
  if (!equals(nextState, activeState)) {
    lightState.set(nextState)
  }
}

async function loadModes (): Promise<void> {
  const items = await GetLightModes()
  const modesMap = items.reduce<Record<string, any>>((acc, domain) => {
    return {
      ...acc,
      [domain.name.toLowerCase()]: mapModes(domain.modes)
    }
  }, {})
  console.log({ modesMap })
  lightModes.set(modesMap)
}

async function loadColors (): Promise<void> {
  const colors = await GetBacklightColors()
  backlightColors.set(colors)
}

export async function setBacklightColor (
  modeIndex: number,
  colorIndex: number,
  rgb: Color
): Promise<void> {
  if (modeIndex === 7) {
    throw new Error('Attempting to edit Random color')
  }
  synchronizer.addTask(async () => {
    await SetBacklightColor(modeIndex, colorIndex, rgb)
    await loadColors()
  })
}
