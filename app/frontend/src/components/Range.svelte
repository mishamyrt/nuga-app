<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  type RangeType = 'brightness' | 'speed'

  interface Labels {
    min: string
    max: string
  }

  const labels: Record<RangeType, Labels> = {
    brightness: {
      min: 'Dark',
      max: 'Bright'
    },
    speed: {
      min: 'Slow',
      max: 'Fast'
    }
  }

  export let type: RangeType
  export let disabled = false
  export let value: number = 0
  export let min = 0
  export let max = 4

  const dispatch = createEventDispatcher()

  function handleChange (e: { currentTarget: HTMLInputElement }): void {
    dispatch('change', parseInt(e.currentTarget.value, 10))
  }
</script>

<div class={`range-container ${type}`} class:disabled>
  <div class="range">
    <input {value} on:change={handleChange} type="range" {min} step="1" {max} />
    <!-- Using these instead of a list property for full customization -->
    <div class="marks">
      {#each Array((max - min) + 1) as _, index (index)}
        <div class="mark"></div>
      {/each}
    </div>
  </div>
  <div class="label min">
    {labels[type].min}
  </div>
  <div class="label max">
    {labels[type].max}
  </div>
</div>

<style lang="scss">
  .range-container {
    position: relative;
    padding-bottom: 13px;
    left: 5px;
    top: -2px;

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
      width: 174px;

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

  .marks {
    position: relative;
    top: -8px;
    display: flex;
    justify-content: space-between;
    padding: 0 2px;
  }

  .mark {
    z-index: 0;
    width: 2px;
    height: 8px;
    background-color: #626262;
    border-radius: 4px;
  }

  .label {
    font-size: 10px;
    position: absolute;
    bottom: 1px;
    opacity: 0.9;

    &.min {
      left: 2px;
    }

    &.max {
      right: 3px;
    }
  }
</style>
