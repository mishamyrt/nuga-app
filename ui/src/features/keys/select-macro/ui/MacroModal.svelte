<script lang="ts">
  import { Button, FormGroup, FormRow, getTheme, Modal, ModalActions, Stack, Typography } from '@naco-ui/svelte'
  import { createEventDispatcher } from 'svelte'

  import { macroStore } from '$entities/keys'

  import MacroSteps from './MacroSteps.svelte'

  export let open = false
  export let index: number

  const dispatch = createEventDispatcher()

  const { os } = getTheme()

  function handleClose () {
    dispatch('close')
  }

  $: isNew = index === -1
  $: name = isNew ? `Macro ${$macroStore.length}` : $macroStore[index].title
  $: repeats = isNew ? 1 : $macroStore[index].repeats
</script>

<Modal fixed {open} width={$os === 'linux' ? 800 : 600}>
  <Stack gap="m">
    <MacroSteps {index} />
    <FormGroup>
      <FormRow title="Name">
        <Typography>{name}</Typography>
      </FormRow>
      <FormRow title="Repeats count">
        <Typography>{repeats}</Typography>
      </FormRow>
    </FormGroup>
  </Stack>
  <ModalActions slot="actions">
    <Stack direction="horizontal" justify="space-between">
      <Stack gap="m" justify="start" direction="horizontal">
        <Button disabled>Add keystroke</Button>
        <Button disabled>Add wait</Button>
        <Button disabled>Record</Button>
      </Stack>
      <Stack gap="m" justify="end" direction="horizontal">
        <Button on:click={handleClose}>Cancel</Button>
        <Button disabled on:click={handleClose} primary>OK</Button>
      </Stack>
    </Stack>
  </ModalActions>
</Modal>
