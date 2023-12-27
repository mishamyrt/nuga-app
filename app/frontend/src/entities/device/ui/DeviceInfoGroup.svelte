<script lang="ts">
  import { FormGroup, FormRow, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  export let name: string
  export let path: string
  export let firmware: string
</script>
<div use:fsd={'entities/DeviceInfoGroup'}>
  <FormGroup>
    <FormRow title="Name">
      <Typography>{name}</Typography>
    </FormRow>
    <FormRow title="Path">
      <Typography>{path}</Typography>
    </FormRow>
    <FormRow title="Firmware version">
      <Typography>{firmware}</Typography>
    </FormRow>
  </FormGroup>
</div>
