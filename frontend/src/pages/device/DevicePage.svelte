<script>
  import { Stack } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { DeviceInfo, DeviceSettings } from '$widgets'

</script>
<div use:fsd={'pages/DevicePage'}>
  <Stack direction="vertical" gap="m">
    <DeviceInfo />
    <DeviceSettings />
  </Stack>
</div>
