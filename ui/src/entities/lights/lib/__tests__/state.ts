import { describe, expect, it } from 'vitest'

import type { RawLightState } from '../../model/types'
import { effectParamsToState, parseEffectParamsState } from '../state'

describe('effectParamsToState', () => {
  it('converts effect params to state', () => {
    const mode = 1
    const params = {
      color: 2,
      speed: 3,
      brightness: 4
    }
    expect(effectParamsToState(mode, params)).toStrictEqual({
      enabled: true,
      mode,
      color: 2,
      speed: 3,
      brightness: 4
    })
  })

  it('converts effect params to disabled state', () => {
    const mode = 0
    const params = {
      color: 1,
      speed: 2,
      brightness: 4
    }
    expect(effectParamsToState(mode, params)).toStrictEqual({
      enabled: false,
      mode: 1, // If mode is 0, then set disabled flag and set mode to 1
      color: 1,
      speed: 2,
      brightness: 4
    })
  })
})

describe('parseEffectParamsState', () => {
  it('converts state to effect params', () => {
    const state: RawLightState = {
      backlight: {
        mode: {
          code: 1,
          name: 'rainbow dash',
          features: 1
        },
        color: 2,
        speed: 3,
        brightness: 4
      },
      halo: {
        mode: {
          code: 1,
          name: 'rainbow dash',
          features: 1
        },
        color: 2,
        speed: 3,
        brightness: 4
      },
      sidelight: {
        mode: {
          code: 1,
          name: 'rainbow dash',
          features: 1
        },
        color: 2,
        speed: 3,
        brightness: 4
      },
      backlightParams: {
        color: 2,
        speed: 3,
        brightness: 4
      }
    }
    expect(parseEffectParamsState(state)).toStrictEqual({
      backlight: {
        enabled: true,
        mode: 1,
        color: 2,
        speed: 3,
        brightness: 4
      },
      halo: {
        enabled: true,
        mode: 1,
        color: 2,
        speed: 3,
        brightness: 4
      },
      sidelight: {
        enabled: true,
        mode: 1,
        color: 2,
        speed: 3,
        brightness: 4
      }
    })
  })
})
