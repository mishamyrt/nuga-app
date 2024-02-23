<script lang="ts">
  import { Button, FormGroup, FormRow, Modal, ModalActions, Select, Stack } from '@naco-ui/svelte'

  import { keysGroupStore } from '$entities/keys'

  let showModal = false

  function handleOpen (e: MouseEvent) {
    console.log(e)
    e.preventDefault()
    showModal = true
  }
</script>

<div>
  <Select on:mousedown={handleOpen} options={[{ value: 'action', title: 'Increase brightness' }]} />
  <Modal open={showModal} width={400}>
    <Stack gap="m">
      {#each $keysGroupStore as group}
      <FormGroup title={group.title}>
        {#each group.keys as key}
          <FormRow title={key.title} />
        {/each}
      </FormGroup>
      {/each}
    </Stack>
    <ModalActions slot="actions">
      <Button on:click={() => { showModal = false }}>Cancel</Button>
    </ModalActions>
  </Modal>
</div>
