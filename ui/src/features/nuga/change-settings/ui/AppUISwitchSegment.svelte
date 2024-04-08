<script lang="ts">
  import { type OS, Segment } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { settingsChanged, settingsStore } from '$entities/nuga'

  function handleChange (e: CustomEvent<string>) {
    settingsChanged({
      ui: e.detail as OS,
      theme: $settingsStore.theme,
    })
  }
</script>

<div use:fsd={'features/AppUISwitchSegment'}>
  <Segment
    on:change={handleChange}
    value={$settingsStore.ui}
    options={[{ value: 'mac' }, { value: 'linux' }]}
  />
</div>
