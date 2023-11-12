<script>
  import { fsd } from 'feature-sliced-svelte'

  import { DeviceInfoGroup, firmwareVersionStore } from '$entities/device'
  import { connection } from '$shared/model'
</script>
<div use:fsd={'widgets/SettingsInfo'}>
  <DeviceInfoGroup
    name={$connection.name}
    path={$connection.path}
    firmware={$firmwareVersionStore}
  />
</div>
