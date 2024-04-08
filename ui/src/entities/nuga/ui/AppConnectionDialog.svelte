<script lang="ts">
  import { Spinner, Stack, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import AppIconCable from './icons/AppIconCable.svelte'

  export let showHelp: boolean
</script>

<div use:fsd={'entities/AppConnectionDialog'} class="connection-dialog">
  <div class="help" class:visible={showHelp}>
    <Stack align="center" gap="m">
      <AppIconCable />
      <Typography variant="heading-l" color="primary">
        Looking for compatible keyboard
      </Typography>
      <Typography color="tertiary">
        Make sure that the device is connected with a wire
      </Typography>
    </Stack>
  </div>
  <Spinner size="l" />
</div>

<style lang="scss">
  .connection-dialog {
    background-color: var(--color-background-primary);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-l);
  }

  .help {
    transition: opacity var(--transition-default);
    opacity: 0;

    &.visible {
      opacity: 1;
    }
  }
</style>
