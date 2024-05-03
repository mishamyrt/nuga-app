<script lang="ts">
  import { fillMarks, Slider, type SliderChangeEvent } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import {
    type LightDomain,
    type LightStateValue,
    stateStore,
  } from '$entities/lights'

  import { brightnessChanged } from '../model/store'

  export let domain: LightDomain

  function handleChange (e: SliderChangeEvent) {
    brightnessChanged({
      domain,
      brightness: e.detail as LightStateValue,
    })
  }

  $: disabled = !$stateStore[domain].enabled
</script>

<div use:fsd={'features/LightsBrightnessSlider'}>
  <Slider
    {disabled}
    min={0}
    max={4}
    step={1}
    value={$stateStore[domain].brightness}
    on:change={handleChange}
    marks={fillMarks(5, {
      1: 'Off',
      2: 'Dark',
      5: 'Light',
    })}
  />
</div>
