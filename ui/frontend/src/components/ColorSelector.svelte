<script lang="ts">
  import { defaultColors, type Color, changingColor } from "@stores/lights";
  import { createEventDispatcher } from "svelte";

  export let random = false
  export let selected = 0
  export let colors: readonly Color[] = defaultColors
  export let canChange = false

  const dispatch = createEventDispatcher()

  function handleClick(i: number) {
    dispatch('change', i)
  }

  function handleEditColor(e: MouseEvent, i: number) {
    e.preventDefault()
    if (canChange) {
      changingColor.set(i)
    }
  }
</script>

<div class="color-selector">
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
      style={`--color: rgb(${c.R}, ${c.G}, ${c.B})`}>
    </div>
  {/each}
</div>

<style lang="scss">
  .color-selector {
    display: flex;
    position: relative;
    gap: 10px;
  }
  .color {
    width: 16px;
    height: 16px;
    position: relative;
    border-radius: 50%;
    background-color: var(--color);

    &.random {
      background: conic-gradient(from 125deg at 50% 50%, #FF6861 0deg, #FEB445 63.74999821186066deg, #FFF848 127.49999642372131deg, #3BFF1C 174.375deg, #1CFFF1 228.75000715255737deg, #1C5BFF 273.7500071525574deg, #FF3AE0 313.1250071525574deg);

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
      background: linear-gradient(180deg, rgba(156, 156, 156, 0.39) 0%, rgba(99, 99, 99, 0.37) 100%);
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
    }
  }
</style>
