<svelte:options immutable={true}/>
<script lang="ts">
  import { FormGroup, FormRow, Stack } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { restoringStateStore } from '$entities/device'
  import {
    OSModeSelect,
    StateBackupButton,
    StateRestoreButton,
    StateRestoreDefaultButton
  } from '$features/device'

  $: isRestoring = $restoringStateStore
</script>
<div use:fsd={'widgets/DeviceSettings'}>
  <FormGroup title="Configuration">
    <FormRow title="System mode">
      <OSModeSelect />
    </FormRow>
    <FormRow align="top" title="State" subtitle="The complete state of the device: lights and keys is saved to the file.
    The state can be restored only on the same model of the keyboard.
    Files made in different program versions may be incompatible.">
      <Stack justify="end" direction="horizontal" gap="s">
        <StateBackupButton>Save...</StateBackupButton>
        <StateRestoreButton disabled={isRestoring}>Load...</StateRestoreButton>
      </Stack>
    </FormRow>
  </FormGroup>
  <div class="restore">
    <StateRestoreDefaultButton disabled={isRestoring}>Restore default</StateRestoreDefaultButton>
  </div>
</div>

<style lang="scss">
  .restore {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--space-m);
  }
</style>
