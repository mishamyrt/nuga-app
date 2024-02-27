<script lang="ts">
  import { FormGroup, FormRow, Stack, Typography } from '@naco-ui/svelte'

  import { CustomActionToggle, KeyActionSelect, KeystrokeInput } from '$features/keys'

  export let keyCode: string
</script>

<FormGroup>
  <FormRow title="Custom">
    <CustomActionToggle {keyCode} on:restore />
  </FormRow>
  <FormRow>
    <Stack align="center" justify="space-between" direction="horizontal">
      <Typography>Action</Typography>
      <KeyActionSelect
        {keyCode}
        on:input
      />
    </Stack>
  </FormRow>
  <FormRow title="Keystroke">
    <KeystrokeInput
      {keyCode}
      on:input
    />
  </FormRow>
</FormGroup>
