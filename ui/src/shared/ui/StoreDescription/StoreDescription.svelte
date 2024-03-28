<script lang="ts">
  import { FormGroup, FormRow } from '@naco-ui/svelte'
  import type { Store } from 'effector'

  export let store: Store<any>

  $: value = JSON.stringify($store, null, 2)
</script>

<FormGroup>
  <FormRow>
    <div class="store-description">
      {value}
    </div>
  </FormRow>
</FormGroup>

<style lang="scss">
  .store-description {
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
    color: var(--color-content-primary);
    font-size: 12px;
  }
</style>
