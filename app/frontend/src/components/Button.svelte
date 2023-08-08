<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let label: string = ''
  export let variant: 'bubble' | 'primary' | 'default' = 'default'
  export let disabled = false
  export let autosize = false
  const dispatch = createEventDispatcher()

  function handleClick (): void {
    dispatch('click')
  }
</script>

<button {disabled}
  on:click={handleClick}
  class:autosize
  class:primary={variant === 'primary'}
  class:bubble={variant === 'bubble'}
>{label}</button>

<style lang="scss">
  button {
    font-size: 13px;
    border: none;
    appearance: none;
    border-radius: 5px;
    background: #565656;
    width: 64px;
    border-top: 0.5px solid rgb(255 255 255 / 22%);

    &.autosize {
      width: unset;
      padding: 2px 10px;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &:active {
      background: #767676;
    }

    &.primary {
      background: linear-gradient(180deg, #3978DE 0%, #336CC5 100%);

      &:active {
        background: #457AEB;
      }
    }

    &.bubble {
      background: rgb(255 255 255 / 11%);
      border: none;
      border-radius: 5px;
      padding: 8px 12px;

      &:active {
        background: rgb(255 255 255 / 7%);
      }
    }
  }

</style>
