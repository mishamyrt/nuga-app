<svelte:options immutable={true}/>
<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import type { KeyboardTemplate, KeyHighlightMatrix } from '../model/types'

  export let template: KeyboardTemplate
  export let highlights: KeyHighlightMatrix = []
  export let colorless = false

  $: hasHighlights = highlights.length > 0
</script>

<div class="keyboard-container" use:fsd={'entities/KeyboardKeys'}>
  <div
    class="keys"
    class:colorless
    style:--keyboard-columns="{template.columns}"
  >
    {#each template.keys as row, i }
      {#each row as key, j }
        {#if key.code === 'spacer'}
          <div class="spacer"
            style:--key-width="{key.width}" />
        {:else}
          <div class="key"
            style:--key-delay="{(i * 20) + (j * 10)}ms"
            style:--key-width="{key.width}"
            style:--key-row-height="{key.height}">
            <div class="key-light"
              style:--key-light-color="{hasHighlights ? highlights[i][j] : 'transparent'}" />
            <div class="key-fill"
              style:--key-color="var(--key-color-{key.color})" />
          </div>
        {/if}
      {/each}
    {/each}
  </div>
</div>

<style lang="scss">
  .keyboard-container {
    display: flex;
    justify-content: center;
  }

  .keys {
    --key-color-dark: #757575;
    --key-color-light: rgb(196 196 196);
    --key-color-mint: rgb(46 218 151);
    --key-color-orange: rgb(226 121 80 / 100%);
    --key-color-yellow: rgb(195 164 0);
    --key-height: 23px;
    --key-column-width: 6.7px;
    --key-radius: 3px;
    --key-gap: 3px;

    display: grid;
    width: calc(var(--keyboard-columns) * var(--key-column-width));
    grid-template-columns: repeat(var(--keyboard-columns), 1fr);
    grid-auto-rows: var(--key-height);
    gap: var(--key-gap);

    &.colorless {
      --key-color-mint: var(--key-color-dark);
      --key-color-orange: var(--key-color-dark);
      --key-color-yellow: var(--key-color-dark);
    }
  }

  .key {
    grid-column: span var(--key-width);
    grid-row: span var(--key-row-height);
    border-radius: var(--key-radius);
    position: relative;
  }

  .key-fill,
  .key-light {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: background-color .3s linear;
    transition-delay: var(--key-delay);
    background-color: var(--key-color);
    border-radius: var(--key-radius);
    z-index: 1;
  }

  .key-light {
    z-index: 2;
    background-color: var(--key-light-color);
    opacity: 0.4;
  }

  .key-light+.key-fill {
    opacity: 0.6;
  }

  .spacer {
    grid-column: span var(--key-width);
    height: var(--key-height);
  }
</style>
