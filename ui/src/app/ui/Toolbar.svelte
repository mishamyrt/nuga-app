<script lang="ts">
  import { Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { pages } from '$pages'
  import { activePage } from '$shared/model'

  $: toolbar = pages[$activePage].Toolbar
  $: title = pages[$activePage].title
  $: isCustomBackground = pages[$activePage].layoutProps?.toolbar?.padding === 'none'
</script>

<div class="toolbar" class:gradient={isCustomBackground} use:fsd={'app/Toolbar'}>
  {#if toolbar}
    <svelte:component this={toolbar} />
  {:else if title}
    <div class="titlebar">
      <Typography variant="heading-m">{title}</Typography>
    </div>
  {/if}
</div>

<style lang="scss">
  .toolbar {
    flex: 1;
    height: 100%;

    &.gradient {
      background: var(--app-toolbar-background);
    }
  }

  :global(.os-mac.dark) .toolbar {
    --app-toolbar-background: linear-gradient(
      0deg,
      #323232,
      var(--color-background-secondary)
    );
  }

  :global(.os-mac.light) .toolbar {
    --app-toolbar-background: linear-gradient(
      0deg,
      #ebebeb,
      var(--color-background-secondary)
    );
  }

  :global(.os-linux.light) .toolbar {
    --app-toolbar-background: #ebebeb;
  }

  .titlebar {
    padding: 0 var(--space-sl);
    height: 100%;
    align-items: center;
    display: flex;
  }
</style>
