<svelte:options immutable={true}/>

<script lang="ts">
  import { Button } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { presetSaved } from '$entities/lights'

  function handleClick () {
    presetSaved()
  }
</script>

<div class="container" use:fsd={'features/LoadPresetButton'}>
  <Button on:click={handleClick}>Save...</Button>
</div>

<style lang="scss">
  .container {
    width: fit-content;
  }
</style>
