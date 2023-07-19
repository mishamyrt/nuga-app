import type { MapStore } from 'nanostores'
import {
  GetLightState,
  GetLightDomains,
  SetHalo,
  SetBacklight,
  SetSidelight,
  GetMacColors,
  SetBacklightColor
} from '../../../wailsjs/go/nuga/App'
import type { Color, EffectParams, LightMode, LightSetter, LightState } from './types'
import { backlightColors, changingColor, domains, state } from './stores'
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

export async function loadDomains (): Promise<void> {
  const items = await GetLightDomains()
  const domainsMap = items.reduce<Record<string, any>>((acc, domain) => {
    return {
      ...acc,
      [domain.Name]: mapModes(domain.Modes)
    }
  }, {})
  console.log(domainsMap)
  if (domainsMap?.Backlight.length > 0) {
    domains.backlight.set(domainsMap.Backlight)
  }
  if (domainsMap?.Halo.length > 0) {
    domains.halo.set(domainsMap.Halo)
  }
  if (domainsMap?.Sidelight.length > 0) {
    domains.sidelight.set(domainsMap.Sidelight)
  }
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
