<script lang="ts">
  import type { KeyboardTemplate, LightMap } from './types'
  import type { PreviewColor } from '@stores/lights/types'
  import Color from 'colorjs.io'

  export let colorless = false
  export let template: KeyboardTemplate
  export let lights: PreviewColor | LightMap
  export let backlight: boolean = false

  const color = new Color('#0578FF')
  const gradient = color.range('#FF014D', {
    space: 'lch', // interpolation space
    outputSpace: 'srgb'
  })

  $: lightsMap = (() => {
    return template.keys.map((row, i) => row.map((_, j) => {
      if (lights === undefined) {
        return 'transparent'
      } else if (lights === 'random') {
        return gradient((i / (template.keys.length - 1)) + (j * 0.02)).toString()
      } else if (Array.isArray(lights)) {
        const color = lights[i][j]
        return `rgb(${color.R},${color.G},${color.B})`
      } else {
        const color = lights
        return `rgb(${color.R},${color.G},${color.B})`
      }
    }))
  })()
</script>

<div class="container">
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
          <div style:--key-delay="{(i * 20) + (j * 10)}ms" class="key"
            style:--key-width="{key.width}"
            style:--key-row-height="{key.height}">
            {#if backlight}
            <div class="key-light" style:--key-light-color="{lightsMap[i][j]}" />
            {/if}
            <div class="key-fill"
              style:--key-color="var(--key-color-{key.color})" />
          </div>
        {/if}
      {/each}
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
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
    opacity: 0.3;
  }

  .key-light+.key-fill {
    opacity: 0.6;
  }

  .spacer {
    grid-column: span var(--key-width);
    height: var(--key-height);
  }
</style>
