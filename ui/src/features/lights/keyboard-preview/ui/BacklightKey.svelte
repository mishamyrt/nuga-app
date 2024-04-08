<script lang="ts">
  import type { Key } from '$entities/keys'

  import { keyboardLightsColorStore } from '../model'

  export let key: Key
  export let location: [number, number]

  const [x, y] = location

  $: backlight = $keyboardLightsColorStore.backlight
  $: hasBacklight = backlight.length > 0
</script>

<div
  class="light"
  style:--key-light-color={hasBacklight ? backlight[y][x] : 'transparent'}
/>

<style lang="scss">
  .light {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s linear;
    // transition-delay: var(--key-delay);
    background-color: var(--key-light-color);
    border-radius: var(--key-radius);
    opacity: 0.4;
  }
</style>
