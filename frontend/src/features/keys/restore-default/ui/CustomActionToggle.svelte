<script lang="ts">
  import { Toggle } from '@naco-ui/svelte'

  import { defaultActionRestored, isActionChangedStore } from '../model/store'

  function handleToggleChange (e: CustomEvent<boolean>) {
    defaultActionRestored()
  }

  $: isCustom = $isActionChangedStore
</script>

<div>
  <Toggle checked={isCustom} on:change={handleToggleChange} disabled={!isCustom} />
</div>
