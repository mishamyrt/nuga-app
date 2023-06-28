import {
  atom,
  map,
  computed,
  type WritableAtom,
  type ReadableAtom,
  task,
  action,
} from 'nanostores'
import { GetBacklightModes, GetLightState, GetBacklightState, GetHaloModes, SetHalo, SetBacklight, GetSidelightModes, SetSidelight } from '../../wailsjs/go/main/App'

export interface LightState {
  color: number
  speed: number
  brightness: number
  mode: number
  enabled: boolean
}

export interface LightMode {
  code: number
  features: number
  name: string
}

export interface EffectParams {
  Color: number
  Speed: number
  Brightness: number
}

export const backlight = map<LightState>({
  color: 0,
  speed: 4,
  brightness: 4,
  mode: 0,
  enabled: false
})

export const setBacklightEffect = action(backlight, 'setEffect', async store => {
  const state = store.get()
  await SetBacklight(
    state.enabled ? state.mode : 0,
    state.color,
    state.brightness,
    state.speed
  )
})

export const backlightModes = atom<LightMode[]>([])

const fetchBacklightModes = action(backlightModes, 'sync', async store => {
  const modes = await GetBacklightModes()
  const formattedModes: LightMode[]= modes.map(i => ({
    name: i.Name,
    features: i.Features,
    code: i.Code
  }))
  store.set(formattedModes)
})

export const halo = map<LightState>({
  color: 0,
  speed: 4,
  brightness: 4,
  mode: 0,
  enabled: false
})

export const setHaloEffect = action(halo, 'setEffect', async store => {
  const state = store.get()
  await SetHalo(
    state.enabled ? state.mode : 0,
    state.color,
    state.brightness,
    state.speed
  )
})

export const haloModes = atom<LightMode[]>([])

const fetchHaloModes = action(haloModes, 'sync', async store => {
  const modes = await GetHaloModes()
  const formattedModes: LightMode[]= modes.map(i => ({
    name: i.Name,
    features: i.Features,
    code: i.Code
  }))
  store.set(formattedModes)
})

export const sidelight = map<LightState>({
  color: 0,
  speed: 4,
  brightness: 4,
  mode: 0,
  enabled: false
})

export const sidelightModes = atom<LightMode[]>([])

const fetchSidelightModes = action(sidelightModes, 'sync', async store => {
  const modes = await GetSidelightModes()
  const formattedModes: LightMode[]= modes.map(i => ({
    name: i.Name,
    features: i.Features,
    code: i.Code
  }))
  store.set(formattedModes)
})

export const setSidelightEffect = action(sidelight, 'setEffect', async store => {
  const state = store.get()
  await SetSidelight(
    state.enabled ? state.mode : 0,
    state.color,
    state.brightness,
    state.speed
  )
})

export const fetchModes = async () => {
  await fetchBacklightModes()
  await fetchHaloModes()
  await fetchSidelightModes()
}

export const fetchState = async () => {
  const state = await GetLightState()
  const backlightParams: EffectParams = await GetBacklightState()
  backlight.set({
    enabled: state.Backlight.Mode.Code !== 0,
    color: backlightParams.Color,
    speed: backlightParams.Speed,
    brightness: backlightParams.Brightness,
    mode: state.Backlight.Mode.Code,
  })
  halo.set({
    enabled: state.Halo.Mode.Code !== 0,
    color: state.Halo.Params.Color,
    speed: state.Halo.Params.Speed,
    brightness: state.Halo.Params.Brightness,
    mode: state.Halo.Mode.Code,
  })
  sidelight.set({
    enabled: state.Sidelight.Mode.Code !== 0,
    color: state.Sidelight.Params.Color,
    speed: state.Sidelight.Params.Speed,
    brightness: state.Sidelight.Params.Brightness,
    mode: state.Sidelight.Mode.Code,
  })
}
// [Log] Object (lights.ts, line 31)

// Backlight: {Mode: {Name: "Rainbow wheel", Code: 6, Features: 7}, Params: Array}

// Halo: {Mode: {Name: "Rainbow wheel", Code: 1, Features: 4}, Params: {Color: 0, Speed: 0, Brightness: 4}}

// Sidelight: {Mode: {Name: "Rainbow", Code: 2, Features: 4}, Params: {Color: 0, Speed: 0, Brightness: 4}}

// Object Prototype
