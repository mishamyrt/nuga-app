<script lang="ts">
  import { Segment } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { modeChanged, modeStore, type OSMode, osModeOptions } from '$shared/model'

  function handleChange (e: CustomEvent<string>) {
    modeChanged(e.detail as OSMode)
  }

</script>

<div use:fsd={'features/OSModeSelect'}>
  <Segment value={$modeStore} on:change={handleChange} options={osModeOptions} />
</div>
