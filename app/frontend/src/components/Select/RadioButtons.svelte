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
  .radio-buttons {
    --radio-background: #363636;
    --radio-active-background: #686868;
    --radio-border: #464646;

    display: flex;
    background-color: var(--radio-background);
    border: 1px solid var(--radio-border);
    border-radius: 6px;

    &.disabled {
      opacity: 0.4;
    }
  }

  :global(.theme-light) .radio-buttons {
    --radio-background: #E6E6E6;
    --radio-active-background: #FFF;
    --radio-border: #DADADA;
  }

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
      background-color: var(--radio-active-background);
    }
  }

  .radio-button {
    position: relative;
    display: block;
    margin: 1px;
    padding: 1px 13px;
  }

  .title {
    z-index: 2;
    position: relative;
    font-weight: 500;
  }
</style>
