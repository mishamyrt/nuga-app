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
    border-bottom: 1px solid rgb(255 255 255 / 8%);
    background: linear-gradient(180deg, #282828 0%, #323232 100%);
    min-height: 186px;
  }

  .scroll-wrapper {
    overflow-y: scroll;
    height: calc(100vh - 204px);
  }
</style>
