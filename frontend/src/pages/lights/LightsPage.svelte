<script lang="ts">
  import { Stack } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { DeviceSupports } from '$features/device'
  import { LightsDomainSettings, LightsPreset } from '$widgets'
</script>
<div use:fsd={'pages/LightsPage'}>
  <Stack gap="m">
    <LightsDomainSettings domain="backlight" />
    <DeviceSupports capability="halolight">
      <LightsDomainSettings domain="halo" />
    </DeviceSupports>
    <DeviceSupports capability="sidelight">
      <LightsDomainSettings domain="sidelight" />
    </DeviceSupports>
    <LightsPreset />
  </Stack>
</div>
