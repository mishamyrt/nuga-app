<script lang="ts">
  import { Button } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { stateRestored } from '$entities/device'

  export let disabled: boolean

  function handleClick () {
    stateRestored()
  }
</script>

<div use:fsd={'features/StateRestoreButton'}>
  <Button {disabled} on:click={handleClick}>
    <slot />
  </Button>
</div>
