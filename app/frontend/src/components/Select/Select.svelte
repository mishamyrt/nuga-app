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
      <option value={option.value}>{option.title}</option>
    {/each}
  </select>
  <span class="title">{selected?.title}</span>
</div>

<style lang="scss">
  select {
    color: rgb(255 255 255 / 70%);
    font-size: 13px;
    font-family: sans-serif;
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
    padding: 2px 15px 3px 13px;
    border-radius: 5px;

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
      background: url("../../assets/images/select-arrows.png");
      background-size: contain;
      position: absolute;
      right: 2px;
      top: 1px;
      pointer-events: none;
    }

    &::before {
      background: #414141;
      position: absolute;
      border-radius: 3px;
      box-shadow: 0 1px 1px rgb(0 0 0 / 20%);
    }

    &:hover {
      background-color: #606060;
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
</style>
