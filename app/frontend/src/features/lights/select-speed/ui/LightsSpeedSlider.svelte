<script lang="ts">
  import { fillMarks, Slider, type SliderChangeEvent } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { type LightDomain, type LightStateValue, stateStore } from '$entities/lights'

  import { speedChanged } from '../model/store'

  export let domain: LightDomain

  function handleChange (e: SliderChangeEvent) {
    speedChanged({
      domain,
      speed: e.detail as LightStateValue
    })
  }
</script>

<div use:fsd={'features/LightsSpeedSlider'}>
  <Slider
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
