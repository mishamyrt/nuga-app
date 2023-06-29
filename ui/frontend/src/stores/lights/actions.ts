import type { MapStore } from 'nanostores'
import { GetLightState, GetModes, SetHalo, SetBacklight, SetSidelight, GetBacklightParams } from '../../../wailsjs/go/main/App'
import type { EffectParams, LightMode, LightSetter, LightState } from './types'
import { modes, state } from './stores'

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
  return setLight(state.backlight, SetHalo)
}

export async function setSidelight() {
  return setLight(state.backlight, SetSidelight)
}

export async function loadModes () {
  const appModes = await GetModes()
  modes.backlight.set(mapModes(appModes.Backlight))
  modes.halo.set(mapModes(appModes.Halo))
  modes.sidelight.set(mapModes(appModes.Sidelight))
}

export const loadState = async () => {
  const current = await GetLightState()
  const backlightParams: EffectParams = await GetBacklightParams()
  state.backlight.set({
    enabled: current.Backlight.Mode.Code !== 0,
    color: backlightParams.Color,
    speed: backlightParams.Speed,
    brightness: backlightParams.Brightness,
    mode: current.Backlight.Mode.Code,
  })
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
