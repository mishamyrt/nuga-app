<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { getShortName } from '../lib'

  export let ctrl = false
  export let shift = false
  export let alt = false
  export let meta = false
  export let key: string
  export let dimmed: boolean = false

  const modifierStrings = ['ctrl', 'shift', 'alt', 'meta']

  $: isModifiersVisible = !modifierStrings.some(m => key.includes(m))
  $: symbol = key === 'none' ? '' : getShortName(key)
</script>

<div class="shortcut" use:fsd={'entities/KeyShortcut'}>
  {#if isModifiersVisible}
    <span class="modifier" class:dimmed class:active={shift}>⇧</span>
    <span class="modifier" class:dimmed class:active={ctrl}>⌃</span>
    <span class="modifier" class:dimmed class:active={alt}>⌥</span>
    <span class="modifier" class:dimmed class:active={meta}>⌘</span>
  {/if}
  <span class="key">{symbol}</span>
</div>

<style lang="scss">
  .shortcut {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: var(--space-s);
    font: var(--typography-heading-l);
    color: var(--color-content-primary);
  }

  .modifier {
    color: var(--color-content-quaternary);

    &.dimmed {
      opacity: 0.2;
    }

    &.active {
      color: var(--color-content-primary);
      opacity: 1;
    }
  }
</style>
