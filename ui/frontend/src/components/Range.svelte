<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: number = 0

  const dispatch = createEventDispatcher()

  function handleChange(e: { currentTarget: HTMLInputElement }) {
    dispatch('change', parseInt(e.currentTarget.value, 10))
  }
</script>

<input {value} on:change={handleChange} type="range" min="0" step="1" max="4" />
