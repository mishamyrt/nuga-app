<script lang="ts">
  import { Toggle } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { modeSettingsChanged, modeSettingsStore } from '$entities/device'

  function handleChange (e: CustomEvent<boolean>) {
    modeSettingsChanged({
      osMode: $modeSettingsStore.osMode,
      individual: e.detail
    })
  }

</script>

<div use:fsd={'features/IndividualModeToggle'}>
  <Toggle
    checked={$modeSettingsStore.individual}
    on:change={handleChange}
  />
</div>
