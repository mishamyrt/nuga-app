import { dto } from '$wails/go/models'
import { GetLightState, SetLightState } from '$wails/go/usecase/LightsUsecase'

import type { LightState, RawLightState } from '../model/types'

export async function getLightState (): Promise<RawLightState> {
  const state = await GetLightState()
  return state
}

export async function setLightState (s: LightState): Promise<void> {
  const state = structuredClone(s)
  if (!state.backlight.enabled) {
    state.backlight.mode = 0
  }
  if (!state.sidelight.enabled) {
    state.sidelight.mode = 0
  }
  if (!state.halo.enabled) {
    state.halo.mode = 0
  }
  await SetLightState(
    dto.LightStateRequest.createFrom(state)
  )
}
