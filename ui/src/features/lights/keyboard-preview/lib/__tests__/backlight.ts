import { describe, expect, it } from 'vitest'

import { buildTemplate } from '$entities/keys'
import { Halo65 } from '$entities/keys/lib/layouts'
import { backlightDefaultColors, type LightDomainState } from '$entities/lights'

import {
  renderBacklightColors,
  renderColorMatrix,
  renderGradientMatrix,
} from '../backlight'
import { RANDOM_GRADIENT_BOTTOM, RANDOM_GRADIENT_TOP } from '../constants'

describe('renderColorMatrix', () => {
  const template = buildTemplate(Halo65)
  it('should return correct matrix for color', () => {
    const result = renderColorMatrix(template, '#ff0000')
    result.forEach((row) => row.forEach((color) => expect(color).toBe('#ff0000')))
  })

  it('should return correct matrix for transparent', () => {
    const result = renderColorMatrix(template, 'transparent')
    result.forEach((row) =>
      row.forEach((color) => expect(color).toBe('transparent')),
    )
  })
})

describe('renderGradientMatrix', () => {
  const template = buildTemplate(Halo65)
  it('should return correct matrix', () => {
    const result = renderGradientMatrix(template)
    const firstColor = result[0][0]
    const lastColor = result[result.length - 1][result[result.length - 1].length - 1]

    expect(firstColor).toBe(RANDOM_GRADIENT_TOP)
    expect(lastColor).toBe(RANDOM_GRADIENT_BOTTOM)
  })
})

describe('renderBacklightColors', () => {
  const template = buildTemplate(Halo65)
  it('should return correct random matrix', () => {
    const state: LightDomainState = {
      enabled: true,
      color: 7,
      mode: 0,
      speed: 0,
      brightness: 1,
    }
    const result = renderBacklightColors(state, backlightDefaultColors, template)
    const firstColor = result[0][0]
    const lastColor = result[result.length - 1][result[result.length - 1].length - 1]
    expect(firstColor).toBe(RANDOM_GRADIENT_TOP)
    expect(lastColor).toBe(RANDOM_GRADIENT_BOTTOM)
  })

  it('should return correct color matrix', () => {
    const state: LightDomainState = {
      enabled: true,
      color: 0,
      mode: 0,
      speed: 0,
      brightness: 1,
    }
    const result = renderBacklightColors(state, backlightDefaultColors, template)
    result.forEach((row) => row.forEach((color) => expect(color).toBe('#ff0000')))
  })

  it('should return correct transparent matrix if disabled', () => {})
})
