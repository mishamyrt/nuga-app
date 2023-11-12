import { nuga } from '$wailsjs/go/models'
import { GetLightState, SetLightState } from '$wailsjs/go/nuga/App'

import { defaultDomainState } from '../model/constants'
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

export async function setLightState (state: LightState): Promise<void> {
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
    nuga.LightStateRequest.createFrom(state)
  )
}
