<script lang="ts">
  import { FormGroup, FormRow, Input, Select, Stack } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { supportsStore } from '$entities/device'
  import KeyShortcut from '$entities/keys/ui/KeyShortcut.svelte'
  import { KeyActionSelect } from '$features/keys'
</script>

<div use:fsd={'pages/KeysPage'}>
  <Stack gap="m">
    <FormGroup>
      <FormRow>
        <KeyActionSelect />
      </FormRow>
      <FormRow title="Record shortcut">
        <KeyShortcut />
      </FormRow>

    </FormGroup>
  </Stack>
  <h1>{$supportsStore.keys}</h1>
</div>
