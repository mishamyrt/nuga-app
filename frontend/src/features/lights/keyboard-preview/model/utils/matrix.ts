import ColorJS from 'colorjs.io'

import type { KeyboardTemplate, KeyHighlightMatrix } from '$entities/keys'

const GRADIENT_TOP = '#0578FF'
const GRADIENT_BOTTOM = '#FF014D'

export function fillMatrix (template: KeyboardTemplate, color: string): KeyHighlightMatrix {
  const map: string[][] = []
  for (const templateRow of template.keys) {
    const row = Array(templateRow.length)
    for (let j = 0; j < templateRow.length; j++) {
      row[j] = color
    }
    map.push(row)
  }
  return map
}

export function fillGradientMatrix (template: KeyboardTemplate): KeyHighlightMatrix {
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
