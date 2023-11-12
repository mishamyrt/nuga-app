<script lang="ts">
  import { FormGroup, FormRow } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { IndividualModeToggle, OSModeSelect } from '$features/device'
</script>
<div use:fsd={'widgets/DeviceSettings'}>
  <FormGroup>
    <FormRow title="Individual mode settings">
      <IndividualModeToggle />
    </FormRow>
    <FormRow title="System mode">
      <OSModeSelect />
    </FormRow>
  </FormGroup>
</div>
