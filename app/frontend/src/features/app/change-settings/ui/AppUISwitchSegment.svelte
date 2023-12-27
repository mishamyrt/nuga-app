<script lang="ts">
  import { type OS, Segment } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { appSettingsChanged, appSettingsStore } from '$entities/app'

  function handleChange (e: CustomEvent<string>) {
    appSettingsChanged({
      ui: e.detail as OS,
      theme: $appSettingsStore.theme
    })
  }

</script>

<div use:fsd={'features/AppUISwitchSegment'}>
  <Segment
    on:change={handleChange}
    value={$appSettingsStore.ui}
    options={[
      { value: 'mac' },
      { value: 'linux' }
    ]} />
</div>
