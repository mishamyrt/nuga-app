<script lang="ts">
import { backlightColors, changingColor, setBacklightColor, state } from '@stores/lights'
import { onMount } from 'svelte'
import ColorPicker from 'svelte-awesome-color-picker'

import Button from './Button.svelte'

let visible = false

let hex: string = '#fff000'
let rgb = { r: 0, g: 0, b: 0, a: 1 }

onMount(() => {
  const mode = state.backlight.get().mode
  const targetIndex = $changingColor ?? 0
  const color = $backlightColors[mode][targetIndex]
  rgb = {
    r: color.R,
    g: color.G,
    b: color.B,
    a: 1
  }
  setTimeout(() => {
    visible = true
  }, 20)
})

function hideModal (): void {
  visible = false
  setTimeout(() => {
    changingColor.set(undefined)
  }, 350)
}

async function applyColor (): Promise<void> {
  await setBacklightColor({
    R: rgb.r,
    G: rgb.g,
    B: rgb.b
  })
  hideModal()
}
</script>

<div
  class:visible
  class="modal-wrapper">
  <div class="modal">
    <div class="color-wrapper">
      <ColorPicker
      isAlpha={false}
      canChangeMode={false}
      isInput={false}
      isTextInput={false}
      bind:rgb
      bind:hex
    />
    <div class="inputs">
      <div class="input-container">
        <input type="text" bind:value={hex}>
        <span class="label">HEX</span>
      </div>
      <div class="input-container">
        <input type="text" value="{rgb?.r}">
        <span class="label">R</span>
      </div>
      <div class="input-container">
        <input type="text" value="{rgb?.g}">
        <span class="label">G</span>
      </div>
      <div class="input-container">
        <input type="text" value="{rgb?.b}">
        <span class="label">B</span>
      </div>
    </div>
    </div>
    <div class="actions">
      <Button label="Cancel" on:click={hideModal} />
      <Button label="Done" variant="primary" on:click={applyColor} />
    </div>
  </div>
</div>

<style lang="scss">
  .modal-wrapper {
    background-color: rgb(23 23 23 / 51%);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 999;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease-out;

    &.visible {
      opacity: 1;
      pointer-events: all;
    }
  }

  .modal {
    background: #1E1E1E;
    width: 270px;
    border-radius: 10px;
    border: 1px solid #4B4B4B;
    box-shadow: 0 14px 25px rgb(0 0 0 / 50%);
    transition: transform .3s ease-out;
    transform: translateY(-30px);
  }

  .visible .modal {
    transform: translateY(0);
  }

  .color-wrapper {
    padding: 18px 18px 0;
  }

  .label {
    font-size: 13px;
    opacity: 0.2;
  }

  .inputs {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 8px;
    margin-top: 6px;
  }

  .actions {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 12px;
    padding: 13px 18px;
    gap: 8px;
    border-top: 1px solid rgb(41 41 41 / 100%);
  }

  input {
    width: 100%;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #3D3D3D;
    background: #292929;
    font-size: 13px;
    padding: 3px;
  }

  /* stylelint-disable-next-line */
  :global(.wrapper.isOpen) {
    --picker-width: 210px;
    --picker-height: 210px;

    background: transparent;
    border: none;
    padding: 0;
    margin: 0;

    :global(.picker-wrapper) {
      overflow: unset;
    }

    :global(.slider-wrapper) {
      border-radius: 4px;
    }

    :global(.picker-indicator) {
      background: none;
      border: 2px solid white;
    }
  }

  :global(.picker) {
    border-radius: 4px;
    border: 1px solid #3D3D3D;
  }
</style>
