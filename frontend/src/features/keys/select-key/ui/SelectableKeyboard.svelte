<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { AbstractKeyboard, keyboardTemplateStore } from '$entities/keys'

  import SelectableKey from './SelectableKey.svelte'

  $: template = $keyboardTemplateStore
</script>

<div class="selectable-keyboard" use:fsd={'features/SelectableKeyboard'}>
  <AbstractKeyboard width={500} {template} keyComponent={SelectableKey} />
</div>

<style lang="scss">
  .selectable-keyboard {
    display: flex;
    justify-content: center;
  }
</style>
