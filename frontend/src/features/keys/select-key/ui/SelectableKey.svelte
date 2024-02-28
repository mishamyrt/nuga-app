<script lang="ts">
  import { type Key, keySelected, selectedKeyStore } from '$entities/keys'
  import { getShortName } from '$entities/keys/lib'

  export let key: Key
  export let location: [number, number]

  const symbol = getShortName(key.code)

  function handleClick (e: MouseEvent) {
    e.preventDefault()
    keySelected(key)
  }

  $: active = $selectedKeyStore.code === key.code
</script>

<div
  class="key"
  class:active
  on:click={handleClick}
>
  {symbol}
</div>

<style lang="scss">
  .key {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: var(--transition-default);
    transition-property: background-color;
    border-radius: var(--key-border-radius);
    font-family: var(--typography-font-family);
    font-size: 10px;
    text-align: center;
    padding-top: var(--space-xxs);
    background-color: transparent;
    cursor: default;

    &::after {
      top: -4px;
      left: -4px;
      content: '';
      display: block;
      position: absolute;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      pointer-events: none;
      transition: var(--transition-default);
      border-radius: calc(var(--key-border-radius) + 4px);
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .active {
    background-color: var(--color-content-accent);
    transition-duration: 0s;

    &::after {
      box-shadow: 0 0 0 2px var(--color-content-accent);
    }
  }
</style>
