<script lang="ts">
  import { Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { pages } from '$pages'
  import { activePage } from '$shared/model'

  $: toolbar = pages[$activePage].Toolbar
  $: title = pages[$activePage].title
</script>

<div class="toolbar" use:fsd={'app/Toolbar'}>
  {#if toolbar}
    <svelte:component this={toolbar} />
  {:else if title}
    <div class="titlebar">
      <Typography variant="heading-s">{title}</Typography>
    </div>
  {/if}
</div>

<style lang="scss">
  .titlebar {
    padding: 0 var(--space-sl);
    height: 100%;
    align-items: center;
    display: flex;
  }

  .toolbar {
    flex: 1;
    height: 100%;
  }
</style>
