<script lang="ts">
  import { Button, getTheme, Input, Modal, ModalActions, Stack, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'
  import ColorPicker from 'svelte-awesome-color-picker'

  import { backlightColorChanged, backlightColorsStore, hexToRGB, stateStore } from '$entities/lights'

  import { canEditColorStore } from '../model/store'

  let rgba = { r: 0, g: 0, b: 0, a: 1 }
  let hex = '#000000'

  let visible = false

  const { os } = getTheme()

  function handleClose (): void {
    visible = false
  }

  function handleOpen (): void {
    const { mode, color } = $stateStore.backlight
    hex = $backlightColorsStore[mode][color]
    const rgb = hexToRGB(hex)
    rgba = {
      r: rgb.R,
      g: rgb.G,
      b: rgb.B,
      a: 1
    }
    visible = true
  }

  function applyColor (): void {
    const { mode, color } = $stateStore.backlight
    backlightColorChanged({
      colorIndex: color,
      mode,
      color: {
        R: rgba.r,
        G: rgba.g,
        B: rgba.b
      }
    })
    visible = false
  }

  $: canEdit = $canEditColorStore
</script>

<div use:fsd={'features/LightsColorEditor'}>
  <Button disabled={!canEdit} on:click={handleOpen}>
    Edit
  </Button>
  <Modal fixed open={visible} width={$os === 'mac' ? 264 : 370}>
    <div class="color-editor">
      <Stack>
        <div class="picker">
          <ColorPicker
            isAlpha={false}
            canChangeMode={false}
            isInput={false}
            isTextInput={false}
            bind:rgb={rgba}
            bind:hex
          />
        </div>
        <div class="inputs">
          <Stack gap="xs">
              <Input fullWidth bind:value={hex} />
              <Typography variant="caption-s" color="tertiary">HEX</Typography>
          </Stack>
          <Stack gap="xs">
              <Input fullWidth value="{rgba?.r.toString()}" />
              <Typography variant="caption-s" color="tertiary">R</Typography>
          </Stack>
          <Stack gap="xs">
              <Input fullWidth value="{rgba?.g.toString()}" />
              <Typography variant="caption-s" color="tertiary">G</Typography>
          </Stack>
          <Stack gap="xs">
              <Input fullWidth value="{rgba?.b.toString()}" />
              <Typography variant="caption-s" color="tertiary">B</Typography>
          </Stack>
        </div>
      </Stack>
    </div>
    <ModalActions slot="actions">
      <Stack justify="end" direction="horizontal">
        <Button on:click={handleClose}>
          Cancel
        </Button>
        <Button primary on:click={applyColor}>
          Apply
        </Button>
      </Stack>
    </ModalActions>
  </Modal>
</div>

<style lang="scss">
  .color-editor {
    --picker-width: 210px;
    --picker-height: 210px;
  }

  :global(.os-linux) .color-editor {
    --picker-width: 283px;
    --picker-height: 283px;
  }

  .inputs {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 8px;
    margin-top: 6px;
  }

  /* stylelint-disable-next-line */
  .picker :global(.wrapper.isOpen) {
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
    border: 1px solid var(--modal-picker-border);
  }

  :global(.os-linux .wrapper.is-open) {
    --picker-width: 282px;
    --picker-height: 282px;
  }
</style>
