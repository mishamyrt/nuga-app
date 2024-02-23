<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { KeyboardKeys, keyboardTemplateStore } from '$entities/keys'

  $: template = $keyboardTemplateStore
</script>

<div class="lights-container" use:fsd={'features/KeyboardLights'}>
  <KeyboardKeys {template} />
</div>

<style lang="scss">
  .lights-container {
    --lights-transition: .25s ease-out;
    --light-color-background: rgb(134 134 134 / 38%);
    --key-color-dark: #757575;
    --key-color-light: rgb(196 196 196);
    --key-color-mint: rgb(46 218 151);
    --key-color-orange: rgb(226 121 80 / 100%);
    --key-color-yellow: rgb(195 164 0);
    --key-height: 23px;
    --key-column-width: 6.7px;
    --key-radius: 3px;
    --key-gap: 3px;

    display: flex;
    justify-content: center;
  }
</style>
