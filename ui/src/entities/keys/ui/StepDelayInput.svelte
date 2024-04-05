<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import StepInput from './StepInput.svelte'

  export let value: number
  let input: HTMLInputElement
  let active = false

  const dispatch = createEventDispatcher()

  function handleClick (e: Event) {
    if (active) {
      return
    }
    e.preventDefault()
    input.focus()
  }

  function handleInputFocus (e: Event) {
    e.preventDefault()
    active = true
  }

  const allowedKeys = [
    'Backspace',
    'Delete'
  ]

  function handleInputKeyDown (e: KeyboardEvent) {
    if (e.code === 'Escape' || e.code === 'Enter') {
      e.preventDefault()
      active = false
    }
    if (e.metaKey || e.ctrlKey) {
      return
    }
    const input = e.target as HTMLInputElement
    if (input.value === '0' && !allowedKeys.includes(e.code)) {
      e.preventDefault()
    }
    if (!e.code.startsWith('Digit') && !allowedKeys.includes(e.code)) {
      e.preventDefault()
    }
  }

  function handleInputBlur (e: Event) {
    if (input.value === '') {
      value = 0
    } else if (value > 65280) {
      value = 65280
    }
    e.preventDefault()
    input.value = value.toString()
    dispatch('input', value)
    active = false
  }

</script>

<StepInput {active} on:click={handleClick}>
  <div class="container">
    <input
      type="number"
      class="delay-input"
      class:visible={active}
      bind:this={input}
      bind:value
      on:keydown={handleInputKeyDown}
      on:click={handleClick}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur}
    />
    <span class="value" class:hidden={active}>
      {value}
    </span>
    ms
  </div>
</StepInput>

<style lang="scss">
  .container {
    position: relative;
  }

  .delay-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: white;
    appearance: none;
    font: var(--typography-heading-s);
    border: none;
    outline: none;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;

    &.visible {
      opacity: 1;
      pointer-events: all;
    }

    &:focus {
      outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
  }

  .value {
    &.hidden {
      opacity: 0;
    }
  }
</style>
