<script lang="ts">
  import { Select } from '@naco-ui/svelte'

  import {
    type KeyboardThemeName,
    keyboardThemeNameStore,
    keyboardThemeUpdated,
  } from '$entities/keys'

  import { themeOptions } from '../lib'

  function handleChange (e: CustomEvent<string>) {
    keyboardThemeUpdated(e.detail as KeyboardThemeName)
  }
</script>

<Select
  value={$keyboardThemeNameStore}
  on:change={handleChange}
  options={themeOptions}
/>
