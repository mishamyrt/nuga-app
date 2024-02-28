<script lang="ts">
  import { Button, FormGroup, FormRow, Stack, Typography } from '@naco-ui/svelte'

</script>

<FormGroup>
  <FormRow>
    <Typography variant="text-m">
      Nuga doesn't support your keyboard model keys configuration yet.
    </Typography>
  </FormRow>
  <FormRow>
    <Stack gap="xs">
      <Typography color="tertiary" variant="caption-s">
        The good news is that you can help with adding support for your model.
      </Typography>
      <Typography color="tertiary" variant="caption-s">
        To do this, save a dump and send it to the application repository issues.
      </Typography>
    </Stack>
  </FormRow>
</FormGroup>
<FormGroup>
  <FormRow
    align="top"
    title="Keyboard dump"
    subtitle="The dump must be written with the default keyboard settings. Be sure to reset them before saving">
    <Button>Save...</Button>
  </FormRow>
</FormGroup>
