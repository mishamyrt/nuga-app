<script lang="ts">
  import { FormGroup, Stack, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { selectedKeyStore } from '$entities/keys'
  import { getShortName } from '$entities/keys/lib'
  import { DeviceSupports } from '$features/device'
  import { KeySettings, KeysNotSupported } from '$widgets'

  $: selectedKey = $selectedKeyStore
  $: keyTitle = getShortName(selectedKey.code)
</script>

<div use:fsd={'pages/KeysPage'}>
  <Stack gap="m">
    <DeviceSupports capability="keys">
      <FormGroup>
        <KeySettings keyCode={selectedKey.code} />
      </FormGroup>
      {#if selectedKey?.secondaryCode}
      <FormGroup title={`Fn + ${keyTitle}`}>
        <KeySettings keyCode={selectedKey.secondaryCode} />
      </FormGroup>
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
