import ColorJS from 'colorjs.io'

import type { KeyboardTemplate } from '$entities/keys'
import type {
  KeyHighlightMatrix,
  LightBacklightColors,
  LightDomainState
} from '$entities/lights'

import { RANDOM_GRADIENT_BOTTOM, RANDOM_GRADIENT_TOP } from './constants'

export function renderBacklightColors (
  state: LightDomainState,
  colors: LightBacklightColors,
  template: KeyboardTemplate
): KeyHighlightMatrix {
  const { enabled, mode, color } = state

  if (!enabled || colors.length < mode || colors[mode].length < color) {
    return renderColorMatrix(template, 'transparent')
  } else if (color === 7) {
    return renderGradientMatrix(template)
  }
  return renderColorMatrix(template, colors[mode][color])
}

export function renderColorMatrix (template: KeyboardTemplate, color: string): KeyHighlightMatrix {
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

export function renderGradientMatrix (template: KeyboardTemplate): KeyHighlightMatrix {
  const color = new ColorJS(RANDOM_GRADIENT_TOP)
  const gradient = color.range(RANDOM_GRADIENT_BOTTOM, {
    space: 'lch',
    outputSpace: 'srgb'
  })
  const rows: string[][] = []
  for (let i = 0; i < template.keys.length; i++) {
    const row = Array(template.keys[i].length)
    const progress = i / (template.keys.length - 1)
    const rowColor = gradient(progress).toString({ format: 'hex' })
    for (let j = 0; j < template.keys[i].length; j++) {
      row[j] = rowColor
    }
    rows.push(row)
  }
  return rows
}
