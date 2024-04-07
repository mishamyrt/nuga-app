<script lang="ts">
  import { Select } from '@naco-ui/svelte'

  import {
    type KeyboardThemeName,
    keyboardThemeNameStore,
    keyboardThemeUpdated
  } from '$entities/keys'

  function handleChange (e: CustomEvent<string>) {
    keyboardThemeUpdated(e.detail as KeyboardThemeName)
  }
</script>
<Select value={$keyboardThemeNameStore} on:change={handleChange} options={[
  { title: 'Default', value: 'defaultDarkTheme' },
  { title: 'Default (light)', value: 'defaultLightTheme' },
  { title: 'Light Gray And White', value: 'lightGrayAndWhiteTheme' }
]} />
