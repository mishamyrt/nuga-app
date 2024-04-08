import { describe, expect, it } from 'vitest'

import type { LightDomainState } from '$entities/lights'

import { getAuxiliaryColor } from '../auxiliary'

describe('getAuxiliaryColor', () => {
  it('should return correct color', () => {
    const state: LightDomainState = {
      enabled: true,
      color: 0,
      mode: 0,
      speed: 0,
      brightness: 1,
    }
    const modes = [
      {
        name: 'mode1',
        code: 0,
        supports: { specificColor: true, randomColor: true, speed: true },
      },
    ]
    const color = getAuxiliaryColor(state, modes)
    expect(color).toBe('#ff0000')
  })

  it('should return random color', () => {
    const state: LightDomainState = {
      enabled: true,
      color: 7,
      mode: 0,
      speed: 0,
      brightness: 1,
    }
    const modes = [
      {
        name: 'mode1',
        code: 0,
        supports: { specificColor: true, randomColor: true, speed: true },
      },
    ]
    const color = getAuxiliaryColor(state, modes)
    expect(color).toBe('random')
  })

  it('should return transparent color if disabled', () => {
    const state: LightDomainState = {
      enabled: false,
      color: 0,
      mode: 0,
      speed: 0,
      brightness: 1,
    }
    const modes = [
      {
        name: 'mode1',
        code: 0,
        supports: { specificColor: true, randomColor: true, speed: true },
      },
    ]
    const color = getAuxiliaryColor(state, modes)
    expect(color).toBe('transparent')
  })

  it('should return random color if specificColor is not supported', () => {
    const state: LightDomainState = {
      enabled: true,
      color: 0,
      mode: 0,
      speed: 0,
      brightness: 1,
    }
    const modes = [
      {
        name: 'mode1',
        code: 0,
        supports: { specificColor: false, randomColor: true, speed: true },
      },
    ]
    const color = getAuxiliaryColor(state, modes)
    expect(color).toBe('random')
  })

  it('should throw if mode is not found', () => {
    const state: LightDomainState = {
      enabled: true,
      color: 0,
      mode: 1,
      speed: 0,
      brightness: 1,
    }
    const modes = [
      {
        name: 'mode1',
        code: 0,
        supports: { specificColor: true, randomColor: true, speed: true },
      },
    ]
    expect(() => getAuxiliaryColor(state, modes)).toThrow()
  })
})
