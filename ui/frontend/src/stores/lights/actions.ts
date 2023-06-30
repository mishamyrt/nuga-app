import type { MapStore } from 'nanostores'
import { GetLightState, GetModes, SetHalo, SetBacklight, SetSidelight, GetBacklightParams, GetMacColors } from '../../../wailsjs/go/main/App'
import type { EffectParams, LightMode, LightSetter, LightState } from './types'
import { backlightColors, modes, state } from './stores'

const mapModes = (m: any[]) => m.map(i => ({
  name: i.Name,
  features: i.Features,
  code: i.Code
}))

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
    state.backlight.set({
      enabled: current.Backlight.Mode.Code !== 0,
      color: backlightParams.Color,
      speed: backlightParams.Speed,
      brightness: backlightParams.Brightness,
      mode: current.Backlight.Mode.Code,
    })
  } else {
    state.backlight.set({
      enabled: false,
      color: 4,
      speed: 4,
      brightness: 4,
      mode: 1,
    })
  }

  state.halo.set({
    enabled: current.Halo.Mode.Code !== 0,
    color: current.Halo.Params.Color,
    speed: current.Halo.Params.Speed,
    brightness: current.Halo.Params.Brightness,
    mode: current.Halo.Mode.Code,
  })
  state.sidelight.set({
    enabled: current.Sidelight.Mode.Code !== 0,
    color: current.Sidelight.Params.Color,
    speed: current.Sidelight.Params.Speed,
    brightness: current.Sidelight.Params.Brightness,
    mode: current.Sidelight.Mode.Code,
  })
}

export async function loadColors() {
  const colors = await GetMacColors()
  backlightColors.set(colors)
}
