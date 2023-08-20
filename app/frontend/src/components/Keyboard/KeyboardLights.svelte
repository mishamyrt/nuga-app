<script lang="ts">
  import type { PreviewColor } from '@stores/lights/types'
  import { layouts } from './layouts/index'
  import { buildTemplate } from './template'
  import BaseKeyboard from './BaseKeyboard.svelte'
  import Color from 'colorjs.io'

  export let backlight: PreviewColor
  export let halo: PreviewColor
  export let sidelight: PreviewColor
  export let layout: keyof typeof layouts | undefined

  function lineColor (color: PreviewColor): string {
    if (color === undefined || color === 'random') {
      return 'transparent'
    }
    const c = new Color(`rgb(${color.R},${color.G},${color.B})`)
    c.lch.l = 55
    c.lch.c = 50
    return c.toString()
  }

  $: haloRgb = lineColor(halo)
  $: backlightRgb = backlight
  $: sidelightRgb = lineColor(sidelight)

  $: template = layout ? buildTemplate(layouts[layout].layout) : undefined
</script>

{#if layout && template}
<div class="container">
  <div class="keyboard-wrapper">
    <div
      class="sidelight"
      class:random={sidelight === 'random'}
      style:--light-color="{sidelightRgb}"/>
    <div
      class="halo"
      class:random={halo === 'random'}
      style:--light-color="{haloRgb}" />
    <BaseKeyboard backlight lights={backlightRgb} colorless {template} />
  </div>
</div>
{/if}

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    position: relative;

    --lights-transition: .25s ease-out;
    --light-color-background: rgb(134 134 134 / 38%);
  }

  .keyboard-wrapper {
    transform: scale(0.7);
  }

  .halo,
  .halo::before {
    padding: 3px;
    outline: 3px solid var(--light-color);
    transition: outline-color var(--lights-transition);
    border-radius: 6px;
    position: absolute;
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
  }

  .halo::before,
  .halo::after {
    content: '';
    display: block;
    outline-color: var(--light-color-background);
    top: 0;
    left: 0;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
  }

  .halo::after {
    outline: none;
    border-radius: 9px;
    border: 3px solid transparent;
    background: conic-gradient(from 125deg at 50% 50%, #f75b60, #ff9e0c, #ade403, #27c4ff, #7f83ff, #913ed3, #e54895, #e73a46) border-box;
    mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    position: relative;
    left: -6px;
    top: -6px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    opacity: 0;
    transition: opacity var(--lights-transition);
  }

  .halo.random::after {
    opacity: 0.5;
  }

  .sidelight {
    width: 24px;
    height: 3px;
    background: var(--light-color-background);
    border-radius: 10px;
    position: absolute;
    top: -12px;

    &::after,
    &::before {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      top: 0;
      transition: background-color var(--lights-transitions), opacity var(--lights-transitions);
      left: 0;
      background-color: var(--light-color);
      opacity: 1;
    }

    &::after {
      background: linear-gradient(90deg, #63ECFF 0%, #E960FF 100%);
      opacity: 0;
    }

    &.random::before {
      opacity: 0;
    }

    &.random::after {
      opacity: 0.6;
    }
  }
</style>
