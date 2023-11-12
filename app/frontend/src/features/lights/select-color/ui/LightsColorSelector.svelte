<script lang="ts">
  import { ColorSelector } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { backlightColorsStore, defaultColors, type LightColorIndex, type LightDomain, modesStore, stateStore } from '$entities/lights'

  import { colorChanged } from '../model/store'

  export let domain: LightDomain

  $: modeCode = $stateStore[domain].mode
  $: mode = $modesStore[domain].find(m => m.code === modeCode)
  $: modeColors = domain === 'backlight'
    ? $backlightColorsStore[modeCode]
    : defaultColors
  $: supportsRandom = mode?.supports.randomColor ?? false
  $: supportsColor = supportsRandom && mode?.supports.specificColor

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
      color: color as LightColorIndex
    })
  }

  $: colors = supportsRandom ? ['random', ...modeColors] : modeColors
  $: colorIndex = $stateStore[domain].color
  $: index = colorIndex === 7
    ? 0
    : supportsRandom ? colorIndex + 1 : colorIndex
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
