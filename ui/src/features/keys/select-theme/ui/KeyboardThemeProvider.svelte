<script lang="ts">
  import { getTheme } from '@naco-ui/svelte'

  import { keyboardThemeStore } from '$entities/keys'

  const { scheme } = getTheme()

  $: theme = $keyboardThemeStore
  $: colors = theme[$scheme]
</script>

<div
  style:--key-color-dark={colors.dark}
  style:--key-color-light={colors.light}
  style:--key-color-mint={colors.mint}
  style:--key-color-orange={colors.orange}
  style:--key-color-yellow={colors.yellow}
  style:--key-text-color-light={colors.textLight}
  style:--key-text-color-dark={colors.textDark}
  class="keyboard-theme-provider"
>
  <slot />
</div>

<style lang="scss">
  .keyboard-theme-provider {
    display: contents;
  }
</style>
