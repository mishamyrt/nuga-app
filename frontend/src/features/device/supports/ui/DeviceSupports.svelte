<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { type Supports, supportsStore } from '$entities/device'

  export let capability: keyof Supports
</script>

<div class="supports" use:fsd={'features/DeviceSupports'}>
  {#if $supportsStore[capability]}
    <slot />
  {:else}
    <slot name="not-supported" />
  {/if}
</div>

<style lang="scss">
  .supports {
    display: contents;
  }
</style>
