import ColorJS from 'colorjs.io'

import type { ColorMap, KeyboardTemplate } from './types'

const GRADIENT_TOP = '#0578FF'
const GRADIENT_BOTTOM = '#FF014D'

export function createGradientMap (template: KeyboardTemplate): ColorMap {
  const color = new ColorJS(GRADIENT_TOP)
  const gradient = color.range(GRADIENT_BOTTOM, {
    space: 'lch',
    outputSpace: 'srgb'
  })
  const rows: string[][] = []
  for (let i = 0; i < template.keys.length; i++) {
    const row = Array(template.keys[i].length)
    const progress = i / (template.keys.length - 1)
    const rowColor = gradient(progress).toString()
    for (let j = 0; j < template.keys[i].length; j++) {
      row[j] = rowColor
    }
    rows.push(row)
  }
  return rows
}
