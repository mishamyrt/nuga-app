<script lang="ts">
  import { Toggle } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { loggingChanged, loggingStateStore } from '../model/store'

  function handleChange (e: CustomEvent<boolean>) {
    loggingChanged(e.detail)
  }

  $: enabled = $loggingStateStore
</script>

<div use:fsd={'features/LoggingSwitch'}>
  <Toggle on:change={handleChange} checked={enabled} />
</div>
