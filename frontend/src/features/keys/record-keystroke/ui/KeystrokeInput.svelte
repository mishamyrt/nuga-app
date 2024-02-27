<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'
  import { createEventDispatcher, onDestroy } from 'svelte'

  import { type KeyAction, keyMapStore, KeyShortcut } from '$entities/keys'

  import { defaultKeystroke, keystrokeFromEvent } from '../lib'

  const dispatch = createEventDispatcher()

  export let keyCode: string = 'none'

  let keystroke: KeyAction = defaultKeystroke
  let recording = false

  function handleKeyDown (e: KeyboardEvent) {
    if (e.code === 'Escape') {
      e.preventDefault()
      stopRecording()
      return
    }
    const nextKeystroke = keystrokeFromEvent(e)
    if (nextKeystroke.key !== 'none') {
      e.preventDefault()
      stopRecording()
      dispatch('input', nextKeystroke)
    }
    keystroke = nextKeystroke
  }

  function handleKeyUp (e: KeyboardEvent) {
    keystroke = keystrokeFromEvent(e)
  }

  function handleMouseDown () {
    stopRecording()
  }

  function startRecording () {
    recording = true
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('mousedown', handleMouseDown)
  }

  function stopRecording () {
    recording = false
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
    window.removeEventListener('mousedown', handleMouseDown)
  }

  onDestroy(() => {
    if (recording) {
      stopRecording()
    }
  })

  $: keyAction = recording ? keystroke : $keyMapStore[keyCode] ?? defaultKeystroke
</script>

<div use:fsd={'features/KeystrokeInput'}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={startRecording}
    class="preview"
    class:active={recording}
    role="button"
    tabindex="0"
  >
    <KeyShortcut
      key={keyAction?.key}
      dimmed={recording}
      ctrl={keyAction.modifiers?.ctrl}
      shift={keyAction.modifiers?.shift}
      alt={keyAction.modifiers?.alt}
      meta={keyAction.modifiers?.meta}
    />
  </div>
</div>

<style lang="scss">
  .preview {
    background-color: transparent;
    border-radius: var(--border-radius-l);
    transition: var(--transition-default);
    transition-property: background-color, outline;
    outline: 0 solid transparent;
    padding: var(--space-xxs) var(--space-s);
    min-width: 110px;

    &.active {
      transition-duration: 0s;
      outline: var(--space-xxs) solid var(--color-content-accent-translucent);
      background-color: var(--color-background-tertiary);
    }
  }
</style>
