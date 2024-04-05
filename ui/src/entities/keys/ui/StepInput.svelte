<script lang="ts">
  export let active = false
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="step-input" class:active on:click role="button" tabindex="0">
  <slot />
</div>

<style lang="scss">
  .step-input {
    position: relative;
    margin-left: var(--space-s);
    padding: var(--space-xs);
    color: var(--color-content-accent);

    &::before {
      content: ' ';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--color-content-accent);
      opacity: 0.1;
      border-radius: var(--border-radius-s);
    }

    &.active {
      color: white;

      &::before {
        opacity: 1;
      }
    }
  }
</style>
