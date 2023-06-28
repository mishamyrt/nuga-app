<script lang="ts">
  import Switch from "../components/Switch.svelte";
import LightsPreview from "../components/LightsPreview.svelte";
  import { backlight, backlightModes, halo, haloModes, setBacklightEffect, setHaloEffect, setSidelightEffect, sidelight, sidelightModes } from "../stores/lights";
  import LightParams from "../components/LightParams.svelte";
</script>

<div class="lights">
  <div class="heading">
    <h3>Lights</h3>
    <div class="preview">
      <LightsPreview />
    </div>
  </div>
  <div class="scroll-wrapper">
    <div class="form">
      <LightParams
        state={backlight}
        write={setBacklightEffect}
        modes={backlightModes}
        title="Backlight" />
      <LightParams
        write={setHaloEffect}
        state={halo}
        modes={haloModes}
        title="Halo"
      />
      <LightParams
        write={setSidelightEffect}
        state={sidelight}
        modes={sidelightModes}
        title="Sidelight"
      />
    </div>
  </div>
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
    overflow-y: auto;
    max-height: calc(100vh - 172px);
  }
</style>
