<script lang="ts">
import ColorPickerModal from '@components/ColorPickerModal.svelte'
import Keyboard from '@components/Keyboard/KeyboardLights.svelte'
import LightParams from '@components/LightParams.svelte'
import { connection } from '@stores/device'
import { synchronizer } from '@stores/lights/actions'
import { backlightModeColors, editableColor, haloModes, sidelightModes } from '@stores/lights/atoms'
import { onDestroy, onMount } from 'svelte'

onMount(() => {
  synchronizer.start()
})

onDestroy(() => {
  synchronizer.pause()
})
</script>

<div class="lights">
  <div class="heading">
    <h3>Lights</h3>
    <div class="preview">
      {#if $connection}
      <Keyboard
        layout={$connection.name} />
      {/if}
    </div>
  </div>
  <div class="scroll-wrapper">
    <div class="form">
      <LightParams
        colors={$backlightModeColors}
        domain='backlight'
        title="Backlight"
        canChangeColor
      />

      {#if $haloModes.length > 0}
        <LightParams
          domain='halo'
          title="Halo"
        />
      {/if}
      {#if $sidelightModes.length > 0}
        <LightParams
          help="The result of the Sidelight settings will only be visible if the keyboard is fully charged."
          domain='sidelight'
          title="Sidelight"
        />
      {/if}
    </div>
  </div>
  {#if $editableColor !== undefined}
  <ColorPickerModal />
  {/if}
</div>

<style lang="scss">
  .heading {
    background: linear-gradient(180deg, transparent 0%, rgb(0 0 0 / 5%) 100%);
    min-height: 186px;
    border-bottom: 1px solid var(--color-line);
  }

  .scroll-wrapper {
    overflow-y: scroll;
    height: calc(100vh - 186px);
  }

  .preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  :global(.linux) {
    .heading {
      background: none;
      border-bottom: 1px solid rgb(1 1 1 / 41.2%);
    }

    .preview {
      height: 184px;
    }
  }
</style>
