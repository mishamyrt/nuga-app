<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { pages } from '$pages'
  import { activePage } from '$shared/model'
</script>

<div use:fsd={'app/Content'} class="content">
  <svelte:component this={pages[$activePage].Content} />
</div>

<style lang="scss">
  .content {
    flex: 1;
  }
</style>
