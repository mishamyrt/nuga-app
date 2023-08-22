import { backgroundColor } from '@stores/app'
import type { Color } from '@stores/lights'
import ColorJS from 'colorjs.io'

import type { ColorMap, KeyboardTemplate } from './types'
import { toColor, toRGB } from './utils'

export function normalizeContrast (color: Color): Color {
  const rgbString = toRGB(color)
  const instance = new ColorJS(rgbString)
  const backgroundInstance = new ColorJS(backgroundColor.get())
  let score = 0
  for (let i = 0; i < 20; i++) {
    score = backgroundInstance.contrastAPCA(instance)
    if (score < 0) {
      if (score < -40) {
        instance.lch.l *= 0.98
        instance.lch.c *= 0.95
      } else if (score > -20) {
        instance.lch.l *= 1.105
        instance.lch.c *= 0.90
      } else {
        break
      }
    } else {
      if (score < 30) {
        instance.lch.l *= 0.95
        instance.lch.c *= 0.95
      } else if (score > 60) {
        instance.lch.l *= 1.1
        instance.lch.c *= 0.95
      } else {
        break
      }
    }
  }
  return toColor(instance)
}

export function fillColorMap (template: KeyboardTemplate, color: string): ColorMap {
  const map: string[][] = []
  for (let i = 0; i < template.keys.length; i++) {
    const row = Array(template.keys[i].length)
    for (let j = 0; j < template.keys[i].length; j++) {
      row[j] = color
    }
    map.push(row)
  }
  return map
}
