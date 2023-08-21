<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { SelectOption } from './types'

  export let value: string = ''
  export let options: SelectOption[] = []
  export let disabled: boolean = false
  const dispatch = createEventDispatcher()

  function handleChange (e: { currentTarget: HTMLInputElement }): void {
    dispatch('change', e.currentTarget.value)
  }

</script>

<div class:disabled class="radio-buttons">
  {#each options as option}
    <label class="radio-button">
      <input
        on:change={handleChange}
        checked={value === option.value}
        type="radio"
        name="drone"
        value={option.value}
        disabled={disabled}>
      <span class="title">
        {option.title}
      </span>
    </label>
  {/each}
</div>

<style lang="scss">
  input {
    appearance: none;
    background-color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    margin: 0;
    border-radius: 4px;

    &:checked {
      background-color: #686868;
    }
  }

  .radio-button {
    position: relative;
    display: block;
    margin: 1px;
    padding: 1px 13px;
  }

  .radio-buttons {
    display: flex;
    background-color: #363636;
    border: 1px solid #454545;
    border-radius: 6px;

    &.disabled {
      opacity: 0.4;
    }
  }

  .title {
    z-index: 2;
    position: relative;
    font-weight: 500;
  }
</style>
