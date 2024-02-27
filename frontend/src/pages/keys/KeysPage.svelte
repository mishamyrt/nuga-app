<script lang="ts">
  import { Stack } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { selectedKeyStore } from '$entities/keys'
  import { KeySettings } from '$widgets'

  $: selectedKey = $selectedKeyStore
</script>

<div use:fsd={'pages/KeysPage'}>
  <Stack gap="m">
    {JSON.stringify(selectedKey)}
    <KeySettings keyCode={selectedKey.code} />
    {#if selectedKey?.secondaryCode}
      <KeySettings keyCode={selectedKey.secondaryCode} />
    {/if}
  </Stack>
</div>
