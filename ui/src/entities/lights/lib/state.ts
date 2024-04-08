import type {
  LightColorIndex,
  LightDomainState,
  LightEffectParams,
  LightState,
  LightStateValue,
  RawLightState
} from '../model/types'
import { defaultDomainState } from './constants'

/**
 * Converts effect params and mode index to light domain state
 */
export function effectParamsToState (
  mode: number,
  params: LightEffectParams
): LightDomainState {
  const enabled = mode !== 0
  return {
    enabled,
    mode: enabled ? mode : 1,
    color: params.color as LightColorIndex,
    speed: params.speed as LightStateValue,
    brightness: params.brightness as LightStateValue
  }
}

/**
 * Convert backend light state to frontend
 */
export function parseEffectParamsState (state: RawLightState): LightState {
  return {
    backlight: state.backlightParams
      ? effectParamsToState(
        state.backlight.mode.code,
        state.backlightParams
      )
      : defaultDomainState,
    halo: effectParamsToState(state.halo.mode.code, state.halo),
    sidelight: effectParamsToState(state.sidelight.mode.code, state.sidelight)
  }
}
