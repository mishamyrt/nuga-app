import type { MapStore } from 'nanostores'
import {
  GetLightState,
  GetModes,
  SetHalo,
  SetBacklight,
  SetSidelight,
  GetMacColors,
  SetBacklightColor
} from '../../../wailsjs/go/main/App'
import type { Color, EffectParams, LightMode, LightSetter, LightState } from './types'
import { backlightColors, changingColor, modes, state } from './stores'
import { defaultState } from './defaults'
import { UpdateSynchronizer } from './synchronizer'
import { capitalize } from '@utils/strings'

export const sync = new UpdateSynchronizer(1000)

function mapModes (m: any[]): LightMode[] {
  return m
    .filter(i => i.Code !== 0)
    .map(i => ({
      name: capitalize(i.Name),
      features: i.Features,
      code: i.Code
    }))
}

function parseEffect (mode: number, params: EffectParams): LightState {
  const enabled = mode !== 0
  return {
    enabled,
    mode: enabled ? mode : 1,
    color: params.Color,
    speed: params.Speed,
    brightness: params.Brightness
  }
}

function setLight (store: MapStore<LightState>, apply: LightSetter): void {
  const state = store.get()
  sync.addTask(async () => {
    await apply(
      state.enabled ? state.mode : 0,
      state.color,
      state.brightness,
      state.speed
    )
  })
}

export function setBacklight (): void {
  return setLight(state.backlight, SetBacklight)
}

export function setHalo (): void {
  return setLight(state.halo, SetHalo)
}

export function setSidelight (): void {
  return setLight(state.sidelight, SetSidelight)
}

export async function loadModes (): Promise<void> {
  const appModes = await GetModes()
  modes.backlight.set(mapModes(appModes.Backlight))
  modes.halo.set(mapModes(appModes.Halo))
  modes.sidelight.set(mapModes(appModes.Sidelight))
}

export async function loadState (): Promise<void> {
  const current = await GetLightState()
  if (current.BacklightParams) {
    state.backlight.set(
      parseEffect(current.Backlight.Mode.Code, current.BacklightParams)
    )
  } else {
    state.backlight.set(defaultState)
  }

  state.halo.set(
    parseEffect(current.Halo.Mode.Code, current.Halo.Params)
  )

  state.sidelight.set(
    parseEffect(current.Sidelight.Mode.Code, current.Sidelight.Params)
  )
}

export async function loadColors (): Promise<void> {
  const colors = await GetMacColors()
  backlightColors.set(colors)
}

export async function setBacklightColor (rgb: Color): Promise<void> {
  const colorIndex = changingColor.get()
  if (!colorIndex) {
    return
  }
  const mode = state.backlight.get().mode
  await SetBacklightColor(mode, colorIndex, rgb)
  await loadColors()
}
