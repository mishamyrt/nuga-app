<script lang="ts">
  import { Button } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { defaultStateRestored } from '$entities/device'

  export let disabled: boolean

  function handleClick () {
    defaultStateRestored()
  }
</script>

<div use:fsd={'features/StateRestoreDefaultButton'}>
  <Button {disabled} on:click={handleClick}>
    <slot />
  </Button>
</div>
