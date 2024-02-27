<script lang="ts">
  import { FormGroup, FormRow, Stack, Typography } from '@naco-ui/svelte'

  import { actionChanged, type KeyAction } from '$entities/keys'
  import { CustomActionToggle, KeyActionSelect, KeystrokeInput } from '$features/keys'

  export let keyCode: string

  function handleChange (e: CustomEvent<KeyAction>) {
    actionChanged({
      key: keyCode,
      action: e.detail
    })
  }

</script>

<FormGroup>
  <FormRow title="Custom">
    <CustomActionToggle {keyCode} on:restore={handleChange} />
  </FormRow>
  <FormRow>
    <Stack align="center" justify="space-between" direction="horizontal">
      <Typography>Action</Typography>
      <KeyActionSelect {keyCode} on:input={handleChange} />
    </Stack>
  </FormRow>
  <FormRow title="Keystroke">
    <KeystrokeInput {keyCode} on:input={handleChange} />
  </FormRow>
</FormGroup>
