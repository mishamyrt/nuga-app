<script lang="ts">
  import { Segment } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { modeSettingsChanged, modeSettingsStore, type OSMode, osModeOptions } from '$entities/device'

  function handleChange (e: CustomEvent<string>) {
    modeSettingsChanged({
      osMode: e.detail as OSMode,
      individual: $modeSettingsStore.individual
    })
  }

</script>

<div use:fsd={'features/OSModeSelect'}>
  <Segment value={$modeSettingsStore.osMode} on:change={handleChange} options={osModeOptions} />
</div>
