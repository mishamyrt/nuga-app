<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'
  import { not } from 'patronum'

  import { AbstractKeyboard, keyboardTemplateStore, supportsKeyStore } from '$entities/keys'

  import SelectableKey from './SelectableKey.svelte'

  const disabledStore = not(supportsKeyStore)

  $: disabled = disabledStore
  $: template = $keyboardTemplateStore
</script>

<div class="selectable-keyboard" class:disabled use:fsd={'features/SelectableKeyboard'}>
  <AbstractKeyboard width={500} {template} keyComponent={SelectableKey} />
</div>

<style lang="scss">
  .selectable-keyboard {
    display: flex;
    justify-content: center;

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
