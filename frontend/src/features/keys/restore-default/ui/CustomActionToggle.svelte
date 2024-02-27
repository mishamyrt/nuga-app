<script lang="ts">
  import { Toggle } from '@naco-ui/svelte'
  import deepEqual from 'deep-equal'
  import { createEventDispatcher } from 'svelte'

  import { defaultKeyMapStore, keyMapStore, selectedKeyStore } from '$entities/keys'

  export let keyCode: string

  const dispatch = createEventDispatcher()

  $: defaultAction = $defaultKeyMapStore[keyCode]
  $: isCustom = !deepEqual(defaultAction, $keyMapStore[keyCode])
  $: disabled = $selectedKeyStore.readonly

  function handleToggleChange (e: CustomEvent<boolean>) {
    dispatch('restore', defaultAction)
  }
</script>

<div>
  <Toggle
    on:change={handleToggleChange}
    checked={isCustom}
    disabled={disabled && !isCustom}
  />
</div>
