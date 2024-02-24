<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'
  import { onDestroy } from 'svelte'

  import { KeyShortcut, selectedActionStore } from '$entities/keys'

  import { isRecordingStore, recordedKeystrokeStore, recordFinished, recordStarted } from '../model/store'

  $: isRecording = $isRecordingStore
  $: action = isRecording ? $recordedKeystrokeStore : $selectedActionStore

  function toggleRecording () {
    if (isRecording) {
      recordFinished()
    } else {
      recordStarted()
    }
  }

  onDestroy(recordFinished)
</script>

<div use:fsd={'features/RecordKeystroke'}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={toggleRecording}
    class="preview"
    class:active={isRecording}
    role="button"
    tabindex="0"
  >
    <KeyShortcut
      key={action.key}
      dimmed={isRecording}
      ctrl={action.modifiers.ctrl}
      shift={action.modifiers.shift}
      alt={action.modifiers.alt}
      meta={action.modifiers.meta}
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

    &.active {
      transition-duration: 0s;
      outline: var(--space-xxs) solid var(--color-content-accent-translucent);
      background-color: var(--color-background-tertiary);
    }
  }
</style>
