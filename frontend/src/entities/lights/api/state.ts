import { dto } from '$wailsjs/go/models'
import { GetLightState, SetLightState } from '$wailsjs/go/usecase/LightsUsecase'

import { defaultDomainState } from '../model/const'
import type { LightState } from '../model/types'
import { parseEffect } from '../utils'

export async function getLightState (): Promise<LightState> {
  const state = await GetLightState()
  return {
    backlight: state.backlightParams
      ? parseEffect(
        state.backlight.mode.code,
        state.backlightParams
      )
      : defaultDomainState,
    halo: parseEffect(state.halo.mode.code, state.halo),
    sidelight: parseEffect(state.sidelight.mode.code, state.sidelight)
  }
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
