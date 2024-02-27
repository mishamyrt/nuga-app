<script lang="ts">
  import { Button, FormGroup, FormRow, Modal, ModalActions, Select, Stack } from '@naco-ui/svelte'
  import { createEventDispatcher } from 'svelte'

  import { keyGroupsStore, keyNamesStore } from '$entities/keys'

  const dispatcher = createEventDispatcher()

  export let keyCode: string

  let showModal = false

  function handleOpen (e: MouseEvent) {
    e.preventDefault()
    showModal = true
  }

  function handleClose () {
    showModal = false
  }

  function handleActionClick (value: string) {
    dispatcher('input', value)
    handleClose()
  }

  $: title = $keyNamesStore[keyCode]
</script>

<div>
  <Select on:mousedown={handleOpen} value={title} options={[{ value: title, title }]} />
  <Modal open={showModal} width={400}>
    <Stack gap="m">
      {#each $keyGroupsStore as group}
      <FormGroup title={group.title}>
        {#each group.keys as key}
          <FormRow on:click={() => handleActionClick(key.value)} interactive title={key.title} />
        {/each}
      </FormGroup>
      {/each}
    </Stack>
    <ModalActions slot="actions">
      <Button on:click={handleClose}>Cancel</Button>
    </ModalActions>
  </Modal>
</div>
