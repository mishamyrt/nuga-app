<script lang="ts">
  import { Button, FormGroup, FormRow, Modal, ModalActions, onHotkey, Typography } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { AppDarkThemeToggle, AppUISwitchSegment } from '$features/app'

  let show = false

  onHotkey('ctrl+shift+KeyD', () => {
    show = true
  })

  function handleClose () {
    show = false
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
    </FormGroup>
    <ModalActions>
      <Button on:click={handleClose}>Скрыть</Button>
    </ModalActions>
  </div>
</Modal>
