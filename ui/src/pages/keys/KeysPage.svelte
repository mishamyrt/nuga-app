<script lang="ts">
  import { Stack, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { selectedKeyStore } from '$entities/keys'
  import { DeviceSupports } from '$features/device'
  import { KeySettings, KeysNotSupported } from '$widgets'

  $: selectedKey = $selectedKeyStore
</script>

<div use:fsd={'pages/KeysPage'}>
  <Stack gap="m">
    <DeviceSupports capability="keys">
      <KeySettings keyCode={selectedKey.code} />
      {#if selectedKey?.secondaryCode}
      <KeySettings keyCode={selectedKey.secondaryCode} secondary />
      {/if}
      {#if selectedKey.readonly && selectedKey.code !== 'none'}
        <Typography
          align="center"
          color="tertiary"
          variant="caption-m"
        >
          This button is read-only. Its actions cannot be changed
        </Typography>
      {/if}
      <KeysNotSupported slot="not-supported" />
    </DeviceSupports>
  </Stack>
</div>
