<script lang="ts">
  import { Button, FormGroup, FormRow, Stack, Typography } from '@naco-ui/svelte'

  import { actionChanged, isKeysSettingStore, KeyActionType, keyMapStore, macrosStore } from '$entities/keys'
  import { MoreButton } from '$shared/ui'

  import { macroCreated, macroEdited } from '../model'

  export let keyCode: string

  let hovered: number | undefined

  function handleCreate () {
    macroCreated()
  }

  function handleEdit (i: number) {
    macroEdited(i)
  }

  function setHovered (e: CustomEvent<boolean>, i: number | undefined) {
    if (e.detail) {
      hovered = i
    } else {
      hovered = undefined
    }
  }

  function dispatchMacroChange (i: number) {
    actionChanged({
      key: keyCode,
      action: {
        type: KeyActionType.Macro,
        macro: i
      }
    })
  }

  $: macros = $macrosStore
  $: selectedAction = $keyMapStore[keyCode]
  $: keyMacroIndex = selectedAction?.type === 'macro' ? selectedAction.macro : -1
</script>

<FormGroup>
  {#each macros as macro, i}
    <FormRow on:hover={(e) => setHovered(e, i)}>
      <div class="macro-row">
        <div class="selected-mark" class:visible={keyMacroIndex === i}>
          ✓
        </div>
        <Typography>{macro.title}</Typography>
        <Stack align="center" justify="end" direction="horizontal" gap="l">
          <div class="select-button" class:visible={hovered === i && keyMacroIndex !== i}>
            <Button disabled={$isKeysSettingStore} on:click={() => dispatchMacroChange(i)}>
              Select
            </Button>
          </div>
          <MoreButton on:click={() => handleEdit(i)} />
        </Stack>
      </div>
    </FormRow>
  {/each}
</FormGroup>
<div class="add">
  <Stack direction="horizontal" align="start" justify="space-between">
    <div class="caption">
      <Typography variant="caption-s" color="tertiary">The macro will start working after closing the Nuga application.</Typography>
    </div>
    <Button on:click={handleCreate}>
      Add macro...
    </Button>
  </Stack>
</div>

<style lang="scss">
  .add {
    margin-top: var(--space-m);
    display: flex;
    justify-content: flex-end;
  }

  .caption {
    width: 180px;
  }

  .macro-row {
    display: grid;
    grid-template-columns: 20px 1fr 1fr;
    align-items: center;
  }

  .select-button {
    visibility: hidden;

    &.visible {
      visibility: visible;
    }
  }

  .selected-mark {
    visibility: hidden;
    font: var(--typography-heading-m);
    color: var(--color-content-primary);

    &.visible {
      visibility: visible;
    }
  }
</style>
