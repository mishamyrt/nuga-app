<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { pages } from '$pages'
  import { activePage } from '$shared/model'
</script>

<div use:fsd={'app/Content'} class="content">
  <svelte:component this={pages[$activePage].Content} />
</div>
<div class="border" />

<style lang="scss">
  .content {
    flex: 1;
  }

  :global(.os-mac) .border {
    position: fixed;
    pointer-events: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99999;
    box-shadow: inset 0 0 0 1px var(--color-border-secondary);
    border-radius: 11px;
  }
</style>
