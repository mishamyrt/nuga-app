<script lang="ts">
  import { Select, type SelectOption } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { type LightDomain, modesStore, stateStore } from '$entities/lights'

  import { modeChanged } from '../model/store'

  export let domain: LightDomain

  function handleChange (e: CustomEvent<string>) {
    modeChanged({
      domain,
      mode: parseInt(e.detail),
    })
  }

  $: options = $modesStore[domain]
    .filter((m) => m.code !== 0)
    .map<SelectOption>((m) => ({
    value: m.code.toString(),
    title: m.name,
    disabled: m.code === 18, // Disable custom mode
  }))
</script>

<div use:fsd={'features/LightsModeSelect'}>
  <Select
    {options}
    value={$stateStore[domain].mode.toString()}
    on:change={handleChange}
  />
</div>
