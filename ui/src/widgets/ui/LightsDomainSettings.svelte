<script lang="ts">
  import { FormGroup, FormRow, Stack } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { type LightDomain } from '$entities/lights'
  import {
    LightsBrightnessSlider,
    LightsColorSelector,
    LightsModeSelect,
    LightsPowerToggle,
    LightsSpeedSlider
  } from '$features/lights'
  import LightColorEditor from '$features/lights/edit-color/ui/LightsColorEditor.svelte'
  import { capitalize } from '$shared/lib'

  export let domain: LightDomain

  $: isBacklight = domain === 'backlight'
</script>
<div use:fsd={'widgets/LightsDomainSettings'} class="settings-group">
  <FormGroup largeContent title={capitalize(domain)}>
    <FormRow title="Enable">
      <LightsPowerToggle {domain} />
    </FormRow>
    <FormRow title="Mode">
      <LightsModeSelect {domain} />
    </FormRow>
    <FormRow title="Color" align={isBacklight ? 'top' : 'center'}>
      <Stack align="end">
        <LightsColorSelector {domain} />
        {#if isBacklight}
          <LightColorEditor />
        {/if}
      </Stack>
    </FormRow>
    <FormRow align="top" title="Brightness">
      <LightsBrightnessSlider {domain} />
    </FormRow>
    <FormRow align="top" title="Speed">
      <LightsSpeedSlider {domain} />
    </FormRow>
  </FormGroup>
</div>

<style lang="scss">
  .settings-group:not(:first-child) :global(.form-group > .heading) {
    margin-top: var(--space-l);
  }
</style>
