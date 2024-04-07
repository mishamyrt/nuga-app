<svelte:options immutable={true}/>
<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import type { KeyboardTemplate, KeyComponentType } from '../model/types'

  export let keyComponent: KeyComponentType
  export let template: KeyboardTemplate
  export let width: number
  export let reduceColors = false

  $: columnWidth = (width / template.columns)
  $: rowHeight = columnWidth * 3.4
  $: borderRadius = columnWidth / 2.2
  $: rows = template.keys.length
  $: fontSize = columnWidth * 1.1
</script>

<div class="abstract-keyboard" use:fsd={'entities/AbstractKeyboard'}>
  <div
    class="keys"
    class:reduce-colors={reduceColors}
    style:--keyboard-width="{width}px"
    style:--keyboard-row-height="{rowHeight}px"
    style:--keyboard-columns="{template.columns}"
    style:--keyboard-rows="{rows}"
    style:--keyboard-gap="{borderRadius}px"
    style:--key-border-radius="{borderRadius}px"
  >
    {#each template.keys as row, y }
      {#each row as key, x }
        {#if key.code === 'spacer'}
          <div class="spacer"
            style:--key-width="{key.width}" />
        {:else}
          <div
            class="key"
            style:--key-width="{key.width}"
            style:--key-height="{key.height}"
            style:--key-font-size="{fontSize}px"
            style:--key-text-color={key.color === 'dark' ? 'var(--key-text-color-light)' : 'var(--key-text-color-dark)'}
            >
            <div
              class="base"
              style:--key-color="var(--key-color-{key.color})" />
            <svelte:component this={keyComponent} {key} location={[x, y]} />
          </div>
        {/if}
      {/each}
    {/each}
  </div>
</div>

<style lang="scss">
  .abstract-keyboard {
    display: flex;
    justify-content: center;
  }

  .keys {
    display: grid;
    width: var(--keyboard-width);
    grid-template-columns: repeat(var(--keyboard-columns), 1fr);
    grid-auto-rows: var(--keyboard-row-height);
    gap: var(--keyboard-gap);

    &.reduce-colors {
      --key-color-mint: var(--key-color-dark);
      --key-color-orange: var(--key-color-dark);
      --key-color-yellow: var(--key-color-dark);
    }
  }

  .key {
    grid-column: span var(--key-width);
    grid-row: span var(--key-height);
    position: relative;
  }

  .spacer {
    grid-column: span var(--key-width);
    height: var(--key-height);
  }

  .base {
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--key-color);
    border-radius: var(--key-border-radius);
  }
</style>
