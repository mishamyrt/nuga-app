function toHex (v: number): string {
  return v.toString(16).padStart(2, '0')
}

export function rgbToHex (r: number, g: number, b: number): RGBHexColor {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function hexToRgb (hex: RGBHexColor): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        R: parseInt(result[1], 16),
        G: parseInt(result[2], 16),
        B: parseInt(result[3], 16)
      }
    : null
}
