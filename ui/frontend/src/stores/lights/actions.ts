import type { MapStore } from 'nanostores'
import { GetLightState, GetModes, SetHalo, SetBacklight, SetSidelight, GetBacklightParams, GetMacColors, SetBacklightColor } from '../../../wailsjs/go/main/App'
import type { Color, EffectParams, LightMode, LightSetter, LightState } from './types'
import { backlightColors, changingColor, modes, state } from './stores'
import { defaultState } from './defaults'

function mapModes (m: any[]) {
  return m
    .filter(i => i.Code !== 0)
    .map(i => ({
      name: i.Name,
      features: i.Features,
      code: i.Code
    }))
}

function parseEffect (mode: number, params: EffectParams) {
  const enabled = mode !== 0
  return {
    enabled,
    mode: enabled ? mode : 1,
    color: params.Color,
    speed: params.Speed,
    brightness: params.Brightness,
  }
}

async function setLight(store: MapStore<LightState>, apply: LightSetter) {
  const state = store.get()
  await apply(
    state.enabled ? state.mode : 0,
    state.color,
    state.brightness,
    state.speed
  )
}

export async function setBacklight() {
  return setLight(state.backlight, SetBacklight)
}

export async function setHalo() {
  return setLight(state.halo, SetHalo)
}

export async function setSidelight() {
  return setLight(state.sidelight, SetSidelight)
}

export async function loadModes () {
  const appModes = await GetModes()
  modes.backlight.set(mapModes(appModes.Backlight))
  modes.halo.set(mapModes(appModes.Halo))
  modes.sidelight.set(mapModes(appModes.Sidelight))
}

export async function loadState () {
  const current = await GetLightState()
  const backlightParams: EffectParams = await GetBacklightParams()
  if (backlightParams) {
    state.backlight.set(
      parseEffect(current.Backlight.Mode.Code, backlightParams)
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

export async function loadColors() {
  const colors = await GetMacColors()
  backlightColors.set(colors)
}

export async function setBacklightColor(rgb: Color) {
  const colorIndex = changingColor.get()
  const mode = state.backlight.get().mode
  await SetBacklightColor(mode, colorIndex, rgb)
  await loadColors()
}

