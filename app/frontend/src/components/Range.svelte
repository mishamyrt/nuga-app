<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let type: 'brightness' | 'speed'
  export let disabled = false
  export let value: number = 0

  const dispatch = createEventDispatcher()

  function handleChange (e: { currentTarget: HTMLInputElement }): void {
    dispatch('change', parseInt(e.currentTarget.value, 10))
  }
</script>

<div class={`range-container ${type}`} class:disabled>
  <div class="range">
    <input {value} on:change={handleChange} type="range" min="0" step="1" max="4" />
    <!-- Using these instead of a list property for full customization -->
    <div class="mark"></div>
    <div class="mark"></div>
    <div class="mark"></div>
    <div class="mark"></div>
    <div class="mark"></div>
  </div>
  <div class="icon min"></div>
  <div class="icon max"></div>
</div>

<style lang="scss">
  .range-container {
    margin: 0 calc(28px + 3px + 3px);
    position: relative;
    left: 5px;

    &.disabled {
      opacity: 0.35;
      pointer-events: none;
    }
  }

  .range {
    position: relative;

    input {
      appearance: none;
      background: transparent;

      &::-webkit-slider-runnable-track {
        background: rgb(211 211 211 / 20%);
        height: 4px;
      }

      &::-webkit-slider-thumb {
        z-index: 1;
        appearance: none;
        background-color: #A6A6A6;
        width: 8px;
        border-radius: 15px;
        height: 20px;
        position: relative;
        top: -8px;
        box-shadow: 0 1px 1px rgb(0 0 0 / 30%);
      }

      &::-webkit-slider-thumb:active {
        background-color: #D6D6D6;
      }
    }
  }

  .mark {
    z-index: 0;
    width: 2px;
    height: 8px;
    background-color: #626262;
    position: absolute;
    border-radius: 4px;
    top: 7px;
    left: 2px;

    &:nth-child(2) {
      left: calc(25% + 2px);
    }

    &:nth-child(3) {
      left: calc(50% - 1px);
    }

    &:nth-child(4) {
      left: calc(75% - 4px);
    }

    &:nth-child(5) {
      left: calc(100% - 4px);
    }
  }

  .icon {
    position: absolute;
    width: 28px;
    height: 28px;
    background-size: contain;
    top: -3px;

    &.min {
      left: -34px;
    }

    &.max {
      right: -34px;
    }
  }

  .brightness {
    .min {
      background-image: url("../assets/images/sun.min.fill.png");
    }

    .max {
      background-image: url("../assets/images/sun.max.fill.png");
    }
  }

  .speed {
    .min {
      background-image: url("../assets/images/tortoise.fill.png");
    }

    .max {
      background-image: url("../assets/images/hare.fill.png");
    }
  }
</style>
