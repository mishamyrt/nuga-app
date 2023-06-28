<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { SelectOption } from './types'

  export let value: string
  export let options: SelectOption[]

  const dispatch = createEventDispatcher()

  function handleChange(event: { currentTarget: HTMLSelectElement }) {
    dispatch('change', event.currentTarget.value)
  }

  $: selected = options.find(o => o.value === value)
</script>

<div class="select-container">
  {selected?.title}
  <select on:change={handleChange} value={value}>
    {#each options as option}
      <option value={option.value}>{option.title}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  select {
    color: rgba(255, 255, 255, 0.70);
    font-size: 13px;
    font-family: sans-serif;
    background: transparent;
    appearance: none;
    border: none;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
  }

  .select-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .select-container::after {
    display: block;
    content: '';
    width: 12px;
    height: 12px;
    background: url(../../assets/images/select-arrows@2x.png);
    background-size: contain;
  }
</style>
