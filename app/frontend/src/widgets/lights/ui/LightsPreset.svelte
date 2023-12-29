<script lang="ts">
  import { LoadPresetButton, SavePresetButton } from '$features/lights';
import { Button, FormGroup, FormRow, Modal, ModalActions, Stack, Toggle, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

</script>
<div class="container" use:fsd={'widgets/LightsPreset'}>
  <FormGroup>
    <FormRow>
      <div class="row">
        <div>
          <Stack gap="xs">
            <Typography>Preset</Typography>
            <Typography variant="caption-m" color="tertiary">
              You can save and restore the current backlight state. Note that presets can only be loaded on the devices from which they were captured
            </Typography>
          </Stack>
        </div>
        <Stack align="start" justify="end" direction="horizontal">
          <SavePresetButton />
          <LoadPresetButton />
        </Stack>
      </div>
    </FormRow>
  </FormGroup>
</div>

<style lang="scss">
  .row {
    display: grid;
    grid-template-columns: 1fr 190px;
  }

  .container {
    margin-top: var(--space-l);
  }
</style>
