<script lang="ts">
import { type SelectOption, RadioButtons } from '@components/Select'
import Switch from '@components/Switch.svelte'
import {
  type OSMode,
  individual,
  osMode,
  connection,
  setOS,
  setIndividual
} from '@stores/device'

const osModeOptions: SelectOption[] = [
  { title: 'mac', value: 'mac' },
  { title: 'win', value: 'win' }
]

function handleModeChange (e: CustomEvent<string>): void {
  setOS(e.detail as OSMode)
}

function handleSettingsModeChange (e: CustomEvent<boolean>): void {
  setIndividual(e.detail)
}

$: deviceInfo = $connection
</script>

<div class="device">
  <h3>Device</h3>
  <div class="form">
    <div class="form-group">
      <div class="form-rows">
        {#if deviceInfo}
        <div class="form-row centered">
          <span>Name</span>
          <span>{deviceInfo.name}</span>
        </div>
        <div class="form-row centered">
          <span>Path</span>
          <span>{deviceInfo.path}</span>
        </div>
        <div class="form-row centered">
          <span>Firmware version</span>
          <span>{deviceInfo.firmware}</span>
        </div>
        {/if}
        <div class="form-row centered">
          <span>Individual mode settings</span>
          <Switch
            on:click={handleSettingsModeChange}
            checked={$individual} />
        </div>
        <div class="form-row centered">
          <span>System mode</span>
          <RadioButtons
            disabled={!$individual}
            on:change={handleModeChange}
            value={$osMode}
            options={osModeOptions} />
        </div>
      </div>
    </div>
  </div>
</div>
