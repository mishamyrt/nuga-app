<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'
  import { createEventDispatcher, onDestroy } from 'svelte'

  import { KeyActionType, keyMapStore, KeyShortcut, type KeystrokeAction, selectedKeyStore } from '$entities/keys'

  import { defaultKeystroke, keystrokeFromEvent } from '../lib'

  const dispatch = createEventDispatcher()

  export let keyCode: string = 'none'

  let keystroke: KeystrokeAction = defaultKeystroke
  let recording = false

  function handleKeyDown (e: KeyboardEvent) {
    if (e.code === 'Escape') {
      e.preventDefault()
      stopRecording()
      return
    }
    const nextKeystroke = keystrokeFromEvent(e)
    if (nextKeystroke.keystroke.key !== 'none') {
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
    keystroke = defaultKeystroke
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
  $: disabled = $selectedKeyStore.readonly
</script>

<div use:fsd={'features/KeystrokeInput'}>
  {#if keyAction.type === KeyActionType.Keystroke}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
    on:click={startRecording}
    class="preview"
    class:disabled
    class:active={recording}
    role="button"
    tabindex="0"
  >
    <KeyShortcut
      key={keyAction.keystroke.key}
      dimmed={recording}
      ctrl={keyAction.keystroke?.modifiers?.ctrl}
      shift={keyAction.keystroke?.modifiers?.ctrl}
      alt={keyAction.keystroke.modifiers?.alt}
      meta={keyAction.keystroke.modifiers?.meta}
    />
  </div>
  {/if}
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

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &.active {
      transition-duration: 0s;
      outline: var(--space-xxs) solid var(--color-content-accent-translucent);
      background-color: var(--color-background-tertiary);
    }
  }
</style>
