<script lang="ts">
  import Switch from "../components/Switch.svelte";
import LightsPreview from "../components/LightsPreview.svelte";
  import { state, modes, setBacklight, setHalo, setSidelight } from "@stores/lights";
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
        state={state.backlight}
        write={setBacklight}
        modes={modes.backlight}
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
