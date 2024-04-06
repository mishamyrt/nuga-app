<script lang="ts">
  import { FormGroup, FormRow, Select, Stack, Typography } from '@naco-ui/svelte'

  import { actionChanged, keyMapStore } from '$entities/keys'
  import { getShortName } from '$entities/keys/lib'
  import type { KeyAction } from '$entities/keys/model/types'
  import { CustomActionToggle, KeyActionSelect, KeystrokeInput, SelectMacros } from '$features/keys'

  export let keyCode: string
  export let secondary: boolean = false

  let selectedType = 'none'

  function handleChange (e: CustomEvent<KeyAction>) {
    actionChanged({
      key: keyCode,
      action: e.detail
    })
  }

  function handleTypeChange (e: CustomEvent<string>) {
    selectedType = e.detail
  }

  $: action = $keyMapStore[keyCode]
  $: currentType = action?.type ?? 'none'
  $: currentType && (() => {
    selectedType = currentType
  })()
  $: keyTitle = getShortName(keyCode)

</script>

<FormGroup title={secondary ? `Fn + ${keyTitle}` : undefined}>
  <FormRow title="Custom">
    <CustomActionToggle {keyCode} on:restore={handleChange} />
  </FormRow>
  <FormRow align="center" title="Type">
    <Select bind:value={selectedType} on:change={handleTypeChange} options={[
      { value: 'none', title: 'None', disabled: true },
      { value: 'keystroke', title: 'Keystroke' },
      { value: 'macro', title: 'Macro' }
    ]} />
  </FormRow>
  {#if selectedType === 'keystroke'}
  <FormRow>
    <Stack align="center" justify="space-between" direction="horizontal">
      <Typography>Action</Typography>
      <KeyActionSelect {keyCode} on:input={handleChange} />
    </Stack>
  </FormRow>
  <FormRow title="Keystroke">
    <KeystrokeInput {keyCode} on:input={handleChange} />
  </FormRow>
  {/if}
</FormGroup>
{#if selectedType === 'macro'}
  <SelectMacros {keyCode} />
{/if}
