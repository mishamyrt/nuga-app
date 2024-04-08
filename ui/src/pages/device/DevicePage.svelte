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

<style lang="scss">
  /* stylelint-disable selector-class-pattern */
  :global(.os-mac .toolbar.paddingDefault.transparent) {
    --toolbar-border-shadow: transparent;
  }
  /* stylelint-enable selector-class-pattern */
</style>
