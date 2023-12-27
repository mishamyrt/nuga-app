<script lang="ts">
  import { Stack } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { LightsDomainSettings } from '$widgets/lights'
</script>
<div use:fsd={'pages/LightsPage'}>
  <Stack gap="m">
    <LightsDomainSettings domain="backlight" />
    <LightsDomainSettings domain="halo" />
    <LightsDomainSettings domain="sidelight" />
  </Stack>
</div>
