<script lang="ts">
  import { type Supports, supportsStore } from '$entities/device'

  export let capability: keyof Supports
</script>

{#if $supportsStore[capability]}
  <slot />
{:else}
  <slot name="not-supported" />
{/if}
