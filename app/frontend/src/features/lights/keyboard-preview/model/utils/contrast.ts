import ColorJS from 'colorjs.io'

import { colorJStoRGB, rgbToCSSProperty } from '$entities/lights'

export function normalizeContrast (color: RGBColor, backgroundColor: RGBHexColor): RGBColor {
  const rgbString = rgbToCSSProperty(color)
  const instance = new ColorJS(rgbString)
  const backgroundInstance = new ColorJS(backgroundColor)
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
    } else if (score < 30) {
      instance.lch.l *= 0.95
      instance.lch.c *= 0.95
    } else if (score > 60) {
      instance.lch.l *= 1.1
      instance.lch.c *= 0.95
    } else {
      break
    }
  }
  return colorJStoRGB(instance)
}
