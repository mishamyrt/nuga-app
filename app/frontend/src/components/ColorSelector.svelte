<script lang="ts">
  import { type Color, defaultColors } from '@stores/lights'
  import { createEventDispatcher } from 'svelte'

  export let disabled = false
  export let random = false
  export let selected = 0
  export let colors: readonly Color[] = defaultColors
  export let canChange = false

  const dispatch = createEventDispatcher()

  function handleClick (i: number): void {
    dispatch('change', i)
  }

  function handleEditColor (e: MouseEvent, i: number): void {
    e.preventDefault()
    if (canChange) {
      // changingColor.set(i)
    }
  }
</script>

<div class="color-selector" class:disabled>
  {#if random}
    <div
      on:click={() => handleClick(7)}
      class:selected={selected === 7}
      class="color random">
    </div>
  {/if}
  {#each colors as c, i}
    <div
      on:click={() => handleClick(i)}
      on:contextmenu={e => handleEditColor(e, i)}
      on:dblclick={e => handleEditColor(e, i)}
      class="color"
      class:selected={i === selected}
      style={`--color: ${c.R} ${c.G} ${c.B}`}>
    </div>
  {/each}
</div>

<style lang="scss">
  .color {
    width: 16px;
    height: 16px;
    position: relative;
    border-radius: 50%;
    background-color: rgb(var(--color) / 80%);
    box-shadow: inset 0 0 0 1px rgb(255 255 255 / 15%);

    &.random {
      background: conic-gradient(
        from 125deg at 50% 50%,
        #E9393E 0deg,
        #FF9E0C 56.25deg,
        #ADE403 110.6250deg,
        #27C4FF 163.125deg,
        #5055DE 213.75deg,
        #913ED3 258.75deg,
        #E54895 305.6250deg,
        #E73A46 360deg
      );

      &::before {
        display: none;
      }
    }

    &::before,
    &.selected::after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: 50%;
      height: 100%;
      background: linear-gradient(180deg, rgb(156 156 156 / 39%) 0%, rgb(99 99 99 / 37%) 100%);
    }

    &::before {
      opacity: 0.7;
    }
    // linear-gradient(180deg, #282828 0%, #323232 100%);
    &.selected::after {
      width: 6px;
      height: 6px;
      left: 5px;
      top: 5px;
      background: white;
      box-shadow: 0 1px 1px rgb(0 0 0 / 20%);
    }
  }

  .color-selector {
    display: flex;
    position: relative;
    gap: 10px;

    &.disabled {
      .color {
        background-color: #707070;
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
</style>
