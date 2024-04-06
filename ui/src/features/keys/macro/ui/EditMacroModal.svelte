<script lang="ts">
  import { Button, FormGroup, FormRow, getTheme, Modal, ModalActions, Stack } from '@naco-ui/svelte'

  import { TransparentInput, TransparentInputNumber } from '$shared/ui/TransparentInput'

  import {
    editedMacroRemoved,
    editedMacroSubmitted,
    macroRepeatsChanged,
    macroRepeatsStore,
    macroTitleChanged,
    macroTitleStore,
    modalClosed,
    showMacroModalStore,
    stepDelayAdded,
    stepKeystrokeAdded,
    stepsStore
  } from '../model'
  import MacroSteps from './MacroSteps.svelte'

  const { os } = getTheme()

  function handleClose () {
    modalClosed()
  }

  function handleNameChange (e: CustomEvent<string>) {
    macroTitleChanged(e.detail)
  }

  function handleRepeatsChange (e: CustomEvent<number>) {
    macroRepeatsChanged(e.detail)
  }

  function handleSubmit () {
    editedMacroSubmitted()
    modalClosed()
  }

  function handleDelete () {
    editedMacroRemoved()
    modalClosed()
  }

  $: open = $showMacroModalStore
  $: canSave = $macroTitleStore !== '' && $macroRepeatsStore > 0 && $stepsStore.length > 0
</script>

<Modal fixed {open} width={$os === 'linux' ? 800 : 600}>
  <Stack gap="m">
    <MacroSteps />
    <Stack gap="m" justify="start" direction="horizontal">
      <Button on:click={() => stepKeystrokeAdded()}>Add keystroke</Button>
      <Button
        disabled={$stepsStore.length === 0}
        on:click={() => stepDelayAdded()}>
        Add wait
      </Button>
      <Button disabled>Record</Button>
    </Stack>
    <FormGroup>
      <FormRow title="Name">
        <TransparentInput
          value={$macroTitleStore}
          align="right"
          on:change={handleNameChange}
        />
      </FormRow>
      <FormRow title="Repeats count">
        <TransparentInputNumber
          value={$macroRepeatsStore}
          align="right"
          on:change={handleRepeatsChange}
        />
      </FormRow>
    </FormGroup>
  </Stack>
  <ModalActions slot="actions">
    <Stack direction="horizontal" justify="space-between">
      <Button on:click={handleDelete} color="error">Delete</Button>
      <Stack gap="m" justify="end" direction="horizontal">
        <Button on:click={handleClose}>Cancel</Button>
        <Button on:click={handleSubmit} disabled={!canSave} primary>OK</Button>
      </Stack>
    </Stack>
  </ModalActions>
</Modal>
