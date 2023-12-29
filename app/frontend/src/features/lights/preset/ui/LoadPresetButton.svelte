<svelte:options immutable={true}/>

<script lang="ts">
  import { Button } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { presetLoaded } from '$entities/lights'

  function handleClick () {
    presetLoaded()
  }
</script>

<div class="container" use:fsd={'features/LoadPresetButton'}>
  <Button color="error" on:click={handleClick}>Load...</Button>
</div>

<style lang="scss">
  .container {
    width: fit-content;
  }
</style>
