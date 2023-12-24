import type ColorJS from 'colorjs.io'

export function toRGBProperty (color: RGBColor): string {
  const { R, G, B } = color
  return `rgb(${R}, ${G}, ${B})`
}

export function toColor (color: ColorJS): RGBColor {
  const { R, G, B } = color.srgb
  return {
    R: 255 * R,
    G: 255 * G,
    B: 255 * B
  }
}
