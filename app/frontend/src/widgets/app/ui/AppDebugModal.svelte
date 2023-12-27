<script lang="ts">
  import { Button, FormGroup, FormRow, getTheme, Modal, ModalActions, onHotkey, Stack, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { AppDarkThemeToggle, AppUISwitchSegment, RestartButton } from '$features/app'
  import { disconnected } from '$shared/model'

  const { os } = getTheme()

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

<Modal width={$os === 'mac' ? 500 : 600} open={show}>
  <div use:fsd={'widgets/AppDebugModal'}>
    <FormGroup>
      <FormRow><Typography align="center" variant="heading-l">Debugging</Typography></FormRow>
      <FormRow
        title="User interface"
        align="top"
        subtitle="To fully switch the interface, you need to restart the application">
        <Stack justify="end">
          <AppUISwitchSegment />
        </Stack>
      </FormRow>
      <FormRow title="Dark theme">
        <AppDarkThemeToggle />
      </FormRow>
      <FormRow
        title="Reset connection"
        subtitle="Reset the current connection, to test the ability to recover or change the simulation template.">
        <Stack align="end">
          <Button on:click={handleDisconnect}>Disconnect</Button>
          <RestartButton />
        </Stack>
      </FormRow>
    </FormGroup>
    <ModalActions>
      <Button on:click={handleClose}>Hide</Button>
    </ModalActions>
  </div>
</Modal>
