import type ColorJS from 'colorjs.io'

import type { LightDomainMode } from '.'

/**
 * Converts RGB object to CSS color value
 * @param color - RGB object.
 * @param opacity - Optional alpha, defaults to 1.
 * @returns
 */
export function rgbToCSSProperty (color: RGBColor, alpha = 1): string {
  const { R, G, B } = color
  return `rgba(${R}, ${G}, ${B}, ${alpha})`
}

/**
 * Converts ColorJS instance to RGB object
 * @param color - ColorJS instance.
 */
export function colorJStoRGB (color: ColorJS): RGBColor {
  const { R, G, B } = color.srgb
  return {
    R: 255 * R,
    G: 255 * G,
    B: 255 * B
  }
}

/**
 * Converts hex color string to RGB object.
 * @param hex - color string.
 */
export function hexToRGB (hex: string): RGBColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new TypeError(`Wrong hex color format ${hex}`)
  }
  return {
    R: parseInt(result[1], 16),
    G: parseInt(result[2], 16),
    B: parseInt(result[3], 16)
  }
}

/**
 * Utility to search mode by code.
 * Usage: modes.backlight.find(byModeCode(4))
 * @param code - mode code.
 */
export function byModeCode (code: number) {
  return (mode: LightDomainMode) => mode.code === code
}
