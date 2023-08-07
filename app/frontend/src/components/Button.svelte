<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let label: string = ''
  export let variant: 'warning' | 'primary' | 'default' = 'default'
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
  class:warning={variant === 'warning'}
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

    &.warning {
      background: linear-gradient(180deg, #E26A4F 0%, #B84228 100%);

      &:active {
        background: #AB432C;
      }
    }
  }

</style>
