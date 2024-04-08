import type ColorJS from 'colorjs.io'

/**
 * Formats number to 2-digit hex string
 * Example: 255 -> 'ff'
 */
export function formatHex (n: number): string {
  if (n < 0) {
    throw new Error(`Unexpected negative number ${n}`)
  }
  return n.toString(16).padStart(2, '0')
}

/**
 * Converts RGB object to hex string
 * Example: { R: 255, G: 255, B: 255 } -> '#ffffff'
 */
export function rgbToHex ({ R, G, B }: RGBColor): HexColor {
  if (R === undefined || G === undefined || B === undefined) {
    throw new Error(`Invalid RGB color: ${R}, ${G}, ${B}`)
  }
  return `#${formatHex(R)}${formatHex(G)}${formatHex(B)}`
}

/**
 * Converts RGB matrix to hex matrix
 * Example: [[255, 255, 255], [255, 255, 255]] -> [['#ffffff', '#ffffff']]
 */
export function rgbMatrixToHex (matrix: RGBColor[][]): HexColor[][] {
  return matrix.map(modeColors => modeColors.map(rgbToHex))
}

/**
 * Converts 6 digit hex color string to RGB object
 * Example: '#ffffff' -> { R: 255, G: 255, B: 255 }
 */
export function hexToRgb (hex: HexColor): RGBColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`)
  }
  return {
    R: parseInt(result[1], 16),
    G: parseInt(result[2], 16),
    B: parseInt(result[3], 16)
  }
}

/**
 * Converts RGB object to CSS color value
 * Example: { R: 255, G: 255, B: 255 } -> 'rgba(255, 255, 255, 1)'
 */
export function rgbToCSSProperty ({ R, G, B }: RGBColor, alpha = 1): string {
  return `rgba(${R}, ${G}, ${B}, ${alpha})`
}

/**
 * Converts ColorJS instance to RGB object
 * Example: new ColorJS('#ffffff') -> { R: 255, G: 255, B: 255 }
 */
export function colorJStoRGB (color: ColorJS): RGBColor {
  const { R, G, B } = color.srgb
  return {
    R: 255 * R,
    G: 255 * G,
    B: 255 * B
  }
}
