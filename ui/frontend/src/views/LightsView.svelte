<script lang="ts">
  import Switch from "../components/Switch.svelte";
  import LightsPreview from "../components/LightsPreview.svelte";
  import {
    state,
    modes,
    color,
    setBacklight, setHalo,setSidelight, backlightColors, changingColor

  } from "@stores/lights";
  import LightParams from "../components/LightParams.svelte";
  import ColorPickerModal from "@components/ColorPickerModal.svelte";

  const backlightColor = color.backlight
  const sidelightColor = color.sidelight
  const haloColor = color.halo

  const backlightState = state.backlight
  $: colors = $backlightColors[$backlightState.mode]
</script>

<div class="lights">
  <div class="heading">
    <h3>Lights</h3>
    <div class="preview">
      <LightsPreview
        sidelight={$sidelightColor}
        halo={$haloColor}
        backlight={$backlightColor}
      />
    </div>
  </div>
  <div class="scroll-wrapper">
    <div class="form">
      <LightParams
        {colors}
        state={state.backlight}
        write={setBacklight}
        modes={modes.backlight}
        canChangeColor
        title="Backlight" />
      <LightParams
        write={setHalo}
        state={state.halo}
        modes={modes.halo}
        title="Halo"
      />
      <LightParams
        write={setSidelight}
        state={state.sidelight}
        modes={modes.sidelight}
        title="Sidelight"
      />
    </div>
  </div>
  {#if $changingColor !== undefined}
  <ColorPickerModal />
  {/if}
</div>

<style lang="scss">
  .heading {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, #282828 0%, #323232 100%);
  }

  .preview {
    margin: 14px 0 20px;
  }

  .scroll-wrapper {
    overflow-y: scroll;
    height: calc(100vh - 172px);
  }
</style>
