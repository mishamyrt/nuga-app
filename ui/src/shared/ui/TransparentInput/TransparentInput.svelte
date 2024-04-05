<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let value: string

  export let align: 'left' | 'center' | 'right' = 'left'

  const dispatch = createEventDispatcher()

  function handleChange (e: Event) {
    dispatch('change', (e.target as HTMLInputElement).value)
  }
</script>

<input
  type="text"
  class="transparent-input"
  style:--input-align={align}
  {value}
  on:change={handleChange}
/>
