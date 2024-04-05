<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import { keystrokeFromEvent } from '$features/keys/record-keystroke/lib'

  import { getShortName } from '../lib'
  import StepInput from './StepInput.svelte'

  const dispatch = createEventDispatcher()

  export let keyName: string

  let isRecording = false

  function handleKeyDown (e: KeyboardEvent) {
    e.preventDefault()
    const { keystroke } = keystrokeFromEvent(e)
    if (keystroke.key !== 'none') {
      dispatch('input', keystroke.key)
      stopRecording()
    }
  }

  function handleMouseDown () {
    stopRecording()
  }

  function startRecording () {
    isRecording = true
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)
  }

  function stopRecording () {
    isRecording = false
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('mousedown', handleMouseDown)
  }

  $: name = getShortName(keyName)
</script>

<StepInput active={isRecording} on:click={startRecording}>
  <div class="step-keystroke">
    {name}
  </div>
</StepInput>

<style lang="scss">
  .step-keystroke {
    position: relative;
  }
</style>
