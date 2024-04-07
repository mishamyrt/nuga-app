<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { cheatInputStarted, cheatListeningStore } from '$shared/model'

  function handleClick (e: MouseEvent) {
    if (e.metaKey || e.ctrlKey) {
      cheatInputStarted()
      e.preventDefault()
    }
  }
</script>

<div use:fsd={'entities/AppLogo'}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <h1 class="logo" class:active={$cheatListeningStore} on:click={handleClick}>
    Nuga
  </h1>
</div>

<style lang="scss">
  .logo {
    user-select: none;
    font-family: var(--typography-font-family);
    margin: 0;
    font-size: 32px;
    line-height: 1.2;
    color: var(--color-content-primary);
    opacity: 0.2;
    transition: var(--transition-slow);

    &.active {
      color: var(--color-content-accent);
      opacity: 0.6;
    }
  }
</style>
