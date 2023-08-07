<script lang="ts">
  import questionIcon from '../assets/images/questionmark_icon@2x.png'
  export let message: string

  let showHelp = false
  let cleanUpTimeout

  function handleShowHelp (): void {
    if (cleanUpTimeout) {
      window.clearTimeout(cleanUpTimeout)
    }
    showHelp = true
  }

  function handleLeave (): void {
    cleanUpTimeout = window.setTimeout(() => {
      showHelp = false
    }, 700)
  }

</script>

<div style:--icon-url="url({questionIcon})" class="container">
  <button on:click={handleShowHelp} on:mouseleave={handleLeave}>
  </button>
  <div class:visible={showHelp} class="help">
    <p>{message}</p>
  </div>
</div>

<style lang="scss">
  .container {
    position: relative;
    top: -4px;
  }

  .help {
    position: absolute;
    pointer-events: none;
    right: -10px;
    top: 27px;
    width: 192px;
    font-size: 12px;
    background-color: rgba(60, 60, 60, 0.75);
    -webkit-backdrop-filter: blur(8px);
    z-index: 100;
    border-radius: 5px;
    padding: 10px;
    line-height: 1.3;
    text-align: left;
    border: 1px solid #4B4B4B;
    box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.36);
    opacity: 0;
    transform: scale(0.9);
    transition: .2s ease-out;

    &.visible {
      transform: scale(1);
      opacity: 1;
    }

    p {
      margin: 0;
    }
  }

  button {
    appearance: none;
    background-image: var(--icon-url);
    background-color: #5E5E5E;
    width: 20px;
    height: 20px;
    background-size: contain;
    border: none;
    border-radius: 50%;
    box-shadow: 0px 0.5px 0.5px 0px rgba(249, 243, 243, 0.30) inset, 0px 1px 1px 0px rgba(0, 0, 0, 0.25);

    &:active {
      background-color: #767676;
    }
  }
</style>
