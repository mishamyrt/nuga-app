<script lang="ts">
import RadioButtons from '@components/RadioButtons.svelte'
import { Select, type SelectOption } from '@components/Select'
import Switch from '@components/Switch.svelte'
import { individualSettings, osMode, setMode, type OSMode, os, type OS, theme, version } from '@stores/app'
import { device } from '@stores/device'

const osModeOptions: SelectOption[] = [
  { title: 'mac', value: 'mac' },
  { title: 'win', value: 'win' }
]

const osOptions: SelectOption[] = [
  { title: 'macOS', value: 'mac' },
  { title: 'Linux (Ubuntu)', value: 'linux' }
]

function handleOSChange (e: CustomEvent<string>): void {
  os.set(e.detail as OS)
}

function handleThemeChange (e: CustomEvent<boolean>): void {
  theme.set(e.detail ? 'dark' : 'light')
}

function handleModeChange (e: CustomEvent<string>): void {
  osMode.set(e.detail as OSMode)
  setMode()
}

function handleSettingsModeChange (e: CustomEvent<boolean>): void {
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
        <div class="form-row centered">
          <span>Individual mode settings</span>
          <Switch
            on:click={handleSettingsModeChange}
            checked={$individualSettings} />
        </div>
        <div class="form-row centered">
          <span>System mode</span>
          <RadioButtons
            disabled={!$individualSettings}
            on:change={handleModeChange}
            value={$osMode}
            options={osModeOptions} />
        </div>
      </div>
    </div>
    {#if $version === 'dev'}
    <div class="form-group">
      <div class="form-rows">
        <div class="form-row centered">
          <span>Operating system</span>
          <Select
            on:change={handleOSChange}
            options={osOptions}
            value={$os} />
        </div>
        <div class="form-row centered">
          <span>Dark theme</span>
          <Switch
            on:click={handleThemeChange}
            checked={$theme === 'dark'} />
        </div>
      </div>
    </div>
    {/if}
  </div>
</div>
