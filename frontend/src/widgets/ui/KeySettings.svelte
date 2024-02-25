<script lang="ts">
  import { FormGroup, FormRow, Stack, Typography } from '@naco-ui/svelte'

  import { CustomActionToggle, KeyActionSelect, KeystrokeInput } from '$features/keys'

</script>

<FormGroup>
  <FormRow title="Custom">
    <CustomActionToggle />
  </FormRow>
  <FormRow>
    <Stack align="center" justify="space-between" direction="horizontal">
      <Typography>Action</Typography>
      <KeyActionSelect />
    </Stack>
  </FormRow>
  <FormRow title="Keystroke">
    <KeystrokeInput />
  </FormRow>
</FormGroup>
