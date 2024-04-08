<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { AbstractKeyboard, keyboardTemplateStore } from '$entities/keys'

  import { keyboardLightsColorStore } from '../model'
  import BacklightKey from './BacklightKey.svelte'

  $: sidelightColor = $keyboardLightsColorStore.sidelight
  $: haloColor = $keyboardLightsColorStore.halolight
  $: template = $keyboardTemplateStore
  $: isSidelightRandom = sidelightColor === 'random'
  $: isHaloRandom = haloColor === 'random'
</script>

<div class="lights-container" use:fsd={'features/KeyboardLights'}>
  <div class="lights-wrapper">
    <div
      class="sidelight"
      class:random={isSidelightRandom}
      style:--light-color={sidelightColor}
    />
    <div class="halo" class:random={isHaloRandom} style:--light-color={haloColor} />
    <AbstractKeyboard
      width={300}
      keyComponent={BacklightKey}
      reduceColors
      {template}
    />
  </div>
</div>

<style lang="scss">
  .lights-container {
    --lights-transition: 0.25s ease-out;
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

  .lights-wrapper {
    position: relative;
  }

  .halo,
  .halo::before {
    padding: 3px;
    outline: 3px solid var(--light-color);
    transition: outline-color var(--lights-transition);
    border-radius: 6px;
    position: absolute;
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
  }

  .halo::before,
  .halo::after {
    content: '';
    display: block;
    outline-color: var(--light-color-background);
    top: 0;
    left: 0;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
  }

  .halo::after {
    outline: none;
    border-radius: 9px;
    border: 3px solid transparent;
    background:
      conic-gradient(
        from 125deg at 50% 50%,
        #F75B60,
        #FF9E0C,
        #ADE403,
        #27C4FF,
        #7F83FF,
        #913ED3,
        #E54895,
        #E73A46
      )
      border-box;
    mask:
      linear-gradient(#FFF 0 0) padding-box,
      linear-gradient(#FFF 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    position: relative;
    left: -6px;
    top: -6px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    opacity: 0;
    transition: opacity var(--lights-transition);
  }

  .halo.random::after {
    opacity: 0.5;
  }

  .sidelight {
    width: 24px;
    height: 3px;
    background: var(--light-color-background);
    border-radius: 10px;
    position: absolute;
    top: -12px;

    &::after,
    &::before {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      top: 0;
      transition:
        background-color var(--lights-transitions),
        opacity var(--lights-transitions);
      left: 0;
      background-color: var(--light-color);
      opacity: 1;
    }

    &::after {
      background: linear-gradient(90deg, #63ECFF 0%, #E960FF 100%);
      opacity: 0;
    }

    &.random::before {
      opacity: 0;
    }

    &.random::after {
      opacity: 0.6;
    }
  }
</style>
