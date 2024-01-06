<script lang="ts">
  import { Select, type SelectOption } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { appSettingsChanged, appSettingsStore, type AppTheme } from '$entities/app'

  const themeOptions: SelectOption[] = [
    { title: 'Auto', value: 'auto' },
    { title: 'Light', value: 'light' },
    { title: 'Dark', value: 'dark' }
  ]

  function handleChange (e: CustomEvent<string>) {
    appSettingsChanged({
      ui: $appSettingsStore.ui,
      theme: e.detail as AppTheme
    })
  }

</script>

<div use:fsd={'features/AppDarkThemeToggle'}>
  <Select
    options={themeOptions}
    value={$appSettingsStore.theme}
    on:change={handleChange}
  />
</div>
