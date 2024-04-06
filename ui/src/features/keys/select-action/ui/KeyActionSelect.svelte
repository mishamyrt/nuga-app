<script lang="ts">
  import { Button, FormGroup, FormRow, Modal, ModalActions, Select, Stack } from '@naco-ui/svelte'
  import { createEventDispatcher } from 'svelte'

  import {
    keyGroupsStore,
    keyMapStore,
    keyNamesStore,
    selectedKeyStore
  } from '$entities/keys'

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
    dispatcher('input', {
      key: value,
      modifiers: {
        ctrl: false,
        shift: false,
        alt: false,
        meta: false
      }
    })
    handleClose()
  }

  $: activeKey = $keyMapStore[keyCode]
  $: title = $keyNamesStore[activeKey?.type === 'keystroke' ? activeKey.keystroke.key : 'None'] ?? 'None'
  $: disabled = $selectedKeyStore.readonly
</script>

<div>
  <Select {disabled} on:mousedown={handleOpen} value={title} options={[{ value: title, title }]} />
  <Modal open={showModal} width={400}>
    <Stack gap="m">
      {#each $keyGroupsStore as group}
        {#if group.visible}
          <FormGroup title={group.title}>
            {#each group.keys as key}
              <FormRow
                on:click={() => handleActionClick(key.value)}
                interactive
                title={key.title}
              />
            {/each}
          </FormGroup>
        {/if}
      {/each}
    </Stack>
    <ModalActions slot="actions">
      <Button on:click={handleClose}>Cancel</Button>
    </ModalActions>
  </Modal>
</div>
