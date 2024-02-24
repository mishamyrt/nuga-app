<script lang="ts">
  import { Button, FormGroup, FormRow, Modal, ModalActions, Select, Stack } from '@naco-ui/svelte'

  import { keyActionChanged, keyGroupsStore } from '$entities/keys'

  import { selectedNameStore } from '../model/store'

  let showModal = false

  function handleOpen (e: MouseEvent) {
    e.preventDefault()
    showModal = true
  }

  function handleClose () {
    showModal = false
  }

  function handleRowClick (value: string) {
    keyActionChanged({
      key: value,
      modifiers: {
        ctrl: false,
        shift: false,
        alt: false,
        meta: false
      }
    })
    showModal = false
  }

  $: title = $selectedNameStore
</script>

<div>
  <Select on:mousedown={handleOpen} value={title} options={[{ value: title, title }]} />
  <Modal open={showModal} width={400}>
    <Stack gap="m">
      {#each $keyGroupsStore as group}
      <FormGroup title={group.title}>
        {#each group.keys as key}
          <FormRow on:click={() => handleRowClick(key.value)} interactive title={key.title} />
        {/each}
      </FormGroup>
      {/each}
    </Stack>
    <ModalActions slot="actions">
      <Button on:click={handleClose}>Cancel</Button>
    </ModalActions>
  </Modal>
</div>
