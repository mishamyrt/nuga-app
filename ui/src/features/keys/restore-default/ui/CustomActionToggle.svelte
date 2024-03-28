<script lang="ts">
  import { Toggle } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'
  import { createEventDispatcher } from 'svelte'

  import { changesMapStore, defaultKeyMapStore, selectedKeyStore } from '$entities/keys'

  export let keyCode: string

  const dispatch = createEventDispatcher()

  $: defaultAction = $defaultKeyMapStore[keyCode]
  $: isCustom = Boolean($changesMapStore[keyCode])
  $: disabled = $selectedKeyStore.readonly || !isCustom

  function handleToggleChange (e: CustomEvent<boolean>) {
    dispatch('restore', defaultAction)
  }
</script>

<div class="toggle-container" use:fsd={'features/CustomActionToggle'}>
  <Toggle
    on:change={handleToggleChange}
    checked={isCustom}
    disabled={disabled && !isCustom}
  />
</div>

<style lang="scss">
  .toggle-container {
    display: flex;
  }
</style>
