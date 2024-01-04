<script lang="ts">
  import { Button, Stack, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { versionStore } from '$entities/app'

  import { updateOpened, updateUrlStore } from '../model/store'

  $: version = $versionStore
  $: updateUrl = $updateUrlStore

  function openUpdateUrl () {
    updateOpened(updateUrl)
  }
</script>

<div use:fsd={'features/AppUpdates'}>
  <div class="updates-container">
    <Stack gap="xs">
      {#if updateUrl.length > 0}
        <Button on:click={openUpdateUrl} fullWidth>Update is available</Button>
      {/if}
      <div class="version">
        <Typography variant="caption-m">
          {version}
        </Typography>
      </div>
    </Stack>
  </div>
</div>

<style lang="scss">
  .version {
    opacity: 0.5;
  }
</style>
