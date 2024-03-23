<script lang="ts">
  import { fillMarks, Slider, type SliderChangeEvent } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { type LightDomain, type LightStateValue, modesStore, stateStore } from '$entities/lights'

  import { speedChanged } from '../model/store'

  export let domain: LightDomain

  function handleChange (e: SliderChangeEvent) {
    speedChanged({
      domain,
      speed: e.detail as LightStateValue
    })
  }

  $: modeCode = $stateStore[domain].mode
  $: mode = $modesStore[domain].find(m => m.code === modeCode)
  $: supportsSpeed = mode?.supports.speed ?? false
</script>

<div use:fsd={'features/LightsSpeedSlider'}>
  <Slider
    disabled={!supportsSpeed}
    min={0}
    max={4}
    step={1}
    value={$stateStore[domain].speed}
    on:change={handleChange}
    marks={fillMarks(5, {
      1: 'Slow',
      5: 'Fast'
    })}
  />
</div>
