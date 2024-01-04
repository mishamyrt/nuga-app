<script lang="ts">
  import { Button } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { appRestarted } from '$entities/app'

  function handleRestart () {
    appRestarted()
  }
</script>

<div use:fsd={'features/RestartButton'}>
  <Button on:click={handleRestart}>Restart</Button>
</div>
