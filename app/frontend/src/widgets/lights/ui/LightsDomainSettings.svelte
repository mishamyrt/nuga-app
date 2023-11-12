<script lang="ts">
  import { FormGroup, FormRow } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { type LightDomain } from '$entities/lights'
  import {
    LightsBrightnessSlider,
    LightsColorSelector,
    LightsModeSelect,
    LightsPowerToggle,
    LightsSpeedSlider
  } from '$features/lights'
  import { capitalize } from '$shared/lib'

  export let domain: LightDomain

</script>
<div use:fsd={'widgets/LightsDomainSettings'}>
  <FormGroup title={capitalize(domain)}>
    <FormRow title="Enable">
      <LightsPowerToggle {domain} />
    </FormRow>
    <FormRow title="Mode">
      <LightsModeSelect {domain} />
    </FormRow>
    <FormRow title="Color">
      <LightsColorSelector {domain} />
    </FormRow>
    <FormRow align="top" title="Brightness">
      <LightsBrightnessSlider {domain} />
    </FormRow>
    <FormRow align="top" title="Speed">
      <LightsSpeedSlider {domain} />
    </FormRow>
  </FormGroup>
</div>
