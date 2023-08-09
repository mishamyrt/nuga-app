<script lang="ts">
  import LightParams from '@components/LightParams.svelte'
  import ColorPickerModal from '@components/ColorPickerModal.svelte'
  import {
    state,
    domains,
    color,
    setBacklight, setHalo, setSidelight, backlightColors, changingColor
  } from '@stores/lights'
  import { device } from '@stores/device'
  import Keyboard from '@components/Keyboard/KeyboardLights.svelte'

  const backlightColor = color.backlight
  const sidelightColor = color.sidelight
  const haloColor = color.halo

  const backlightState = state.backlight

  const haloDomain = domains.halo
  const sidelightDomain = domains.sidelight

  $: colors = $backlightColors[$backlightState.mode]
</script>

<div class="lights">
  <div class="heading">
    <h3>Lights</h3>
    <div class="preview">
      <Keyboard
        sidelight={$sidelightColor}
        halo={$haloColor}
        backlight={$backlightColor}
        layout={$device.name} />
    </div>
  </div>
  <div class="scroll-wrapper">
    <div class="form">
      <LightParams
        {colors}
        state={state.backlight}
        write={setBacklight}
        modes={domains.backlight}
        canChangeColor
        title="Backlight" />
      {#if $haloDomain.length > 0}
        <LightParams
          write={setHalo}
          state={state.halo}
          modes={haloDomain}
          title="Halo"
        />
      {/if}
      {#if $sidelightDomain.length > 0}
        <LightParams
          help="The result of the Sidelight settings will only be visible if the keyboard is fully charged."
          write={setSidelight}
          state={state.sidelight}
          modes={sidelightDomain}
          title="Sidelight"
        />
      {/if}
    </div>
  </div>
  {#if $changingColor !== undefined}
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
