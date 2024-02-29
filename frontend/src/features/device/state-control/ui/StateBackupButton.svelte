<script lang="ts">
  import { Button } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { stateSaved } from '$entities/device'

  function handleClick () {
    stateSaved()
  }
</script>

<div use:fsd={'features/StateBackupButton'}>
  <Button on:click={handleClick}>
    <slot />
  </Button>
</div>
