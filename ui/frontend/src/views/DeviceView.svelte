<script lang="ts">
import RadioButtons from "@components/RadioButtons.svelte";
import type { SelectOption } from "@components/Select";
import Switch from "@components/Switch.svelte";
import { individualSettings, osMode, setMode, type OSMode } from "@stores/app";
import { device } from "@stores/device";

const osOptions: SelectOption[] = [
  { title: 'mac', value: 'mac' },
  { title: 'win', value: 'win' },
]

function handleModeChange(e: CustomEvent<string>) {
  osMode.set(e.detail as OSMode)
  setMode()
}

function handleSettingsModeChange(e: CustomEvent<boolean>) {
  individualSettings.set(e.detail)
  setMode()
}

$: deviceInfo = $device
</script>

<div class="device">
  <h3>Device</h3>
  <div class="form">
    <div class="form-group">
      <div class="form-rows">
        <div class="form-row">
          <span>Name</span>
          <span>{deviceInfo.name}</span>
        </div>
        <div class="form-row">
          <span>Path</span>
          <span>{deviceInfo.path}</span>
        </div>
        <div class="form-row">
          <span>Individual mode settings</span>
          <Switch
            on:click={handleSettingsModeChange}
            checked={$individualSettings} />
        </div>
        <div class="form-row">
          <span>System mode</span>
          <RadioButtons
            disabled={!$individualSettings}
            on:change={handleModeChange}
            value={$osMode}
            options={osOptions} />
        </div>
      </div>
    </div>
  </div>
</div>
