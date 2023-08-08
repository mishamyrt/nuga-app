<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { SelectOption } from './types'

  export let value: string
  export let options: SelectOption[]
  export let disabled = false

  const dispatch = createEventDispatcher()

  function handleChange (event: { currentTarget: HTMLSelectElement }): void {
    dispatch('change', event.currentTarget.value)
  }

  $: selected = options.find(o => o.value === value)
</script>

<div class="select-container" class:disabled>
  <select on:change={handleChange} {value}>
    {#each options as option}
      <option disabled={option.disabled} value={option.value}>{option.title}</option>
    {/each}
  </select>
  <span class="title">{selected?.title}</span>
</div>

<style lang="scss">
  .select-container {
    --select-font-size: 13px;
    --select-padding: 2px 15px 3px 13px;
    --select-border-radius: 5px;
    --select-indicator-color: #414141;
    --select-indicator-hover-color: #606060;
  }

  :global(.theme-light) .select-container {
    --select-indicator-color: #E6E6E6;
    --select-indicator-hover-color: white;
  }

  select {
    font-size: var(--select-font-size);
    font-family: var(--font-family);
    background: transparent;
    appearance: none;
    border: none;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .select-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--select-padding);
    border-radius: var(--select-border-radius);

    &.disabled {
      opacity: 0.35;
      pointer-events: none;
    }

    &::after,
    &::before {
      display: block;
      content: '';
      width: 16px;
      height: 16px;
      background-image: url("../../assets/images/select-arrows.png");
      background-size: contain;
      position: absolute;
      right: 2px;
      top: 1px;
      pointer-events: none;
    }

    &::before {
      background: var(--select-indicator-color);
      position: absolute;
      border-radius: calc(var(--select-border-radius) - 2px);
      box-shadow: 0 1px 1px rgb(0 0 0 / 20%);
    }

    &:hover {
      background-color: var(--select-indicator-hover-color);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    }

    &:hover::before {
      background-color: transparent;
      box-shadow: none;
    }
  }

  .title {
    margin-right: 7px;
    user-select: none;
    cursor: default;
  }

  :global(.theme-light) .select-container::after {
    background-image: url("../../assets/images/select-arrows-light.png");
  }
</style>
