<script lang="ts">
import { Select, type SelectOption } from '@components/Select'
import Switch from '@components/Switch.svelte'
import { os, type OS, theme } from '@stores/app'

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
</script>

<div class="device">
  <h3>Application</h3>
  <div class="form">
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
  </div>
</div>
