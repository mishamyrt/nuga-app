<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  export let ctrl = false
  export let shift = false
  export let alt = false
  export let meta = false
  export let key: string
  export let dimmed: boolean = false
</script>

<div class="shortcut" use:fsd={'entities/KeyShortcut'}>
  <span class="modifier" class:dimmed class:active={ctrl}>⇧</span>
  <span class="modifier" class:dimmed class:active={shift}>⌃</span>
  <span class="modifier" class:dimmed class:active={alt}>⌥</span>
  <span class="modifier" class:dimmed class:active={meta}>⌘</span>
  <span class="key">{key}</span>
</div>

<style lang="scss">
  .shortcut {
    display: flex;
    align-items: center;
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
