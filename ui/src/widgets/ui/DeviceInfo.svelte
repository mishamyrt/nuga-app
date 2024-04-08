<svelte:options immutable={true} />

<script>
  import { fsd } from 'feature-sliced-svelte'

  import { DeviceInfoGroup, firmwareVersionStore } from '$entities/device'
  import { connectionStore } from '$shared/model'

  $: connection = $connectionStore
  $: firmwareVersion = $firmwareVersionStore
</script>

<div use:fsd={'widgets/SettingsInfo'}>
  <DeviceInfoGroup
    name={connection.name}
    path={connection.path}
    firmware={firmwareVersion}
  />
</div>
