import type { Color } from '@stores/lights'
import type ColorJS from 'colorjs.io'

export function toRGB (color: Color): string {
  const { R, G, B } = color
  return `rgb(${R}, ${G}, ${B})`
}

export function toColor (color: ColorJS): Color {
  const { R, G, B } = color.srgb
  return {
    R: 255 * R,
    G: 255 * G,
    B: 255 * B
  }
}
