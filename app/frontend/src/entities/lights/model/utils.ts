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
