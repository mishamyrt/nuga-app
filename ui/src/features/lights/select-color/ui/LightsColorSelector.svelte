<script lang="ts">
  import { ColorSelector } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import {
    backlightColorsStore,
    defaultColors,
    hexToRgb,
    type LightColorIndex,
    type LightDomain,
    modesStore,
    rgbToCSSProperty,
    stateStore,
  } from '$entities/lights'

  import { colorChanged } from '../model/store'

  export let domain: LightDomain

  function reduceOpacity (hex: HexColor): HexColor {
    return rgbToCSSProperty(hexToRgb(hex), 0.7)
  }

  $: modeCode = $stateStore[domain].mode
  $: mode = $modesStore[domain].find((m) => m.code === modeCode)
  $: modeColors =
    domain === 'backlight'
      ? $backlightColorsStore[modeCode].map(reduceOpacity)
      : defaultColors.map(reduceOpacity)
  $: supportsRandom = mode?.supports.randomColor ?? false
  $: supportsColor = mode?.supports.specificColor

  function handleChange (e: CustomEvent<any>) {
    let color: number
    if (e.detail.value === 'random') {
      color = 7
    } else {
      color = e.detail.index
      if (supportsRandom) {
        color -= 1
      }
    }
    colorChanged({
      domain,
      color: color as LightColorIndex,
    })
  }

  $: colors = supportsRandom ? ['random', ...modeColors] : modeColors
  $: colorIndex = $stateStore[domain].color
  $: index = colorIndex === 7 ? 0 : supportsRandom ? colorIndex + 1 : colorIndex
</script>

<div use:fsd={'features/LightsColorSelector'}>
  <ColorSelector
    {index}
    disabled={!supportsColor}
    options={colors}
    primaryProp="index"
    on:change={handleChange}
  />
</div>
