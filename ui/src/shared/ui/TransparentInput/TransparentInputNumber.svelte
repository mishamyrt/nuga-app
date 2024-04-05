<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let value: number
  export let min: number | undefined = undefined
  export let max: number | undefined = undefined

  export let align: 'left' | 'center' | 'right' = 'left'

  const dispatch = createEventDispatcher()

  function handleChange (e: Event) {
    dispatch('change', parseInt((e.target as HTMLInputElement).value, 10))
  }
</script>

<input
  type="number"
  class="transparent-input"
  style:--input-align={align}
  {min}
  {max}
  {value}
  on:change={handleChange}
/>
