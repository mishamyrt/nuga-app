<script lang="ts">
  import { type Key, keySelected, selectedKeyStore } from '$entities/keys'

  export let key: Key
  export let location: [number, number]

  function handleClick (e: MouseEvent) {
    e.preventDefault()
    keySelected(key.code)
  }

  $: active = $selectedKeyStore === key.code
</script>

<div class="key" class:active on:click={handleClick}>{key.code}</div>

<style lang="scss">
  .key {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: var(--transition-default);
    transition-property: box-shadow;
    border-radius: var(--key-radius);
  }

  .active {
    box-shadow: inset 0 0 0 4px var(--color-content-accent);
  }
</style>
