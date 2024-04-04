<script lang="ts">
  import { Button, FormGroup, FormRow, Stack, Typography } from '@naco-ui/svelte'

  import { keyMapStore, macroStore } from '$entities/keys'
  import { MoreButton } from '$shared/ui'

  import MacroModal from './MacroModal.svelte'

  export let keyCode: string

  let showModal = false
  let selectedIndex = -1
  let hovered: string | undefined

  function handleCreate () {
    selectedIndex = -1
    showModal = true
  }

  function handleEdit (i: number) {
    selectedIndex = i
    showModal = true
  }

  function handleCloseModal () {
    showModal = false
  }

  function setHovered (e: CustomEvent<boolean>, title: string | undefined) {
    if (e.detail) {
      hovered = title
    } else {
      hovered = undefined
    }
  }

  $: macros = $macroStore
  $: selectedAction = $keyMapStore[keyCode]
  $: keyMacroIndex = selectedAction?.type === 'macro' ? selectedAction.macro : -1
</script>

<FormGroup>
  {#each macros as macro, i}
    <FormRow on:hover={(e) => setHovered(e, macro.title)}>
      <div class="macro-row">
        <div class="selected-mark" class:visible={keyMacroIndex === i}>
          ✓
        </div>
        <Typography>{macro.title}</Typography>
        <Stack align="center" justify="end" direction="horizontal" gap="l">
          <div class="select-button" class:visible={hovered === macro.title && keyMacroIndex !== i}>
            <Button disabled>
              Select
            </Button>
          </div>
          <MoreButton on:click={() => handleEdit(i)} />
        </Stack>
      </div>
    </FormRow>
  {/each}
  <MacroModal
    open={showModal}
    index={selectedIndex}
    on:close={handleCloseModal}
  />
</FormGroup>
<div class="add">
  <Button on:click={handleCreate}>
    Add macro...
  </Button>
</div>

<style lang="scss">
  .add {
    margin-top: var(--space-m);
    display: flex;
    justify-content: flex-end;
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
