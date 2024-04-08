<svelte:options immutable={true} />

<script lang="ts">
  import { FormGroup, FormRow, Stack, Typography } from '@naco-ui/svelte'

  import { restoringStateStore } from '$entities/device'
  import { supportsKeyStore } from '$entities/keys'
  import {
    OSModeSelect,
    StateBackupButton,
    StateRestoreButton,
    StateRestoreDefaultButton,
  } from '$features/device'
  import { KeyboardThemeSelect } from '$features/keys'
  import { activeFeaturesStore } from '$shared/model'

  $: isRestoring = $restoringStateStore
  $: supportsKeys = $supportsKeyStore
</script>

<FormGroup title="Configuration">
  <FormRow title="System mode">
    <OSModeSelect />
  </FormRow>
  <FormRow
    align="top"
    title="State"
    subtitle="The complete state of the device: lights and keys is saved to the file.
  The state can be restored only on the same model of the keyboard.
  Files made in different program versions may be incompatible."
  >
    <Stack fullHeight align="start" justify="end" direction="horizontal" gap="s">
      <StateBackupButton>Save...</StateBackupButton>
      <StateRestoreButton disabled={isRestoring}>Load...</StateRestoreButton>
    </Stack>
  </FormRow>
  {#if $activeFeaturesStore.keyboardThemes}
    <FormRow>
      <Stack align="center" justify="space-between" direction="horizontal">
        <Typography>Keyboard theme</Typography>
        <KeyboardThemeSelect />
      </Stack>
    </FormRow>
  {/if}
</FormGroup>
<div class="restore">
  <StateRestoreDefaultButton disabled={!supportsKeys || isRestoring}
    >Restore default</StateRestoreDefaultButton
  >
</div>

<style lang="scss">
  .restore {
    display: flex;
    justify-content: flex-end;
  }
</style>
