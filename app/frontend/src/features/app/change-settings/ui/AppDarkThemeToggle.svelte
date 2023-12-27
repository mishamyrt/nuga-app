<script lang="ts">
  import { Toggle } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { appSettingsChanged, appSettingsStore } from '$entities/app'

  function handleChange (e: CustomEvent<boolean>) {
    appSettingsChanged({
      ui: $appSettingsStore.ui,
      theme: e.detail ? 'dark' : 'light'
    })
  }

</script>

<div use:fsd={'features/AppDarkThemeToggle'}>
  <Toggle
    on:change={handleChange}
    checked={$appSettingsStore.theme === 'dark'}
  />
</div>
