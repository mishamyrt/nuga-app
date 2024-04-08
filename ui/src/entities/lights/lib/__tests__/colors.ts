import ColorJS from 'colorjs.io'
import { describe, expect, it } from 'vitest'

import {
  colorJStoRGB,
  formatHex,
  hexToRgb,
  rgbMatrixToHex,
  rgbToCSSProperty,
  rgbToHex
} from '../colors'

describe('formatHex', () => {
  it('formats number to 2-digit hex string', () => {
    expect(formatHex(255)).toBe('ff')
    expect(formatHex(127)).toBe('7f')
    expect(formatHex(0)).toBe('00')
  })

  it('throws on negative number', () => {
    expect(() => formatHex(-1)).toThrow()
  })
})

describe('rgbToHex', () => {
  it('converts RGB object to hex string', () => {
    expect(rgbToHex({ R: 255, G: 255, B: 255 })).toBe('#ffffff')
    expect(rgbToHex({ R: 0, G: 0, B: 0 })).toBe('#000000')
    expect(rgbToHex({ R: 255, G: 0, B: 0 })).toBe('#ff0000')
    expect(rgbToHex({ R: 0, G: 255, B: 0 })).toBe('#00ff00')
  })

  it('throws on invalid RGB object', () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const invalidColor = { R: 255, G: 255 } as RGBColor
    expect(() => rgbToHex(invalidColor)).toThrow()
  })
})

describe('rgbMatrixToHex', () => {
  it('converts RGB matrix to hex matrix', () => {
    const input: RGBColor[][] = [
      [{ R: 255, G: 255, B: 255 }, { R: 255, G: 255, B: 255 }],
      [{ R: 0, G: 0, B: 0 }, { R: 0, G: 0, B: 0 }],
      [{ R: 255, G: 0, B: 0 }, { R: 0, G: 255, B: 0 }]
    ]
    expect(rgbMatrixToHex(input)).toStrictEqual([
      ['#ffffff', '#ffffff'],
      ['#000000', '#000000'],
      ['#ff0000', '#00ff00']
    ])
  })

  it('return empty matrix on empty input', () => {
    expect(rgbMatrixToHex([])).toStrictEqual([])
  })
})

describe('hexToRgb', () => {
  it('converts 6 digit hex color string to RGB object', () => {
    expect(hexToRgb('#ffffff')).toStrictEqual({ R: 255, G: 255, B: 255 })
    expect(hexToRgb('#000000')).toStrictEqual({ R: 0, G: 0, B: 0 })
    expect(hexToRgb('#ff0000')).toStrictEqual({ R: 255, G: 0, B: 0 })
    expect(hexToRgb('#00ff00')).toStrictEqual({ R: 0, G: 255, B: 0 })
  })

  it('throws on invalid hex color string', () => {
    expect(() => hexToRgb('#ffffffg')).toThrow()
  })
})

describe('rgbToCSSProperty', () => {
  it('converts RGB object to CSS color value with alpha', () => {
    expect(rgbToCSSProperty({
      R: 255,
      G: 255,
      B: 255
    }, 0.5)).toBe('rgba(255, 255, 255, 0.5)')
    expect(rgbToCSSProperty({
      R: 0,
      G: 0,
      B: 0
    }, 1)).toBe('rgba(0, 0, 0, 1)')
  })

  it('converts RGB object to CSS color value without alpha', () => {
    expect(rgbToCSSProperty({
      R: 255,
      G: 255,
      B: 255
    })).toBe('rgba(255, 255, 255, 1)')
    expect(rgbToCSSProperty({
      R: 0,
      G: 0,
      B: 0
    })).toBe('rgba(0, 0, 0, 1)')
  })
})

describe('colorJStoRGB', () => {
  it('converts ColorJS instance to RGB object', () => {
    const color = new ColorJS('#ff00ff')
    expect(colorJStoRGB(color)).toStrictEqual({ R: 255, G: 0, B: 255 })
  })

  it('throws on invalid ColorJS instance', () => {
    expect(() => colorJStoRGB({} as unknown as ColorJS)).toThrow()
  })
})
