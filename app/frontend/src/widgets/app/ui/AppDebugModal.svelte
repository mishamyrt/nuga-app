<script lang="ts">
  import { Button, FormGroup, FormRow, Modal, ModalActions, onHotkey, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { AppDarkThemeToggle, AppUISwitchSegment } from '$features/app'
  import { disconnected } from '$shared/model'

  let show = false

  onHotkey('ctrl+shift+KeyD', () => {
    show = !show
  })

  function handleClose () {
    show = false
  }

  function handleDisconnect () {
    handleClose()
    disconnected()
  }
</script>

<Modal width={500} open={show}>
  <div use:fsd={'widgets/AppDebugModal'}>
    <FormGroup>
      <FormRow><Typography align="center" variant="heading-l">Debugging</Typography></FormRow>
      <FormRow
        title="User interface"
        align="top"
        subtitle="To fully switch the interface, you need to restart the application">
        <AppUISwitchSegment />
      </FormRow>
      <FormRow title="Dark theme">
        <AppDarkThemeToggle />
      </FormRow>
      <FormRow
        title="Reset connection"
        subtitle="Reset the current connection, to test the ability to recover or change the simulation template.">
        <Button on:click={handleDisconnect}>Disconnect</Button>
      </FormRow>
    </FormGroup>
    <ModalActions>
      <Button on:click={handleClose}>Hide</Button>
    </ModalActions>
  </div>
</Modal>
