<script lang="ts">
  import { Stack } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { KeySettings } from '$widgets'
</script>

<div use:fsd={'pages/KeysPage'}>
  <Stack gap="m">
    <KeySettings />
  </Stack>
</div>
