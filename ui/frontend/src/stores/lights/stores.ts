import { atom, map } from "nanostores"
import type { LightMode, LightState } from "./types"

const defaultState: LightState = {
  enabled: false,
  mode: 0,
  color: 0,
  speed: 4,
  brightness: 4
}

export const state = {
  backlight: map<LightState>({...defaultState}),
  sidelight: map<LightState>({...defaultState}),
  halo: map<LightState>({...defaultState})
}

export const modes = {
  backlight: atom<LightMode[]>([]),
  sidelight: atom<LightMode[]>([]),
  halo: atom<LightMode[]>([])
}
