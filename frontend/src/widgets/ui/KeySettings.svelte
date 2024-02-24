<script lang="ts">
  import { FormGroup, FormRow, Stack, Toggle, Typography } from '@naco-ui/svelte'

  import { supportsStore } from '$entities/device'
  import { KeyActionSelect, KeystrokeInput } from '$features/keys'

</script>

<FormGroup>
  <FormRow>
    <Stack align="center" justify="space-between" direction="horizontal">
      <Typography>Action</Typography>
      <KeyActionSelect />
    </Stack>
  </FormRow>
  <FormRow title="Record keystroke">
    <KeystrokeInput />
  </FormRow>
</FormGroup>
<FormGroup>
  <FormRow title="Model is supported">
    <Toggle disabled checked={$supportsStore.keys} />
  </FormRow>
</FormGroup>
