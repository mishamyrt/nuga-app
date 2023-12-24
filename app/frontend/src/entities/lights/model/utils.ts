import type ColorJS from 'colorjs.io'

export function toCSSProperty (color: RGBColor, opacity = 1): string {
  const { R, G, B } = color
  return `rgba(${R}, ${G}, ${B}, ${opacity})`
}

export function toRGBColor (color: ColorJS): RGBColor {
  const { R, G, B } = color.srgb
  return {
    R: 255 * R,
    G: 255 * G,
    B: 255 * B
  }
}

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
