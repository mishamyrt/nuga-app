<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import { getShortName, keyNameFromEvent } from '../lib'
  import StepInput from './StepInput.svelte'

  const dispatch = createEventDispatcher()

  export let keyName: string

  let active = false
  let input: HTMLInputElement

  function handleKeyDown (e: KeyboardEvent) {
    e.preventDefault()
    const key = keyNameFromEvent(e)
    if (key !== 'none') {
      dispatch('input', key)
      input.blur()
    }
  }

  function startRecording () {
    active = true
    input.focus()
  }

  function handleFocus () {
    active = true
  }

  function handleBlur () {
    active = false
  }

  $: name = getShortName(keyName)
</script>

<StepInput {active} on:click={startRecording}>
  <div class="step-keystroke">
    {name}
    <input
      bind:this={input}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:keydown={handleKeyDown}
      class="step-input"
      value={name}
    />
  </div>
</StepInput>

<style lang="scss">
  .step-keystroke {
    position: relative;
  }

  .step-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
  }
</style>
