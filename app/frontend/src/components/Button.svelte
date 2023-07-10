<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let label: string = ''
  export let primary = false
  export let disabled = false
  const dispatch = createEventDispatcher()

  function handleClick (): void {
    dispatch('click')
  }
</script>

<button {disabled} on:click={handleClick} class:primary>{label}</button>

<style lang="scss">
  button {
    font-size: 13px;
    border: none;
    appearance: none;
    border-radius: 5px;
    background: #565656;
    width: 64px;
    border-top: 0.5px solid rgb(255 255 255 / 22%);

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
  }
</style>
