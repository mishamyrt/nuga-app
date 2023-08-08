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

<div class="container">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="var(--color-text)" fill-opacity=".8" d="M9.721 11.987c.503 0 .822-.314.85-.716 0-.03 0-.079.009-.118.027-.5.347-.834.94-1.256C12.425 9.269 13 8.7 13 7.571 13 5.942 11.63 5 10.005 5c-1.562 0-2.63.765-2.914 1.688a1.62 1.62 0 0 0-.091.51c0 .481.347.775.767.775.539 0 .658-.294.94-.628.293-.49.677-.775 1.215-.775.722 0 1.197.442 1.197 1.1 0 .598-.384.922-1.16 1.49-.649.492-1.123.992-1.123 1.875v.108c0 .56.32.844.885.844ZM9.703 15c.585 0 1.069-.451 1.069-1.08 0-.618-.475-1.079-1.069-1.079-.593 0-1.077.461-1.077 1.08 0 .618.484 1.079 1.077 1.079Z"/></svg>
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

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .help {
    position: absolute;
    pointer-events: none;
    right: -10px;
    top: 27px;
    width: 192px;
    font-size: 12px;
    background-color: var(--color-input-background);
    backdrop-filter: blur(8px);
    z-index: 100;
    border-radius: 5px;
    padding: 10px;
    line-height: 1.3;
    text-align: left;
    border: 1px solid #4B4B4B;
    box-shadow: 0 6px 12px -2px rgb(0 0 0 / 36%);
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
    background-color: var(--color-input-background);
    width: 20px;
    height: 20px;
    background-size: contain;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0.5px 0.5px 0 rgb(249 243 243 / 30%) inset, 0 1px 1px 0 rgb(0 0 0 / 25%);

    &:active {
      background-color: #767676;
    }
  }
</style>
