<script lang="ts">
  import { onMount } from 'svelte'
  import cable from '../assets/images/cable.connector.svg'
  import { connect, startSimulation } from '@stores/device'
  import { connected, loadVersion } from '@stores/app'
  import { sleep } from '../utils/timing'
  import { sync } from '@stores/lights/actions'

  export let hide = false

  let showHelp = false

  onMount(async () => {
    setTimeout(() => {
      showHelp = true
    }, 1500)
    await Promise.all([
      loadVersion(),
      connect(),
      sleep(1000)
    ]).catch(console.error)
    connected.set(true)
    sync.start()
  })
</script>

<div class="loading" class:ready={hide} >
  <div class="help" class:show={showHelp}>
    <img alt="Wails logo" id="logo" src="{cable}">
    <h1>Looking for compatible <span on:dblclick={startSimulation}>keyboard</span></h1>
    <p>Make sure your device is plugged in</p>
  </div>
  <div class="spinner-container">
    <div class="spinner">
      {#each Array(12) as _, index (index)}
        <div class="spinner-blade"></div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .help {
    opacity: 0;
    transition: opacity .2s ease-out;

    &.show {
      opacity: 1;
    }
  }

  .spinner-container {
    transition: opacity .2s ease-out;
  }

  .loading {
    z-index: 999;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    background-color: var(--color-background-main);
    border-left: 1px solid transparent;
    transition:
      transform .2s ease-out,
      border-left-color .2s ease-out,
      opacity .3s ease-out .2s;
    position: absolute;
    opacity: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &.ready {
      transform: translateX(211px);
      border-left-color: rgb(1 1 1 / 41.2%);
      opacity: 0;
      pointer-events: none;

      .help,
      .help.show,
      .spinner-container {
        opacity: 0;
      }
    }
  }

  h1 {
    font-weight: 500;
    font-size: 18px;
  }

  p {
    opacity: 0.5;
    font-size: 13px;
  }

.spinner {
  opacity: 0.7;
  font-size: 24px;
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
}

.spinner-blade {
  position: absolute;
  left: .4629em;
  bottom: 0;
  width: .074em;
  height: .2777em;
  border-radius: .5em;
  background-color: transparent;
  transform-origin: center -.2222em;
  animation: spinner-fade 1s infinite linear;

  $animation-delay: 0s;
  $blade-rotation: 0deg;

  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      animation-delay: $animation-delay;
      transform: rotate($blade-rotation);
      $blade-rotation: $blade-rotation + 30;
      $animation-delay: $animation-delay + .083;
    }
  }
}

@keyframes spinner-fade {
  0% {
    background-color: white;
  }

  100% {
    background-color: transparent;
  }
}

</style>
