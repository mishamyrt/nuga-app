<script lang="ts">
  import deepEqual from 'deep-equal'

  import { defaultKeyMapStore, type Key, keyMapStore, keySelected, selectedKeyStore } from '$entities/keys'
  import { getShortName } from '$entities/keys/lib'

  export let key: Key
  export let location: [number, number]

  const symbol = getShortName(key.code)

  function handleClick (e: MouseEvent) {
    e.preventDefault()
    keySelected(key)
  }

  $: dark = key.color === 'dark'
  $: active = $selectedKeyStore.code === key.code
  $: defaultAction = $defaultKeyMapStore[key.code]
  $: custom = !deepEqual(defaultAction, $keyMapStore[key.code])
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="key"
  class:dark
  class:active
  class:custom
  on:click={handleClick}
  role="button"
  tabindex="0"
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
    transition-property: background-color, color;
    border-radius: var(--key-border-radius);
    font-family:
      var(--typography-glyphs-font-family),
      var(--typography-font-family);
    font-weight: 500;
    font-size: var(--key-font-size);
    text-align: center;
    padding-top: var(--space-xxs);
    background-color: transparent;
    cursor: default;

    &.dark {
      color: white;
    }

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
      box-shadow: 0 0 0 6px transparent;
    }
  }

  .custom {
    background-color: var(--color-content-accent-translucent);
  }

  .active {
    background-color: var(--color-content-accent);
    transition-duration: 0s;
    color: white;

    &::after {
      box-shadow: 0 0 0 2px var(--color-content-accent);
    }
  }
</style>
