<script lang="ts">
  import { Toggle } from '@naco-ui/svelte'
  import deepEqual from 'deep-equal'
  import { createEventDispatcher } from 'svelte'

  import { defaultKeyMapStore, keyMapStore } from '$entities/keys'

  export let keyCode: string

  const dispatch = createEventDispatcher()

  function handleToggleChange (e: CustomEvent<boolean>) {
    dispatch('restore')
  }

  $: defaultAction = $defaultKeyMapStore[keyCode]
  $: isCustom = !deepEqual(defaultAction, $keyMapStore[keyCode])
</script>

<div>
  <Toggle
    on:change={handleToggleChange}
    checked={isCustom}
    disabled={!isCustom}
  />
</div>
