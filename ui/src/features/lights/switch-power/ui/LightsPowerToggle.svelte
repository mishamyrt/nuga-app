<script lang="ts">
  import { Toggle } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { type LightDomain, stateStore } from '$entities/lights'

  import { powerStateChanged } from '../model/store'

  export let domain: LightDomain

  function handleChange (e: CustomEvent<boolean>) {
    powerStateChanged({
      domain,
      enabled: e.detail
    })
  }
</script>

<div class="power-container" use:fsd={'features/LightsPowerToggle'}>
  <Toggle on:change={handleChange} checked={$stateStore[domain].enabled} />
</div>

<style lang="scss">
  .power-container {
    display: flex;
  }
</style>
